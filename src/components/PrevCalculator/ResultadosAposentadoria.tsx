import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

// Interfaces for typing
interface ResultadoPlano {
  saldo: number;
  rendaMensal: number;
  rendaTotalMensal?: number;
  irMensal?: number;
  rendaLiquida: number;
  baseCalculoIR: number;
  aliquotaEfetivaIR: number;
  economiaIRMensal?: number;
  
  // Additional scenarios
  rendaLiquidaProgressivaUnica: number;
  rendaLiquidaRegressivaUnica: number;
  rendaLiquidaProgressivaDiluida: number;
  rendaLiquidaRegressivaDiluida: number;
}

interface ResultadosAposentadoriaData {
  pgbl: ResultadoPlano;
  vgbl: ResultadoPlano;
}

interface ParametrosInvestimento {
  reinvestirGanhosIR: boolean;
  utilizarTabelaRegressiva: boolean;
  tempoAcumulacao: number;
  receberParcelaUnica: boolean;
}

interface ProjecaoAnual {
  saldoReinvestido: number;
  contribuicaoPGBLMensal: number;
  contribuicaoLiquidaPGBL: number;
}

interface ResultadosAposentadoriaProps {
  resultadosAposentadoria: ResultadosAposentadoriaData;
  parametrosInvestimento: ParametrosInvestimento;
  projecaoAnual: ProjecaoAnual[];
  aposentadoriaRPPSValor: number;
  outrasRendasCorrigidasValor: number;
  formatCurrency: (value: number) => string;
  exportData?: {
    saldoPGBL: number;
    contribuicaoPGBL: number;
    contribuicaoPGBLMensal: number;
    saldoVGBL: number;
    saldoReinvestido?: number;
    rendaLiquidaPGBL: number;
    rendaLiquidaVGBL: number;
    economiaIRTotal: number;
    recomendacao: string;
  };
  monthlyResults?: {
    pgblMonthlyContribution: number;
    pgblMonthlyIncome: number;
    vgblMonthlyIncome: number;
    taxSavingsMonthly: number;
  };
}



const calcularIR = (baseCalculo: number, dependentes: number = 0, previdenciaOficial: number = 0, outrosDescontos: number = 0): number => {
  // Dedução por dependente: R$ 189,59 por mês ou R$ 2.275,08 por ano
  const deducaoDependentes = dependentes * 2275.08;
  
  // Dedução da previdência oficial e outros descontos
  const deducaoPrevidencia = previdenciaOficial * 12;
  const deducaoOutros = outrosDescontos * 12;
  
  // Base de cálculo após deduções
  const baseCalculoAposDeducoes = Math.max(0, baseCalculo - deducaoDependentes - deducaoPrevidencia - deducaoOutros);
  
  if (baseCalculoAposDeducoes <= 22847.76) return 0;
  if (baseCalculoAposDeducoes <= 33919.80) return baseCalculoAposDeducoes * 0.075 - 1713.58;
  if (baseCalculoAposDeducoes <= 45012.60) return baseCalculoAposDeducoes * 0.15 - 4257.57;
  if (baseCalculoAposDeducoes <= 55976.16) return baseCalculoAposDeducoes * 0.225 - 7633.51;
  return baseCalculoAposDeducoes * 0.275 - 10432.32;
};


const ResultadosAposentadoria: React.FC<ResultadosAposentadoriaProps> = ({
  resultadosAposentadoria,
  parametrosInvestimento,
  projecaoAnual,
  aposentadoriaRPPSValor,
  outrasRendasCorrigidasValor,
  formatCurrency,
  exportData,
  monthlyResults
}) => {
  // Log the exported data if available
  React.useEffect(() => {
    if (exportData) {
      console.log('Dados exportados recebidos:', exportData);
    }
  }, [exportData]);
  // Calcular breakdown para IR progressivo do PGBL
  const calcularIRProgressivoBreakdown = (baseCalculo: number) => {
    const breakdown = [
      { faixa: 'Isenta', valor: 0, aliquota: 0 },
      { faixa: '7,5%', valor: 0, aliquota: 7.5 },
      { faixa: '15%', valor: 0, aliquota: 15 },
      { faixa: '22,5%', valor: 0, aliquota: 22.5 },
      { faixa: '27,5%', valor: 0, aliquota: 27.5 }
    ];
    
    let saldoRestante = baseCalculo;
    
    // Faixa isenta
    const faixaIsenta = Math.min(22847.76, saldoRestante);
    breakdown[0].valor = faixaIsenta;
    saldoRestante -= faixaIsenta;
    
    // Faixa 7,5%
    if (saldoRestante > 0) {
      const faixa7_5 = Math.min(33919.80 - 22847.76, saldoRestante);
      breakdown[1].valor = faixa7_5;
      saldoRestante -= faixa7_5;
    }
    
    // Faixa 15%
    if (saldoRestante > 0) {
      const faixa15 = Math.min(45012.60 - 33919.80, saldoRestante);
      breakdown[2].valor = faixa15;
      saldoRestante -= faixa15;
    }
    
    // Faixa 22,5%
    if (saldoRestante > 0) {
      const faixa22_5 = Math.min(55976.16 - 45012.60, saldoRestante);
      breakdown[3].valor = faixa22_5;
      saldoRestante -= faixa22_5;
    }
    
    // Faixa 27,5%
    if (saldoRestante > 0) {
      breakdown[4].valor = saldoRestante;
    }
    
    return breakdown;
  };
  
  // Calcular breakdown para IR regressivo do PGBL
  const calcularIRRegressivoBreakdown = (valor: number, tempoAcumulacao: number) => {
    let aliquota = 35;
    if (tempoAcumulacao > 10) aliquota = 10;
    else if (tempoAcumulacao > 8) aliquota = 15;
    else if (tempoAcumulacao > 6) aliquota = 20;
    else if (tempoAcumulacao > 4) aliquota = 25;
    else if (tempoAcumulacao > 2) aliquota = 30;
    
    const breakdown = [
      { faixa: 'Até 2 anos (35%)', valor: 0, aliquota: 35 },
      { faixa: '2-4 anos (30%)', valor: 0, aliquota: 30 },
      { faixa: '4-6 anos (25%)', valor: 0, aliquota: 25 },
      { faixa: '6-8 anos (20%)', valor: 0, aliquota: 20 },
      { faixa: '8-10 anos (15%)', valor: 0, aliquota: 15 },
      { faixa: 'Acima 10 anos (10%)', valor: 0, aliquota: 10 }
    ];
    
    // Colocar todo o valor na faixa correspondente
    const index = 6 - ((aliquota / 5) - 1);
    if (index >= 0 && index < breakdown.length) {
      breakdown[index].valor = valor;
    }
    
    return breakdown;
  };
  
  // Calcular os valores para breakdowns
  const pgblProgressivoBreakdown = calcularIRProgressivoBreakdown(resultadosAposentadoria.pgbl.baseCalculoIR);
  
  // Calcular o valor tributável do VGBL (apenas o rendimento)
  const valorTributavelVGBL = resultadosAposentadoria.vgbl.baseCalculoIR - aposentadoriaRPPSValor * 12 - outrasRendasCorrigidasValor * 12;
  const vgblProgressivoBreakdown = calcularIRProgressivoBreakdown(valorTributavelVGBL);
  
  // Calcular breakdowns regressivos
  const pgblRegressivoBreakdown = calcularIRRegressivoBreakdown(
    resultadosAposentadoria.pgbl.saldo, 
    parametrosInvestimento.tempoAcumulacao
  );
  
  // Para VGBL, apenas o rendimento é tributado
  const totalInvestido = projecaoAnual.reduce((total, ano) => total + ano.contribuicaoLiquidaPGBL, 0);
  const rendimentoVGBL = resultadosAposentadoria.vgbl.saldo - totalInvestido;
  
  const vgblRegressivoBreakdown = calcularIRRegressivoBreakdown(
    rendimentoVGBL,
    parametrosInvestimento.tempoAcumulacao
  );

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ color: '#012B09', fontWeight: 'medium', mb: 2 }}>
            Saldo Acumulado na Aposentadoria
          </Typography>
          <TableContainer component={Paper} sx={{ mt: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#E9EDE5' }}>
                  <TableCell>Plano</TableCell>
                  <TableCell align="right">Valor</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>PGBL</TableCell>
                  <TableCell align="right">{formatCurrency(resultadosAposentadoria.pgbl.saldo)}</TableCell>
                </TableRow>
                {parametrosInvestimento.reinvestirGanhosIR && (
                  <TableRow>
                    <TableCell sx={{ pl: 4 }}>Saldo Reinvestido PGBL</TableCell>
                    <TableCell align="right">
                      {formatCurrency(projecaoAnual.length > 0 ? projecaoAnual[projecaoAnual.length - 1].saldoReinvestido : 0)}
                    </TableCell>
                  </TableRow>
                )}
                <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                  <TableCell><strong>Total PGBL</strong></TableCell>
                  <TableCell align="right"><strong>
                    {formatCurrency(resultadosAposentadoria.pgbl.saldo + 
                      (parametrosInvestimento.reinvestirGanhosIR && projecaoAnual.length > 0 ? 
                        projecaoAnual[projecaoAnual.length - 1].saldoReinvestido : 0))}
                  </strong></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>VGBL</TableCell>
                  <TableCell align="right">{formatCurrency(resultadosAposentadoria.vgbl.saldo)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ pl: 4 }}>Capital Investido VGBL</TableCell>
                  <TableCell align="right">
                    {formatCurrency(totalInvestido)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ pl: 4 }}>Rendimento Tributável VGBL</TableCell>
                  <TableCell align="right">
                    {formatCurrency(rendimentoVGBL)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" sx={{ color: '#012B09', fontWeight: 'medium', mb: 2 }}>
            Cenários de Tributação na Aposentadoria
          </Typography>
          
          {/* Parcela Única - Progressiva */}
          <Typography variant="subtitle1" sx={{ mt: 3, mb: 1, fontWeight: 'medium' }}>
            Parcela Única - Progressiva
          </Typography>
          <TableContainer component={Paper} sx={{ mt: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#E9EDE5' }}>
                  <TableCell>Detalhe</TableCell>
                  <TableCell align="right">PGBL</TableCell>
                  <TableCell align="right">VGBL</TableCell>
                  <TableCell align="right">Valor Tributável</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Valor Total</TableCell>
                  <TableCell align="right">{formatCurrency(resultadosAposentadoria.pgbl.saldo)}</TableCell>
                  <TableCell align="right">{formatCurrency(resultadosAposentadoria.vgbl.saldo)}</TableCell>
                  <TableCell align="right">-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Base de Cálculo IR</TableCell>
                  <TableCell align="right">
                    {formatCurrency(resultadosAposentadoria.pgbl.saldo + (aposentadoriaRPPSValor + outrasRendasCorrigidasValor) * 12)}
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(rendimentoVGBL + (aposentadoriaRPPSValor + outrasRendasCorrigidasValor) * 12)}
                  </TableCell>
                  <TableCell align="right">
                    <strong>PGBL:</strong> 100% do saldo + outras rendas<br/>
                    <strong>VGBL:</strong> Apenas rendimentos + outras rendas
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>IR Total</TableCell>
                  <TableCell align="right">
                    {formatCurrency(calcularIR(
                      resultadosAposentadoria.pgbl.saldo + (aposentadoriaRPPSValor + outrasRendasCorrigidasValor) * 12
                    ))}
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(calcularIR(
                      rendimentoVGBL + (aposentadoriaRPPSValor + outrasRendasCorrigidasValor) * 12
                    ))}
                  </TableCell>
                  <TableCell align="right">-</TableCell>
                </TableRow>
                {/* Faixas de tributação progressiva */}
                <TableRow>
                  <TableCell colSpan={parametrosInvestimento.reinvestirGanhosIR ? 4 : 3} sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>
                    Detalhamento por Faixa de Tributação
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Faixa Isenta (0%)</TableCell>
                  <TableCell align="right">
                    {formatCurrency(pgblProgressivoBreakdown[0].valor)}
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(vgblProgressivoBreakdown[0].valor)}
                  </TableCell>
                  {parametrosInvestimento.reinvestirGanhosIR && (
                    <TableCell align="right">-</TableCell>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell>Faixa 7,5%</TableCell>
                  <TableCell align="right">
                    {formatCurrency(pgblProgressivoBreakdown[1].valor)}
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(vgblProgressivoBreakdown[1].valor)}
                  </TableCell>
                  {parametrosInvestimento.reinvestirGanhosIR && (
                    <TableCell align="right">-</TableCell>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell>Faixa 15%</TableCell>
                  <TableCell align="right">
                    {formatCurrency(pgblProgressivoBreakdown[2].valor)}
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(vgblProgressivoBreakdown[2].valor)}
                  </TableCell>
                  {parametrosInvestimento.reinvestirGanhosIR && (
                    <TableCell align="right">-</TableCell>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell>Faixa 22,5%</TableCell>
                  <TableCell align="right">
                    {formatCurrency(pgblProgressivoBreakdown[3].valor)}
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(vgblProgressivoBreakdown[3].valor)}
                  </TableCell>
                  {parametrosInvestimento.reinvestirGanhosIR && (
                    <TableCell align="right">-</TableCell>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell>Faixa 27,5%</TableCell>
                  <TableCell align="right">
                    {formatCurrency(pgblProgressivoBreakdown[4].valor)}
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(vgblProgressivoBreakdown[4].valor)}
                  </TableCell>
                  {parametrosInvestimento.reinvestirGanhosIR && (
                    <TableCell align="right">-</TableCell>
                  )}
                </TableRow>
                <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                  <TableCell><strong>Valor Líquido (após IR)</strong></TableCell>
                  <TableCell align="right"><strong>
                    {formatCurrency(resultadosAposentadoria.pgbl.rendaLiquidaProgressivaUnica)}
                  </strong></TableCell>
                  <TableCell align="right"><strong>
                    {formatCurrency(resultadosAposentadoria.vgbl.rendaLiquidaProgressivaUnica)}
                  </strong></TableCell>
                  {parametrosInvestimento.reinvestirGanhosIR && (
                    <TableCell align="right"><strong>
                      {formatCurrency(projecaoAnual.length > 0 ? projecaoAnual[projecaoAnual.length - 1].saldoReinvestido : 0)}
                    </strong></TableCell>
                  )}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          
          {/* Gráficos de Pizza para Progressiva */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" align="center" sx={{ mb: 2 }}>
                Distribuição do IR Progressivo - PGBL
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pgblProgressivoBreakdown.filter(item => item.valor > 0)}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ faixa, percent }) => `${faixa}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="valor"
                    >
                      {pgblProgressivoBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 50%)`} />
                      ))}
                    </Pie>
                    <Legend />
                    <RechartsTooltip 
                      formatter={(value: any, name: any, props: any) => {
                        if (!props || !props.payload) return [formatCurrency(value), ""];
                        const item = props.payload;
                        return [`${formatCurrency(value)} (${item.aliquota}%)`, item.faixa];
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" align="center" sx={{ mb: 2 }}>
                Distribuição do IR Progressivo - VGBL
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={vgblProgressivoBreakdown.filter(item => item.valor > 0)}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ faixa, percent }) => `${faixa}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="valor"
                    >
                      {vgblProgressivoBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 50%)`} />
                      ))}
                    </Pie>
                    <Legend />
                    <RechartsTooltip 
                      formatter={(value: any, name: any, props: any) => {
                        if (!props || !props.payload) return [formatCurrency(value), ""];
                        const item = props.payload;
                        return [`${formatCurrency(value)} (${item.aliquota}%)`, item.faixa];
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Grid>
          </Grid>
          
          {/* Parcela Única - Regressiva */}
          <Typography variant="subtitle1" sx={{ mt: 3, mb: 1, fontWeight: 'medium' }}>
            Parcela Única - Regressiva
          </Typography>
          <TableContainer component={Paper} sx={{ mt: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#E9EDE5' }}>
                  <TableCell>Detalhe</TableCell>
                  <TableCell align="right">PGBL</TableCell>
                  <TableCell align="right">VGBL</TableCell>
                  <TableCell align="right">Valor Tributável</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Valor Total</TableCell>
                  <TableCell align="right">{formatCurrency(resultadosAposentadoria.pgbl.saldo)}</TableCell>
                  <TableCell align="right">{formatCurrency(resultadosAposentadoria.vgbl.saldo)}</TableCell>
                  <TableCell align="right">-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Base de Cálculo IR</TableCell>
                  <TableCell align="right">
                    {formatCurrency(resultadosAposentadoria.pgbl.saldo)}
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(rendimentoVGBL)}
                  </TableCell>
                  <TableCell align="right">
                    <strong>PGBL:</strong> 100% do saldo<br/>
                    <strong>VGBL:</strong> Apenas rendimentos
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Alíquota Aplicável</TableCell>
                  <TableCell align="right">
                    {parametrosInvestimento.tempoAcumulacao > 10 ? '10%' :
                     parametrosInvestimento.tempoAcumulacao > 8 ? '15%' :
                     parametrosInvestimento.tempoAcumulacao > 6 ? '20%' :
                     parametrosInvestimento.tempoAcumulacao > 4 ? '25%' :
                     parametrosInvestimento.tempoAcumulacao > 2 ? '30%' : '35%'}
                  </TableCell>
                  <TableCell align="right">
                    {parametrosInvestimento.tempoAcumulacao > 10 ? '10%' :
                     parametrosInvestimento.tempoAcumulacao > 8 ? '15%' :
                     parametrosInvestimento.tempoAcumulacao > 6 ? '20%' :
                     parametrosInvestimento.tempoAcumulacao > 4 ? '25%' :
                     parametrosInvestimento.tempoAcumulacao > 2 ? '30%' : '35%'}
                  </TableCell>
                  <TableCell align="right">-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>IR Total</TableCell>
                  <TableCell align="right">
                    {formatCurrency(resultadosAposentadoria.pgbl.saldo * 
                      (parametrosInvestimento.tempoAcumulacao > 10 ? 0.10 :
                       parametrosInvestimento.tempoAcumulacao > 8 ? 0.15 :
                       parametrosInvestimento.tempoAcumulacao > 6 ? 0.20 :
                       parametrosInvestimento.tempoAcumulacao > 4 ? 0.25 :
                       parametrosInvestimento.tempoAcumulacao > 2 ? 0.30 : 0.35))}
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(rendimentoVGBL * 
                      (parametrosInvestimento.tempoAcumulacao > 10 ? 0.10 :
                       parametrosInvestimento.tempoAcumulacao > 8 ? 0.15 :
                       parametrosInvestimento.tempoAcumulacao > 6 ? 0.20 :
                       parametrosInvestimento.tempoAcumulacao > 4 ? 0.25 :
                       parametrosInvestimento.tempoAcumulacao > 2 ? 0.30 : 0.35))}
                  </TableCell>
                  <TableCell align="right">-</TableCell>
                </TableRow>
                {/* Faixas de tributação regressiva */}
                <TableRow>
                  <TableCell colSpan={parametrosInvestimento.reinvestirGanhosIR ? 4 : 3} sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>
                    Detalhamento por Faixa de Tributação
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Faixa 35% (até 2 anos)</TableCell>
                  <TableCell align="right">
                    {formatCurrency(pgblRegressivoBreakdown[0].valor)}
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(vgblRegressivoBreakdown[0].valor)}
                  </TableCell>
                  {parametrosInvestimento.reinvestirGanhosIR && (
                    <TableCell align="right">-</TableCell>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell>Faixa 30% (2-4 anos)</TableCell>
                  <TableCell align="right">
                    {formatCurrency(pgblRegressivoBreakdown[1].valor)}
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(vgblRegressivoBreakdown[1].valor)}
                  </TableCell>
                  {parametrosInvestimento.reinvestirGanhosIR && (
                    <TableCell align="right">-</TableCell>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell>Faixa 25% (4-6 anos)</TableCell>
                  <TableCell align="right">
                    {formatCurrency(pgblRegressivoBreakdown[2].valor)}
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(vgblRegressivoBreakdown[2].valor)}
                  </TableCell>
                  {parametrosInvestimento.reinvestirGanhosIR && (
                    <TableCell align="right">-</TableCell>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell>Faixa 20% (6-8 anos)</TableCell>
                  <TableCell align="right">
                    {formatCurrency(pgblRegressivoBreakdown[3].valor)}
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(vgblRegressivoBreakdown[3].valor)}
                  </TableCell>
                  {parametrosInvestimento.reinvestirGanhosIR && (
                    <TableCell align="right">-</TableCell>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell>Faixa 15% (8-10 anos)</TableCell>
                  <TableCell align="right">
                    {formatCurrency(pgblRegressivoBreakdown[4].valor)}
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(vgblRegressivoBreakdown[4].valor)}
                  </TableCell>
                  {parametrosInvestimento.reinvestirGanhosIR && (
                    <TableCell align="right">-</TableCell>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell>Faixa 10% (acima de 10 anos)</TableCell>
                  <TableCell align="right">
                    {formatCurrency(pgblRegressivoBreakdown[5].valor)}
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(vgblRegressivoBreakdown[5].valor)}
                  </TableCell>
                  {parametrosInvestimento.reinvestirGanhosIR && (
                    <TableCell align="right">-</TableCell>
                  )}
                </TableRow>
                <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                  <TableCell><strong>Valor Líquido (após IR)</strong></TableCell>
                  <TableCell align="right"><strong>
                    {formatCurrency(resultadosAposentadoria.pgbl.rendaLiquidaRegressivaUnica)}
                  </strong></TableCell>
                  <TableCell align="right"><strong>
                    {formatCurrency(resultadosAposentadoria.vgbl.rendaLiquidaRegressivaUnica)}
                  </strong></TableCell>
                  {parametrosInvestimento.reinvestirGanhosIR && (
                    <TableCell align="right"><strong>
                      {formatCurrency(projecaoAnual.length > 0 ? projecaoAnual[projecaoAnual.length - 1].saldoReinvestido : 0)}
                    </strong></TableCell>
                  )}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          
          {/* Gráficos de Pizza para Regressiva */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" align="center" sx={{ mb: 2 }}>
                Distribuição do IR Regressivo - PGBL
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pgblRegressivoBreakdown.filter(item => item.valor > 0)}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ faixa, percent }) => `${faixa}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="valor"
                    >
                      {pgblRegressivoBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 50%)`} />
                      ))}
                    </Pie>
                    <Legend />
<RechartsTooltip 
                      formatter={(value: any, name: any, props: any) => {
                        if (!props || !props.payload) return [formatCurrency(value), ""];
                        const item = props.payload;
                        return [`${formatCurrency(value)} (${item.aliquota}%)`, item.faixa];
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" align="center" sx={{ mb: 2 }}>
                Distribuição do IR Regressivo - VGBL
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={vgblRegressivoBreakdown.filter(item => item.valor > 0)}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ faixa, percent }) => `${faixa}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="valor"
                    >
                      {vgblRegressivoBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 50%)`} />
                      ))}
                    </Pie>
                    <Legend />
                    <RechartsTooltip 
                      formatter={(value: any, name: any, props: any) => {
                        if (!props || !props.payload) return [formatCurrency(value), ""];
                        const item = props.payload;
                        return [`${formatCurrency(value)} (${item.aliquota}%)`, item.faixa];
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      
      <Box sx={{ height: 400, mt: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#012B09', fontWeight: 'medium' }}>
          Comparativo de Valor Líquido Total na Aposentadoria
        </Typography>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={[
              { 
                name: 'PGBL - Progressiva', 
                valor: resultadosAposentadoria.pgbl.rendaLiquidaProgressivaUnica,
                valorBruto: resultadosAposentadoria.pgbl.saldo,
                ir: resultadosAposentadoria.pgbl.saldo - resultadosAposentadoria.pgbl.rendaLiquidaProgressivaUnica
              },
              { 
                name: 'PGBL - Regressiva', 
                valor: resultadosAposentadoria.pgbl.rendaLiquidaRegressivaUnica,
                valorBruto: resultadosAposentadoria.pgbl.saldo,
                ir: resultadosAposentadoria.pgbl.saldo - resultadosAposentadoria.pgbl.rendaLiquidaRegressivaUnica
              },
              { 
                name: 'VGBL - Progressiva', 
                valor: resultadosAposentadoria.vgbl.rendaLiquidaProgressivaUnica,
                valorBruto: resultadosAposentadoria.vgbl.saldo,
                ir: resultadosAposentadoria.vgbl.saldo - resultadosAposentadoria.vgbl.rendaLiquidaProgressivaUnica
              },
              { 
                name: 'VGBL - Regressiva', 
                valor: resultadosAposentadoria.vgbl.rendaLiquidaRegressivaUnica,
                valorBruto: resultadosAposentadoria.vgbl.saldo,
                ir: resultadosAposentadoria.vgbl.saldo - resultadosAposentadoria.vgbl.rendaLiquidaRegressivaUnica
              },
              ...(parametrosInvestimento.reinvestirGanhosIR ? [{ 
                name: 'VGBL + Reinvestimento', 
                valor: resultadosAposentadoria.vgbl.rendaLiquidaRegressivaUnica + 
                  (projecaoAnual.length > 0 ? projecaoAnual[projecaoAnual.length - 1].saldoReinvestido : 0),
                valorBruto: resultadosAposentadoria.vgbl.saldo + 
                  (projecaoAnual.length > 0 ? projecaoAnual[projecaoAnual.length - 1].saldoReinvestido : 0),
                ir: resultadosAposentadoria.vgbl.saldo - resultadosAposentadoria.vgbl.rendaLiquidaRegressivaUnica
              }] : [])
            ]}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `R$ ${value.toLocaleString()}`} />
            <RechartsTooltip 
              formatter={(value: any, name: any) => {
                if (name === "valor") return ["Valor Líquido: " + formatCurrency(value), ""];
                if (name === "valorBruto") return ["Valor Bruto: " + formatCurrency(value), ""];
                if (name === "ir") return ["IR: " + formatCurrency(value), ""];
                return [formatCurrency(value), name];
              }}
            />
            <Legend />
            <Bar dataKey="valor" name="Valor Líquido" fill="#012B09" />
            <Bar dataKey="ir" name="Imposto de Renda" fill="#d32f2f" />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Seção para exibir os dados exportados */}
      {exportData && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#012B09', fontWeight: 'medium' }}>
            Dados Exportados para Análise
          </Typography>
          <Paper sx={{ p: 3, bgcolor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Contribuição PGBL Mensal:
                </Typography>
                <Typography paragraph sx={{ fontWeight: 'medium' }}>
                  {formatCurrency(exportData.contribuicaoPGBLMensal)}
                </Typography>
                
                <Typography variant="subtitle2" gutterBottom>
                  Contribuição PGBL Total:
                </Typography>
                <Typography paragraph sx={{ fontWeight: 'medium' }}>
                  {formatCurrency(exportData.contribuicaoPGBL)}
                </Typography>
                
                <Typography variant="subtitle2" gutterBottom>
                  Saldo PGBL:
                </Typography>
                <Typography paragraph sx={{ fontWeight: 'medium' }}>
                  {formatCurrency(exportData.saldoPGBL)}
                </Typography>
                
                <Typography variant="subtitle2" gutterBottom>
                  Renda Líquida PGBL:
                </Typography>
                <Typography paragraph sx={{ fontWeight: 'medium' }}>
                  {formatCurrency(exportData.rendaLiquidaPGBL)}
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Saldo VGBL:
                </Typography>
                <Typography paragraph sx={{ fontWeight: 'medium' }}>
                  {formatCurrency(exportData.saldoVGBL)}
                </Typography>
                
                <Typography variant="subtitle2" gutterBottom>
                  Renda Líquida VGBL:
                </Typography>
                <Typography paragraph sx={{ fontWeight: 'medium' }}>
                  {formatCurrency(exportData.rendaLiquidaVGBL)}
                </Typography>
                
                {exportData.saldoReinvestido !== undefined && (
                  <>
                    <Typography variant="subtitle2" gutterBottom>
                      Saldo Reinvestido:
                    </Typography>
                    <Typography paragraph sx={{ fontWeight: 'medium' }}>
                      {formatCurrency(exportData.saldoReinvestido)}
                    </Typography>
                  </>
                )}
                
                <Typography variant="subtitle2" gutterBottom>
                  Economia IR Total:
                </Typography>
                <Typography paragraph sx={{ fontWeight: 'medium' }}>
                  {formatCurrency(exportData.economiaIRTotal)}
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Recomendação:
                </Typography>
                <Typography paragraph sx={{ fontWeight: 'medium', color: '#012B09' }}>
                  {exportData.recomendacao}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      )}
      
      {/* Seção para planejamento de renda mensal na aposentadoria */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#012B09', fontWeight: 'medium' }}>
          Planejamento de Renda Mensal na Aposentadoria
        </Typography>
        <Paper sx={{ p: 3, bgcolor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                Projeção de Renda Mensal
              </Typography>
              
              <TableContainer component={Paper} sx={{ mt: 2, mb: 3 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#E9EDE5' }}>
                      <TableCell>Fonte de Renda</TableCell>
                      <TableCell align="right">Valor Mensal</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Aposentadoria RPPS</TableCell>
                      <TableCell align="right">{formatCurrency(aposentadoriaRPPSValor)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Outras Rendas</TableCell>
                      <TableCell align="right">{formatCurrency(outrasRendasCorrigidasValor)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Renda PGBL (20 anos)</TableCell>
                      <TableCell align="right">{formatCurrency(resultadosAposentadoria.pgbl.rendaMensal)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Renda VGBL (20 anos)</TableCell>
                      <TableCell align="right">{formatCurrency(resultadosAposentadoria.vgbl.rendaMensal)}</TableCell>
                    </TableRow>
                    {parametrosInvestimento.reinvestirGanhosIR && (
                      <TableRow>
                        <TableCell>Renda do Capital Reinvestido</TableCell>
                        <TableCell align="right">
                          {formatCurrency(projecaoAnual.length > 0 ? 
                            projecaoAnual[projecaoAnual.length - 1].saldoReinvestido / (20 * 12) : 0)}
                        </TableCell>
                      </TableRow>
                    )}
                    <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                      <TableCell><strong>Total Mensal Bruto (PGBL)</strong></TableCell>
                      <TableCell align="right"><strong>
                        {formatCurrency(aposentadoriaRPPSValor + outrasRendasCorrigidasValor + resultadosAposentadoria.pgbl.rendaMensal)}
                      </strong></TableCell>
                    </TableRow>
                    <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                      <TableCell><strong>Total Mensal Bruto (VGBL)</strong></TableCell>
                      <TableCell align="right"><strong>
                        {formatCurrency(aposentadoriaRPPSValor + outrasRendasCorrigidasValor + resultadosAposentadoria.vgbl.rendaMensal + 
                          (parametrosInvestimento.reinvestirGanhosIR && projecaoAnual.length > 0 ? 
                            projecaoAnual[projecaoAnual.length - 1].saldoReinvestido / (20 * 12) : 0))}
                      </strong></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>IR Mensal (PGBL)</TableCell>
                      <TableCell align="right">{formatCurrency(resultadosAposentadoria.pgbl.irMensal || 0)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>IR Mensal (VGBL)</TableCell>
                      <TableCell align="right">{formatCurrency(resultadosAposentadoria.vgbl.irMensal || 0)}</TableCell>
                    </TableRow>
                    <TableRow sx={{ bgcolor: '#e9f7ef' }}>
                      <TableCell><strong>Total Mensal Líquido (PGBL)</strong></TableCell>
                      <TableCell align="right"><strong>
                        {formatCurrency(resultadosAposentadoria.pgbl.rendaLiquida)}
                      </strong></TableCell>
                    </TableRow>
                    <TableRow sx={{ bgcolor: '#e9f7ef' }}>
                      <TableCell><strong>Total Mensal Líquido (VGBL)</strong></TableCell>
                      <TableCell align="right"><strong>
                        {formatCurrency(resultadosAposentadoria.vgbl.rendaLiquida)}
                      </strong></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                Planejamento de Saques Mensais
              </Typography>
              
              <Paper sx={{ p: 2, bgcolor: '#fff', mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Estratégia de Saque Regressivo
                </Typography>
                <Typography paragraph>
                  Para maximizar o benefício da tabela regressiva, é recomendável sacar primeiro os recursos 
                  que estão há mais tempo investidos, beneficiando-se da alíquota mínima de 10%.
                </Typography>
                <Typography paragraph>
                  <strong>Sugestão de Saque Mensal:</strong> {formatCurrency(
                    Math.max(resultadosAposentadoria.pgbl.rendaMensal, resultadosAposentadoria.vgbl.rendaMensal)
                  )}
                </Typography>
                <Typography>
                  <strong>Duração Estimada:</strong> 20 anos (240 meses)
                </Typography>
              </Paper>
              
              <Paper sx={{ p: 2, bgcolor: '#fff' }}>
                <Typography variant="subtitle2" gutterBottom>
                  Simulação de Renda Personalizada
                </Typography>
                <TextField
                  fullWidth
                  label="Renda Mensal Desejada (R$)"
                  type="number"
                  defaultValue={Math.max(resultadosAposentadoria.pgbl.rendaMensal, resultadosAposentadoria.vgbl.rendaMensal).toFixed(2)}
                  margin="normal"
                  variant="outlined"
                  InputProps={{ inputProps: { min: 0 } }}
                />
                <TextField
                  fullWidth
                  label="Taxa de Rentabilidade Anual (%)"
                  type="number"
                  defaultValue={parametrosInvestimento.taxaRentabilidade}
                  margin="normal"
                  variant="outlined"
                  InputProps={{ inputProps: { min: 0, max: 20, step: 0.1 } }}
                />
                <Button 
                  variant="contained" 
                  color="primary"
                  fullWidth
                  sx={{ 
                    mt: 2,
                    backgroundColor: '#012B09',
                    '&:hover': { backgroundColor: '#01461E' }
                  }}
                >
                  Recalcular Duração
                </Button>
              </Paper>
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', mt: 2 }}>
                Estratégia de Saque Otimizada para Economia de IR
              </Typography>
              <TableContainer component={Paper} sx={{ mt: 1 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#E9EDE5' }}>
                      <TableCell>Período</TableCell>
                      <TableCell align="right">Fonte Principal</TableCell>
                      <TableCell align="right">Valor Mensal</TableCell>
                      <TableCell align="right">Alíquota IR</TableCell>
                      <TableCell align="right">IR Mensal</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Anos 1-5</TableCell>
                      <TableCell align="right">VGBL (rendimentos)</TableCell>
                      <TableCell align="right">{formatCurrency(resultadosAposentadoria.vgbl.rendaMensal)}</TableCell>
                      <TableCell align="right">10%</TableCell>
                      <TableCell align="right">{formatCurrency(resultadosAposentadoria.vgbl.rendaMensal * 0.1 * (rendimentoVGBL / resultadosAposentadoria.vgbl.saldo))}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Anos 6-10</TableCell>
                      <TableCell align="right">PGBL (parcial)</TableCell>
                      <TableCell align="right">{formatCurrency(resultadosAposentadoria.pgbl.rendaMensal * 0.5)}</TableCell>
                      <TableCell align="right">10%</TableCell>
                      <TableCell align="right">{formatCurrency(resultadosAposentadoria.pgbl.rendaMensal * 0.5 * 0.1)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Anos 11-20</TableCell>
                      <TableCell align="right">PGBL (restante)</TableCell>
                      <TableCell align="right">{formatCurrency(resultadosAposentadoria.pgbl.rendaMensal)}</TableCell>
                      <TableCell align="right">10%</TableCell>
                      <TableCell align="right">{formatCurrency(resultadosAposentadoria.pgbl.rendaMensal * 0.1)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
                Nota: Esta estratégia considera o uso da tabela regressiva e prioriza o saque de recursos com menor tributação primeiro.
                Os valores são estimativas e podem variar conforme a rentabilidade real dos investimentos.
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      
      {/* Seção para exibir os resultados mensais */}
      {monthlyResults && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#012B09', fontWeight: 'medium' }}>
            Resultados Mensais
          </Typography>
          <Paper sx={{ p: 3, bgcolor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Contribuição PGBL Mensal:
                </Typography>
                <Typography paragraph sx={{ fontWeight: 'medium' }}>
                  {formatCurrency(monthlyResults.pgblMonthlyContribution)}
                </Typography>
                
                <Typography variant="subtitle2" gutterBottom>
                  Renda Mensal PGBL:
                </Typography>
                <Typography paragraph sx={{ fontWeight: 'medium' }}>
                  {formatCurrency(monthlyResults.pgblMonthlyIncome)}
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Renda Mensal VGBL:
                </Typography>
                <Typography paragraph sx={{ fontWeight: 'medium' }}>
                  {formatCurrency(monthlyResults.vgblMonthlyIncome)}
                </Typography>
                
                <Typography variant="subtitle2" gutterBottom>
                  Economia IR Mensal (média):
                </Typography>
                <Typography paragraph sx={{ fontWeight: 'medium' }}>
                  {formatCurrency(monthlyResults.taxSavingsMonthly)}
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Diferença Mensal PGBL vs VGBL:
                </Typography>
                <Typography paragraph sx={{ fontWeight: 'medium', color: monthlyResults.pgblMonthlyIncome > monthlyResults.vgblMonthlyIncome ? '#4caf50' : '#f44336' }}>
                  {formatCurrency(Math.abs(monthlyResults.pgblMonthlyIncome - monthlyResults.vgblMonthlyIncome))} 
                  {monthlyResults.pgblMonthlyIncome > monthlyResults.vgblMonthlyIncome ? ' a favor do PGBL' : ' a favor do VGBL'}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default ResultadosAposentadoria;

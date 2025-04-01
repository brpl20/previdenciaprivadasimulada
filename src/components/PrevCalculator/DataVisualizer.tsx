import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

// Interface for the exported data
interface ExportData {
  dadosPessoais: {
    nome: string;
    idade: number;
    idadeAposentadoria: number;
    salarioMensal: number;
  };
  resultados: {
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
  projecao: {
    anos: number[];
    saldosPGBL: number[];
    saldosVGBL: number[];
    saldosReinvestidos?: number[];
  };
}

interface DataVisualizerProps {
  data: ExportData;
}

const DataVisualizer: React.FC<DataVisualizerProps> = ({ data }) => {
  // Formatar valores monetários
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(value);
  };

  // Formatar percentuais
  const formatPercent = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value / 100);
  };

  // Preparar dados para o gráfico de projeção
  const chartData = data.projecao.anos.map((ano, index) => ({
    idade: ano,
    saldoPGBL: data.projecao.saldosPGBL[index],
    saldoVGBL: data.projecao.saldosVGBL[index],
    saldoReinvestido: data.projecao.saldosReinvestidos ? data.projecao.saldosReinvestidos[index] : 0
  }));

  // Preparar dados para o gráfico de comparação
  const comparisonData = [
    {
      name: 'PGBL',
      saldo: data.resultados.saldoPGBL,
      rendaLiquida: data.resultados.rendaLiquidaPGBL * 12 * 20, // 20 anos de recebimento
      contribuicao: data.resultados.contribuicaoPGBL
    },
    {
      name: 'VGBL',
      saldo: data.resultados.saldoVGBL,
      rendaLiquida: data.resultados.rendaLiquidaVGBL * 12 * 20, // 20 anos de recebimento
      contribuicao: data.resultados.contribuicaoPGBL // Mesmo valor de contribuição
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#012B09', fontWeight: 'bold', mb: 4 }}>
        Visualização de Dados Previdenciários
      </Typography>

      {/* Dados Pessoais */}
      <Paper sx={{ p: 3, mb: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#012B09', fontWeight: 'medium' }}>
          Dados Pessoais
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Nome:</strong> {data.dadosPessoais.nome || 'Não informado'}
            </Typography>
            <Typography variant="body1">
              <strong>Idade Atual:</strong> {data.dadosPessoais.idade} anos
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Idade de Aposentadoria:</strong> {data.dadosPessoais.idadeAposentadoria} anos
            </Typography>
            <Typography variant="body1">
              <strong>Salário Mensal:</strong> {formatCurrency(data.dadosPessoais.salarioMensal)}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Resultados */}
      <Paper sx={{ p: 3, mb: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#012B09', fontWeight: 'medium' }}>
          Resultados na Aposentadoria
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#E9EDE5' }}>
                <TableCell>Categoria</TableCell>
                <TableCell align="right">PGBL</TableCell>
                <TableCell align="right">VGBL</TableCell>
                <TableCell align="right">Diferença</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Contribuição Mensal</TableCell>
                <TableCell align="right">{formatCurrency(data.resultados.contribuicaoPGBLMensal)}</TableCell>
                <TableCell align="right">{formatCurrency(data.resultados.contribuicaoPGBLMensal)}</TableCell>
                <TableCell align="right">{formatCurrency(0)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Contribuição Total</TableCell>
                <TableCell align="right">{formatCurrency(data.resultados.contribuicaoPGBL)}</TableCell>
                <TableCell align="right">{formatCurrency(data.resultados.contribuicaoPGBL)}</TableCell>
                <TableCell align="right">{formatCurrency(0)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Saldo Acumulado</TableCell>
                <TableCell align="right">{formatCurrency(data.resultados.saldoPGBL)}</TableCell>
                <TableCell align="right">{formatCurrency(data.resultados.saldoVGBL)}</TableCell>
                <TableCell align="right">{formatCurrency(data.resultados.saldoVGBL - data.resultados.saldoPGBL)}</TableCell>
              </TableRow>
              {data.resultados.saldoReinvestido !== undefined && (
                <TableRow>
                  <TableCell>Saldo Reinvestido</TableCell>
                  <TableCell align="right">-</TableCell>
                  <TableCell align="right">{formatCurrency(data.resultados.saldoReinvestido)}</TableCell>
                  <TableCell align="right">{formatCurrency(data.resultados.saldoReinvestido)}</TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell>Renda Líquida Mensal</TableCell>
                <TableCell align="right">{formatCurrency(data.resultados.rendaLiquidaPGBL)}</TableCell>
                <TableCell align="right">{formatCurrency(data.resultados.rendaLiquidaVGBL)}</TableCell>
                <TableCell align="right">{formatCurrency(data.resultados.rendaLiquidaVGBL - data.resultados.rendaLiquidaPGBL)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Economia IR Total</TableCell>
                <TableCell align="right">{formatCurrency(data.resultados.economiaIRTotal)}</TableCell>
                <TableCell align="right">-</TableCell>
                <TableCell align="right">{formatCurrency(data.resultados.economiaIRTotal)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 3, p: 2, bgcolor: '#f8f9fa', borderRadius: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Recomendação:
          </Typography>
          <Typography variant="body1">
            {data.resultados.recomendacao}
          </Typography>
        </Box>
      </Paper>

      {/* Gráfico de Projeção */}
      <Paper sx={{ p: 3, mb: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#012B09', fontWeight: 'medium' }}>
          Projeção de Saldo ao Longo do Tempo
        </Typography>
        <Box sx={{ height: 400, mt: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="idade" label={{ value: 'Idade', position: 'insideBottomRight', offset: -10 }} />
              <YAxis tickFormatter={(value) => `R$ ${value.toLocaleString()}`} />
              <RechartsTooltip formatter={(value: any) => formatCurrency(typeof value === 'number' ? value : 0)} />
              <Legend />
              <Line type="monotone" dataKey="saldoPGBL" name="Saldo PGBL" stroke="#012B09" strokeWidth={2} />
              <Line type="monotone" dataKey="saldoVGBL" name="Saldo VGBL" stroke="#82ca9d" strokeWidth={2} />
              {data.projecao.saldosReinvestidos && (
                <Line type="monotone" dataKey="saldoReinvestido" name="Saldo Reinvestido" stroke="#8884d8" strokeWidth={2} />
              )}
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Paper>

      {/* Gráfico de Comparação */}
      <Paper sx={{ p: 3, mb: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#012B09', fontWeight: 'medium' }}>
          Comparativo PGBL vs VGBL
        </Typography>
        <Box sx={{ height: 400, mt: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={comparisonData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `R$ ${value.toLocaleString()}`} />
              <RechartsTooltip formatter={(value: any) => formatCurrency(typeof value === 'number' ? value : 0)} />
              <Legend />
              <Bar dataKey="saldo" name="Saldo Acumulado" fill="#012B09" />
              <Bar dataKey="rendaLiquida" name="Renda Líquida Total (20 anos)" fill="#82ca9d" />
              <Bar dataKey="contribuicao" name="Contribuição Total" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Paper>

      {/* Resumo */}
      <Paper sx={{ p: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#012B09', fontWeight: 'medium' }}>
          Resumo
        </Typography>
        <Typography variant="body1" paragraph>
          Com base nos parâmetros informados, o investimento em {data.resultados.rendaLiquidaPGBL > data.resultados.rendaLiquidaVGBL ? 'PGBL' : 'VGBL'} apresenta-se como a opção mais vantajosa para o seu perfil.
        </Typography>
        <Typography variant="body1" paragraph>
          A diferença de renda líquida mensal entre as opções é de {formatCurrency(Math.abs(data.resultados.rendaLiquidaPGBL - data.resultados.rendaLiquidaVGBL))}.
        </Typography>
        <Typography variant="body1">
          Recomenda-se consultar um especialista em direito previdenciário para avaliar as melhores estratégias para sua aposentadoria, considerando também os benefícios do INSS e outros regimes.
        </Typography>
      </Paper>
    </Box>
  );
};

export default DataVisualizer;

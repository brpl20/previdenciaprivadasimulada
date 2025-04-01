// components/PrevCalculator/index.tsx
import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
// Importações do Material UI com importações explícitas
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import SaveIcon from '@mui/icons-material/Save';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

// Importações do Recharts
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

// Import the ResultadosAposentadoria component
import ResultadosAposentadoria from './ResultadosAposentadoria';

// Importação para geração de PDF e manipulação de arquivos
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';

// Interfaces para tipagem
interface DadosPessoais {
  nome: string;
  dataNascimento: string;
  idadeAposentadoria: number;
  salarioMensal: number;
  taxaCorrecaoSalarial: number;
  aposentadoriaIntegral: boolean;
  valorAposentadoriaProporcional: number;
}

interface DadosImpostoRenda {
  outrasRendas: number;
  outrosDescontos: number;
  dependentes: number;
  previdenciaOficial: number;
}

interface ParametrosInvestimento {
  taxaRentabilidade: number;
  taxaAdministracaoPGBL: number;
  percentualRisco: number;
  investirSempre12Porcento: boolean;
  valorInvestimentoAnual: number;
  reinvestirGanhosIR: boolean;
  utilizarTabelaRegressiva: boolean;
  tempoAcumulacao: number;
  receberParcelaUnica: boolean;
}

interface TabelaRegressiva {
  ate2Anos: number;
  de2a4Anos: number;
  de4a6Anos: number;
  de6a8Anos: number;
  de8a10Anos: number;
  acima10Anos: number;
}

interface ProjecaoAnual {
  ano: number;
  mes: number;
  idade: number;
  salarioMensal: number;
  contribuicaoPGBLMensal: number;
  economiaIRMensal: number;
  saldoPGBL: number;
  saldoVGBL: number;
  saldoReinvestido: number;
  valorCorrigido: number;
  contribuicaoLiquidaPGBL: number;
}

interface ResultadoPlano {
  saldo: number;
  rendaMensal: number;
  rendaTotalMensal?: number;
  irMensal?: number;
  rendaLiquida: number;
  baseCalculoIR: number;
  aliquotaEfetivaIR: number;
  economiaIRMensal?: number;
  
  // Cenários adicionais
  rendaLiquidaProgressivaUnica: number;
  rendaLiquidaRegressivaUnica: number;
  rendaLiquidaProgressivaDiluida: number;
  rendaLiquidaRegressivaDiluida: number;
}

interface ResultadosAposentadoria {
  pgbl: ResultadoPlano;
  vgbl: ResultadoPlano;
}

interface ResumoComparativo {
  economiaIRPGBL: number;
  diferencaSaldos: number;
  diferencaRendaLiquida: number;
  }

// Interface para dados exportados
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
    contribuicaoPGBLMensal: number;  // Valor mensal regular da contribuição PGBL
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

// Interface for the component props
interface PrevCalculatorProps {
  onDataExport?: (data: {
    saldoPGBL: number;
    contribuicaoPGBL: number;
    contribuicaoPGBLMensal: number;
    saldoVGBL: number;
    saldoReinvestido?: number;
  }) => void;
}

const PrevCalculator: React.FC<PrevCalculatorProps> = ({ onDataExport }) => {
  // Estado para os dados pessoais
  const [dadosPessoais, setDadosPessoais] = useState<DadosPessoais>({
    nome: '',
    dataNascimento: '1986-01-01',
    idadeAposentadoria: 65,
    salarioMensal: 10000,
    taxaCorrecaoSalarial: 4,
    aposentadoriaIntegral: true,
    valorAposentadoriaProporcional: 6000
  });

  // Estado para os dados de imposto de renda
  const [dadosImpostoRenda, setDadosImpostoRenda] = useState<DadosImpostoRenda>({
    outrasRendas: 0,
    outrosDescontos: 0,
    dependentes: 0,
    previdenciaOficial: 0 // Agora será percentual
  });

  // Estado para os parâmetros de investimento
  const [parametrosInvestimento, setParametrosInvestimento] = useState<ParametrosInvestimento>({
    taxaRentabilidade: 0,
    taxaAdministracaoPGBL: 0,
    percentualRisco: 0,
    investirSempre12Porcento: true,
    valorInvestimentoAnual: 12000,
    reinvestirGanhosIR: false,
    utilizarTabelaRegressiva: true,
    tempoAcumulacao: 15,
    receberParcelaUnica: false
  });

  // Tabela regressiva de IR (Lei 11.053/2004)
  const tabelaRegressiva: TabelaRegressiva = {
    ate2Anos: 35,
    de2a4Anos: 30,
    de4a6Anos: 25,
    de6a8Anos: 20,
    de8a10Anos: 15,
    acima10Anos: 10
  };

  // Estado para as abas
  const [tabValue, setTabValue] = useState<number>(0);
  
  // Estado para feedback ao usuário
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  
  // Estado para os resultados calculados
  const [projecaoAnual, setProjecaoAnual] = useState<ProjecaoAnual[]>([]);
  const [resultadosAposentadoria, setResultadosAposentadoria] = useState<ResultadosAposentadoria>({
    pgbl: { 
      saldo: 0, 
      rendaMensal: 0, 
      rendaLiquida: 0, 
      baseCalculoIR: 0, 
      aliquotaEfetivaIR: 0,
      economiaIRMensal: 0,
      rendaLiquidaProgressivaUnica: 0,
      rendaLiquidaRegressivaUnica: 0,
      rendaLiquidaProgressivaDiluida: 0,
      rendaLiquidaRegressivaDiluida: 0
    },
    vgbl: { 
      saldo: 0, 
      rendaMensal: 0, 
      rendaLiquida: 0, 
      baseCalculoIR: 0, 
      aliquotaEfetivaIR: 0,
      economiaIRMensal: 0,
      rendaLiquidaProgressivaUnica: 0,
      rendaLiquidaRegressivaUnica: 0,
      rendaLiquidaProgressivaDiluida: 0,
      rendaLiquidaRegressivaDiluida: 0
    }
  });
  const [resumoComparativo, setResumoComparativo] = useState<ResumoComparativo>({
    economiaIRPGBL: 0,
    diferencaSaldos: 0,
    diferencaRendaLiquida: 0
  });

  // Handler para mudança de aba
  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Handler para atualização dos dados pessoais
  const handleDadosPessoaisChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setDadosPessoais({
      ...dadosPessoais,
      [name]: type === 'checkbox' ? checked : name === 'nome' ? value : Number(value)
    });
  };

  // Handler para atualização dos dados de imposto de renda
  const handleDadosImpostoRendaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDadosImpostoRenda({
      ...dadosImpostoRenda,
      [name]: Number(value)
    });
  };

  // Handler para atualização dos parâmetros de investimento
  const handleParametrosInvestimentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setParametrosInvestimento({
      ...parametrosInvestimento,
      [name]: type === 'checkbox' ? checked : Number(value)
    });
  };

  // Função para calcular o IR com base na tabela progressiva
  const calcularIR = (baseCalculo: number, dependentes: number = 0, previdenciaOficialPercentual: number = 0, outrosDescontos: number = 0): number => {
    // Dedução por dependente: R$ 189,59 por mês ou R$ 2.275,08 por ano
    const deducaoDependentes = dependentes * 2275.08;
    
    // Dedução da previdência oficial (agora como percentual do salário) e outros descontos
    const deducaoPrevidencia = (previdenciaOficialPercentual / 100) * (baseCalculo);
    const deducaoOutros = outrosDescontos * 12;
    
    // Base de cálculo após deduções
    const baseCalculoAposDeducoes = Math.max(0, baseCalculo - deducaoDependentes - deducaoPrevidencia - deducaoOutros);
    
    if (baseCalculoAposDeducoes <= 22847.76) return 0;
    if (baseCalculoAposDeducoes <= 33919.80) return baseCalculoAposDeducoes * 0.075 - 1713.58;
    if (baseCalculoAposDeducoes <= 45012.60) return baseCalculoAposDeducoes * 0.15 - 4257.57;
    if (baseCalculoAposDeducoes <= 55976.16) return baseCalculoAposDeducoes * 0.225 - 7633.51;
    return baseCalculoAposDeducoes * 0.275 - 10432.32;
  };

  // Função para calcular o IR com base na tabela regressiva
  const calcularIRRegressivo = (baseCalculo: number, tempoAcumulacao: number): number => {
    // Distribuição do tempo de acumulação
    // Simulamos que os aportes foram feitos de forma distribuída ao longo do tempo
    // Para uma simulação mais precisa, seria necessário rastrear cada aporte individualmente
    
    const distribuicaoAportes = [
      { tempo: 0, percentual: 0.05 },  // 5% dos aportes com menos de 2 anos
      { tempo: 2, percentual: 0.10 },  // 10% dos aportes entre 2-4 anos
      { tempo: 4, percentual: 0.15 },  // 15% dos aportes entre 4-6 anos
      { tempo: 6, percentual: 0.20 },  // 20% dos aportes entre 6-8 anos
      { tempo: 8, percentual: 0.20 },  // 20% dos aportes entre 8-10 anos
      { tempo: 10, percentual: 0.30 }, // 30% dos aportes com mais de 10 anos
    ];
    
    // Ajustar a distribuição com base no tempo total de acumulação
    const distribuicaoAjustada = distribuicaoAportes.map(item => {
      // Se o tempo de acumulação for menor que o tempo da faixa, zeramos o percentual
      if (tempoAcumulacao <= item.tempo) {
        return { ...item, percentual: 0 };
      }
      return item;
    });
    
    // Redistribuir os percentuais para que somem 100%
    const somaPercentuais = distribuicaoAjustada.reduce((soma, item) => soma + item.percentual, 0);
    if (somaPercentuais > 0) {
      distribuicaoAjustada.forEach(item => {
        item.percentual = item.percentual / somaPercentuais;
      });
    } else {
      // Se todos os percentuais forem zero, colocamos 100% na primeira faixa
      distribuicaoAjustada[0].percentual = 1;
    }
    
    // Calcular o IR para cada faixa
    let irTotal = 0;
    distribuicaoAjustada.forEach(item => {
      let aliquota = 0.35; // Padrão: até 2 anos
      
      if (item.tempo >= 10) aliquota = 0.10;
      else if (item.tempo >= 8) aliquota = 0.15;
      else if (item.tempo >= 6) aliquota = 0.20;
      else if (item.tempo >= 4) aliquota = 0.25;
      else if (item.tempo >= 2) aliquota = 0.30;
      
      irTotal += baseCalculo * item.percentual * aliquota;
    });
    
    return irTotal;
  };

  // Função para calcular idade a partir da data de nascimento
  const calcularIdade = (dataNascimento: string): number => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = nascimento.getMonth();
    
    if (mesNascimento > mesAtual || 
        (mesNascimento === mesAtual && nascimento.getDate() > hoje.getDate())) {
      idade--;
    }
    
    return idade;
  };

  // Função para calcular a projeção mensal
  // Variáveis para armazenar valores de aposentadoria e rendas para uso nas tabelas
const [aposentadoriaRPPSValor, setAposentadoriaRPPSValor] = useState<number>(0);
const [outrasRendasCorrigidasValor, setOutrasRendasCorrigidasValor] = useState<number>(0);
const [contribuicaoPGBLMensalValor, setContribuicaoPGBLMensalValor] = useState<number>(0);

// Convert to useCallback to avoid dependency issues
const calcularResultadosAposentadoria = useCallback((ultimoAno: ProjecaoAnual) => {
  const { dataNascimento, aposentadoriaIntegral, valorAposentadoriaProporcional, taxaCorrecaoSalarial, idadeAposentadoria } = dadosPessoais;
  const { outrasRendas, dependentes, previdenciaOficial } = dadosImpostoRenda;
  const { utilizarTabelaRegressiva, tempoAcumulacao, receberParcelaUnica } = parametrosInvestimento;
  
  const idadeAtual = calcularIdade(dataNascimento);
  const anosContribuicao = idadeAposentadoria - idadeAtual;
  const saldoPGBL = ultimoAno.saldoPGBL;
  const saldoVGBL = ultimoAno.saldoVGBL;
  const saldoReinvestido = ultimoAno.saldoReinvestido;
  
  // Estimar renda mensal dos planos (assumindo 20 anos de recebimento)
  const anosRecebimento = 20;
  const rendaMensalPGBL = saldoPGBL / (anosRecebimento * 12);
  const rendaMensalVGBL = saldoVGBL / (anosRecebimento * 12);
  const rendaMensalReinvestido = saldoReinvestido / (anosRecebimento * 12);
  
  // Calcular aposentadoria RPPS
  const aposentadoriaRPPS = aposentadoriaIntegral 
    ? ultimoAno.salarioMensal 
    : valorAposentadoriaProporcional;
  
  // Calcular outras rendas com correção
  const outrasRendasCorrigidas = outrasRendas * Math.pow(1 + taxaCorrecaoSalarial / 100, anosContribuicao);
  
  // Armazenar para uso nas tabelas
  setAposentadoriaRPPSValor(aposentadoriaRPPS);
  setOutrasRendasCorrigidasValor(outrasRendasCorrigidas);
  
  // Calcular renda total mensal
  const rendaTotalPGBL = aposentadoriaRPPS + outrasRendasCorrigidas + rendaMensalPGBL;
  const rendaTotalVGBL = aposentadoriaRPPS + outrasRendasCorrigidas + rendaMensalVGBL;
  
  // Total investido para cálculo do rendimento no VGBL
  const totalInvestido = projecaoAnual.reduce((total, ano) => total + ano.contribuicaoPGBLMensal, 0);
  const rendimentoVGBL = saldoVGBL - totalInvestido;
  const percentualRendimento = rendimentoVGBL / saldoVGBL;
  
  // CENÁRIO 1: PGBL com recebimento em parcela única e alíquota progressiva
  const irPGBLProgressivoUnico = calcularIR(
    saldoPGBL + (aposentadoriaRPPS + outrasRendasCorrigidas) * 12,
    dependentes,
    previdenciaOficial,
    0
  );
  const rendaLiquidaPGBLProgressivaUnica = saldoPGBL - irPGBLProgressivoUnico + (aposentadoriaRPPS + outrasRendasCorrigidas) * 12;
  
  // CENÁRIO 2: PGBL com recebimento em parcela única e alíquota regressiva
  const irPGBLRegressivoUnico = calcularIRRegressivo(saldoPGBL, tempoAcumulacao);
  const rendaLiquidaPGBLRegressivaUnica = saldoPGBL - irPGBLRegressivoUnico + (aposentadoriaRPPS + outrasRendasCorrigidas) * 12;
  
  // CENÁRIO 3: PGBL com recebimento diluído e alíquota progressiva
  const baseCalculoIRPGBLDiluido = rendaTotalPGBL * 12;
  const irPGBLProgressivoDiluido = calcularIR(
    baseCalculoIRPGBLDiluido,
    dependentes,
    previdenciaOficial,
    0
  );
  const rendaLiquidaPGBLProgressivaDiluida = rendaTotalPGBL * 12 - irPGBLProgressivoDiluido;
  
  // CENÁRIO 4: PGBL com recebimento diluído e alíquota regressiva
  const irPGBLRegressivoDiluido = calcularIRRegressivo(rendaTotalPGBL * 12, tempoAcumulacao);
  const rendaLiquidaPGBLRegressivaDiluida = rendaTotalPGBL * 12 - irPGBLRegressivoDiluido;
  
  // CENÁRIO 5: VGBL com recebimento em parcela única e alíquota progressiva
  // No VGBL, apenas o rendimento é tributado
  const irVGBLProgressivoUnico = calcularIR(
    rendimentoVGBL,
    dependentes,
    previdenciaOficial,
    0
  );
  const rendaLiquidaVGBLProgressivaUnica = saldoVGBL - irVGBLProgressivoUnico + (aposentadoriaRPPS + outrasRendasCorrigidas) * 12;
  
  // CENÁRIO 6: VGBL com recebimento em parcela única e alíquota regressiva
  const irVGBLRegressivoUnico = calcularIRRegressivo(rendimentoVGBL, tempoAcumulacao);
  const rendaLiquidaVGBLRegressivaUnica = saldoVGBL - irVGBLRegressivoUnico + (aposentadoriaRPPS + outrasRendasCorrigidas) * 12;
  
  // CENÁRIO 7: VGBL com recebimento diluído e alíquota progressiva
  // No VGBL, apenas o rendimento é tributado na parte mensal
  const rendimentoMensalVGBL = rendaMensalVGBL * percentualRendimento;
  const baseCalculoIRVGBLDiluido = rendimentoMensalVGBL * 12 + (aposentadoriaRPPS + outrasRendasCorrigidas) * 12;
  const irVGBLProgressivoDiluido = calcularIR(
    baseCalculoIRVGBLDiluido,
    dependentes,
    previdenciaOficial,
    0
  );
  const rendaLiquidaVGBLProgressivaDiluida = rendaTotalVGBL * 12 - irVGBLProgressivoDiluido;
  
  // CENÁRIO 8: VGBL com recebimento diluído e alíquota regressiva
  const irVGBLRegressivoDiluido = calcularIRRegressivo(rendimentoMensalVGBL * 12, tempoAcumulacao);
  const rendaLiquidaVGBLRegressivaDiluida = rendaTotalVGBL * 12 - irVGBLRegressivoDiluido;
  
  // Calcular IR mensal para o cenário principal (baseado nas escolhas do usuário)
  let irMensalPGBL, irMensalVGBL, baseCalculoIRPGBL, baseCalculoIRVGBL;
  let rendaLiquidaPGBL, rendaLiquidaVGBL;
  
  if (receberParcelaUnica) {
    // Parcela única
    if (utilizarTabelaRegressiva) {
      // Regressiva
      irMensalPGBL = irPGBLRegressivoUnico / 12;
      irMensalVGBL = irVGBLRegressivoUnico / 12;
      rendaLiquidaPGBL = rendaLiquidaPGBLRegressivaUnica / 12;
      rendaLiquidaVGBL = rendaLiquidaVGBLRegressivaUnica / 12;
    } else {
      // Progressiva
      irMensalPGBL = irPGBLProgressivoUnico / 12;
      irMensalVGBL = irVGBLProgressivoUnico / 12;
      rendaLiquidaPGBL = rendaLiquidaPGBLProgressivaUnica / 12;
      rendaLiquidaVGBL = rendaLiquidaVGBLProgressivaUnica / 12;
    }
    baseCalculoIRPGBL = saldoPGBL + (aposentadoriaRPPS + outrasRendasCorrigidas) * 12;
    baseCalculoIRVGBL = rendimentoVGBL + (aposentadoriaRPPS + outrasRendasCorrigidas) * 12;
  } else {
    // Diluído
    if (utilizarTabelaRegressiva) {
      // Regressiva
      irMensalPGBL = irPGBLRegressivoDiluido / 12;
      irMensalVGBL = irVGBLRegressivoDiluido / 12;
      rendaLiquidaPGBL = rendaLiquidaPGBLRegressivaDiluida / 12;
      rendaLiquidaVGBL = rendaLiquidaVGBLRegressivaDiluida / 12;
    } else {
      // Progressiva
      irMensalPGBL = irPGBLProgressivoDiluido / 12;
      irMensalVGBL = irVGBLProgressivoDiluido / 12;
      rendaLiquidaPGBL = rendaLiquidaPGBLProgressivaDiluida / 12;
      rendaLiquidaVGBL = rendaLiquidaVGBLProgressivaDiluida / 12;
    }
    baseCalculoIRPGBL = rendaTotalPGBL * 12;
    baseCalculoIRVGBL = baseCalculoIRVGBLDiluido;
  }
  
  // Calcular alíquota efetiva
  const aliquotaEfetivaPGBL = baseCalculoIRPGBL > 0 ? (irMensalPGBL * 12) / baseCalculoIRPGBL * 100 : 0;
  const aliquotaEfetivaVGBL = baseCalculoIRVGBL > 0 ? (irMensalVGBL * 12) / baseCalculoIRVGBL * 100 : 0;
  
  // Economia mensal de IR (VGBL em relação ao PGBL)
  const economiaIRMensal = irMensalPGBL - irMensalVGBL;
  
  // Calcular cenários para o saldo reinvestido (similar ao VGBL)
  const rendaLiquidaReinvestidoProgressivaUnica = saldoReinvestido - calcularIR(
    saldoReinvestido * percentualRendimento + (aposentadoriaRPPS + outrasRendasCorrigidas) * 12,
    dependentes,
    previdenciaOficial,
    0
  ) / 12;
  
  const rendaLiquidaReinvestidoRegressivaUnica = saldoReinvestido - calcularIRRegressivo(
    saldoReinvestido * percentualRendimento,
    tempoAcumulacao
  ) / 12;
  
  const rendaLiquidaReinvestidoProgressivaDiluida = rendaMensalReinvestido * 12 - calcularIR(
    rendaMensalReinvestido * percentualRendimento * 12 + (aposentadoriaRPPS + outrasRendasCorrigidas) * 12,
    dependentes,
    previdenciaOficial,
    0
  );
  
  const rendaLiquidaReinvestidoRegressivaDiluida = rendaMensalReinvestido * 12 - calcularIRRegressivo(
    rendaMensalReinvestido * percentualRendimento * 12,
    tempoAcumulacao
  );
  
  setResultadosAposentadoria({
    pgbl: { 
      saldo: saldoPGBL, 
      rendaMensal: rendaMensalPGBL,
      rendaTotalMensal: rendaTotalPGBL,
      irMensal: irMensalPGBL,
      rendaLiquida: rendaLiquidaPGBL,
      baseCalculoIR: baseCalculoIRPGBL,
      aliquotaEfetivaIR: aliquotaEfetivaPGBL,
      economiaIRMensal: 0,
      rendaLiquidaProgressivaUnica: rendaLiquidaPGBLProgressivaUnica / 12,
      rendaLiquidaRegressivaUnica: rendaLiquidaPGBLRegressivaUnica / 12,
      rendaLiquidaProgressivaDiluida: rendaLiquidaPGBLProgressivaDiluida / 12,
      rendaLiquidaRegressivaDiluida: rendaLiquidaPGBLRegressivaDiluida / 12
    },
    vgbl: { 
      saldo: saldoVGBL, 
      rendaMensal: rendaMensalVGBL,
      rendaTotalMensal: rendaTotalVGBL,
      irMensal: irMensalVGBL,
      rendaLiquida: rendaLiquidaVGBL,
      baseCalculoIR: baseCalculoIRVGBL,
      aliquotaEfetivaIR: aliquotaEfetivaVGBL,
      economiaIRMensal: economiaIRMensal,
      rendaLiquidaProgressivaUnica: rendaLiquidaVGBLProgressivaUnica / 12,
      rendaLiquidaRegressivaUnica: rendaLiquidaVGBLRegressivaUnica / 12,
      rendaLiquidaProgressivaDiluida: rendaLiquidaVGBLProgressivaDiluida / 12,
      rendaLiquidaRegressivaDiluida: rendaLiquidaVGBLRegressivaDiluida / 12
    }
  });
  
  // Atualizar diferença de renda líquida no resumo
  setResumoComparativo(prev => ({
    ...prev,
    diferencaRendaLiquida: rendaLiquidaVGBL - rendaLiquidaPGBL
  }));
}, [dadosPessoais, dadosImpostoRenda, parametrosInvestimento, projecaoAnual]);

// Now define calcularProjecaoAnual
const calcularProjecaoAnual = useCallback(() => {
    const { dataNascimento, idadeAposentadoria, salarioMensal, taxaCorrecaoSalarial } = dadosPessoais;
    const idadeAtual = calcularIdade(dataNascimento);
    const { outrasRendas } = dadosImpostoRenda;
    const { 
      taxaRentabilidade, 
      taxaAdministracaoPGBL, 
      percentualRisco,
      investirSempre12Porcento,
      valorInvestimentoAnual,
      reinvestirGanhosIR,
      // Definir valores padrão para os parâmetros removidos
      utilizarTabelaRegressiva = true,
      tempoAcumulacao = 15,
      receberParcelaUnica = false
    } = parametrosInvestimento;
    
    const anosContribuicao = idadeAposentadoria - idadeAtual;
    const mesesContribuicao = anosContribuicao * 12;
    const projecao: ProjecaoAnual[] = [];
    
    let salarioMensalAtual = salarioMensal;
    let saldoPGBL = 0;
    let saldoVGBL = 0;
    let saldoReinvestido = 0;
    let economiaIRTotal = 0;
    
    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();
    const mesAtual = dataAtual.getMonth();
    
    // Começar a projeção a partir do próximo mês
    let mesInicial = mesAtual + 1;
    let anoInicial = anoAtual;
    if (mesInicial > 11) {
      mesInicial = 0;
      anoInicial++;
    }
    
    // Projeção mensal (agora será usada diretamente para exibição)
    const projecaoMensal = [];
    
    // Variável para controlar quando aplicar o reajuste anual
    let ultimoAnoReajuste = anoInicial;
    
    for (let mes = 0; mes < mesesContribuicao; mes++) {
      const mesAtualProjecao = (mesInicial + mes) % 12;
      const anosPassados = Math.floor((mesInicial + mes) / 12);
      const anoAtualProjecao = anoInicial + anosPassados;
      const idade = idadeAtual + anosPassados + (mesAtualProjecao >= mesInicial ? 0 : 1);
      
      // Aplicar reajuste salarial anual em janeiro (mês 0) de cada ano, exceto no primeiro ano
      if (mesAtualProjecao === 0 && anoAtualProjecao > ultimoAnoReajuste) {
        salarioMensalAtual = salarioMensalAtual * (1 + taxaCorrecaoSalarial / 100);
        ultimoAnoReajuste = anoAtualProjecao;
      }
      
      // Contribuição PGBL mensal
      let contribuicaoPGBLMensal;
      if (investirSempre12Porcento) {
        contribuicaoPGBLMensal = Math.min(salarioMensalAtual * 0.12, salarioMensalAtual);
      } else {
        contribuicaoPGBLMensal = Math.min(valorInvestimentoAnual / 12, salarioMensalAtual);
      }
      
      // Armazenar o valor da contribuição mensal para uso no componente
      if (mes === 0) {
        setContribuicaoPGBLMensalValor(contribuicaoPGBLMensal);
      }
      
      const parcelaRiscoMensal = contribuicaoPGBLMensal * (percentualRisco / 100);
      const contribuicaoLiquidaPGBLMensal = contribuicaoPGBLMensal - parcelaRiscoMensal;
      
      // Cálculo do IR mensal (simplificado para projeção)
      // Na prática, o IR é calculado anualmente, mas para a projeção fazemos uma estimativa mensal
      const baseCalculoSemPGBLMensal = salarioMensalAtual + outrasRendas;
      const baseCalculoComPGBLMensal = baseCalculoSemPGBLMensal - contribuicaoPGBLMensal;
      
      // Estimativa de IR mensal (dividindo o anual por 12)
      const irSemPGBLMensal = calcularIR(baseCalculoSemPGBLMensal * 12, dadosImpostoRenda.dependentes, dadosImpostoRenda.previdenciaOficial, dadosImpostoRenda.outrosDescontos) / 12;
      const irComPGBLMensal = calcularIR(baseCalculoComPGBLMensal * 12, dadosImpostoRenda.dependentes, dadosImpostoRenda.previdenciaOficial, dadosImpostoRenda.outrosDescontos) / 12;
      
      // Economia de IR mensal
      const economiaIRMensal = irSemPGBLMensal - irComPGBLMensal;
      economiaIRTotal += economiaIRMensal;
      
      // Custos de administração mensal (taxa anual dividida por 12)
      const taxaAdminMensal = taxaAdministracaoPGBL / 12;
      const custoAdminPGBLMensal = saldoPGBL * (taxaAdminMensal / 100);
      const custoAdminVGBLMensal = saldoVGBL * (taxaAdminMensal / 100);
      
      // Rentabilidade mensal (taxa anual convertida para mensal)
      const taxaRentabilidadeMensal = Math.pow(1 + taxaRentabilidade / 100, 1/12) - 1;
      
      // Saldo acumulado PGBL
      saldoPGBL = saldoPGBL * (1 + taxaRentabilidadeMensal) - custoAdminPGBLMensal + contribuicaoLiquidaPGBLMensal;
      
      // Saldo acumulado VGBL
      saldoVGBL = saldoVGBL * (1 + taxaRentabilidadeMensal) - custoAdminVGBLMensal + contribuicaoLiquidaPGBLMensal;
      
      // Saldo reinvestido (se opção ativada)
      if (reinvestirGanhosIR) {
        saldoReinvestido = saldoReinvestido * (1 + taxaRentabilidadeMensal - taxaAdminMensal / 100) + economiaIRMensal;
      } else {
        saldoReinvestido = 0;
      }
      
      // Calcular valor corrigido (valor futuro da contribuição)
      const mesesRestantes = mesesContribuicao - mes - 1;
      const valorCorrigido = contribuicaoLiquidaPGBLMensal * Math.pow(1 + taxaRentabilidadeMensal, mesesRestantes);
      
      // Adicionar à projeção mensal
      projecaoMensal.push({
        ano: anoAtualProjecao,
        mes: mesAtualProjecao,
        idade,
        salarioMensal: salarioMensalAtual,
        contribuicaoPGBLMensal,
        economiaIRMensal,
        saldoPGBL,
        saldoVGBL,
        saldoReinvestido,
        valorCorrigido,
        contribuicaoLiquidaPGBL: contribuicaoLiquidaPGBLMensal
      });
    }
    
    // Usar a projeção mensal diretamente
    setProjecaoAnual(projecaoMensal);
    
    // Para os cálculos de aposentadoria, usamos o último mês
    if (projecaoMensal.length > 0) {
    calcularResultadosAposentadoria(projecaoMensal[projecaoMensal.length - 1]);
  }
    
    setResumoComparativo({
      economiaIRPGBL: economiaIRTotal,
      diferencaSaldos: saldoPGBL - saldoVGBL,
      diferencaRendaLiquida: 0 // Será calculado em calcularResultadosAposentadoria
    });
  }, [dadosPessoais, dadosImpostoRenda, parametrosInvestimento, calcularResultadosAposentadoria]);

  // Efeito para calcular projeção anual quando os dados são alterados
  useEffect(() => {
    calcularProjecaoAnual();
  }, [calcularProjecaoAnual]);

  // Função para calcular os resultados na aposentadoria
  

  // Função para recalcular com feedback
  const handleRecalcular = () => {
    console.log("Recalcular button pressed");
    setIsCalculating(true);
    
    // Simula um delay para dar feedback ao usuário
    setTimeout(() => {
      console.log("About to recalculate");
      calcularProjecaoAnual();
      console.log("Recalculation complete");    
      setIsCalculating(false);
      setShowFeedback(true);
      
      // Esconde o feedback após 3 segundos
      setTimeout(() => {
        setShowFeedback(false);
      }, 3000);
    }, 1500);
  };

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
  
  // Função para gerar relatório em PDF
  const gerarRelatorioPDF = () => {
    const doc = new jsPDF();
    
    // Título
    doc.setFontSize(18);
    doc.text('Relatório Comparativo: PGBL vs VGBL', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 105, 30, { align: 'center' });
    
    // Dados do cliente
    doc.setFontSize(14);
    doc.text('Dados Pessoais', 14, 40);
    doc.setFontSize(10);
    doc.text(`Nome: ${dadosPessoais.nome || 'Não informado'}`, 14, 50);
    doc.text(`Idade Atual: ${calcularIdade(dadosPessoais.dataNascimento)} anos`, 14, 55);
    doc.text(`Idade de Aposentadoria: ${dadosPessoais.idadeAposentadoria} anos`, 14, 60);
    doc.text(`Salário Mensal Atual: ${formatCurrency(dadosPessoais.salarioMensal)}`, 14, 65);
    doc.text(`Taxa de Correção Salarial: ${dadosPessoais.taxaCorrecaoSalarial}% a.a.`, 14, 70);
    
    // Parâmetros de investimento
    doc.setFontSize(14);
    doc.text('Parâmetros de Investimento', 14, 85);
    doc.setFontSize(10);
    doc.text(`Taxa de Rentabilidade: ${parametrosInvestimento.taxaRentabilidade}% a.a.`, 14, 95);
    doc.text(`Taxa de Administração PGBL/VGBL: ${parametrosInvestimento.taxaAdministracaoPGBL}% a.a.`, 14, 100);
    doc.text(`Percentual de Risco: ${parametrosInvestimento.percentualRisco}%`, 14, 105);
    doc.text(`Regime de Tributação: ${parametrosInvestimento.utilizarTabelaRegressiva ? 'Regressivo' : 'Progressivo'}`, 14, 115);
    doc.text(`Tempo de Acumulação: ${parametrosInvestimento.tempoAcumulacao} anos`, 14, 120);
    
    // Resultados na aposentadoria
    doc.setFontSize(14);
    doc.text('Resultados na Aposentadoria', 14, 135);
    
    // Tabela comparativa
    (doc as any).autoTable({
      startY: 145,
      head: [['Categoria', 'PGBL', 'VGBL', 'Diferença']],
      body: [
        ['Saldo acumulado', 
          formatCurrency(resultadosAposentadoria.pgbl.saldo), 
          formatCurrency(resultadosAposentadoria.vgbl.saldo),
          formatCurrency(resultadosAposentadoria.vgbl.saldo - resultadosAposentadoria.pgbl.saldo)
        ],
        ['Renda mensal bruta', 
          formatCurrency(resultadosAposentadoria.pgbl.rendaMensal), 
          formatCurrency(resultadosAposentadoria.vgbl.rendaMensal),
          formatCurrency(resultadosAposentadoria.vgbl.rendaMensal - resultadosAposentadoria.pgbl.rendaMensal)
        ],
        ['Base de cálculo IR', 
          formatCurrency(resultadosAposentadoria.pgbl.baseCalculoIR), 
          formatCurrency(resultadosAposentadoria.vgbl.baseCalculoIR),
          formatCurrency(resultadosAposentadoria.vgbl.baseCalculoIR - resultadosAposentadoria.pgbl.baseCalculoIR)
        ],
        ['Alíquota efetiva IR', 
          `${resultadosAposentadoria.pgbl.aliquotaEfetivaIR.toFixed(2)}%`, 
          `${resultadosAposentadoria.vgbl.aliquotaEfetivaIR.toFixed(2)}%`,
          `${(resultadosAposentadoria.vgbl.aliquotaEfetivaIR - resultadosAposentadoria.pgbl.aliquotaEfetivaIR).toFixed(2)}%`
        ],
        ['IR mensal', 
          formatCurrency(resultadosAposentadoria.pgbl.irMensal || 0), 
          formatCurrency(resultadosAposentadoria.vgbl.irMensal || 0),
          formatCurrency((resultadosAposentadoria.vgbl.irMensal || 0) - (resultadosAposentadoria.pgbl.irMensal || 0))
        ],
        ['Renda líquida mensal', 
          formatCurrency(resultadosAposentadoria.pgbl.rendaLiquida), 
          formatCurrency(resultadosAposentadoria.vgbl.rendaLiquida),
          formatCurrency(resultadosAposentadoria.vgbl.rendaLiquida - resultadosAposentadoria.pgbl.rendaLiquida)
        ],
      ],
      theme: 'grid',
      headStyles: { fillColor: [1, 43, 9], textColor: [255, 255, 255] },
      alternateRowStyles: { fillColor: [233, 237, 229] }
    });
    
    // Economia de IR durante contribuição
    const yPos = (doc as any).lastAutoTable.finalY + 15;
    doc.setFontSize(14);
    doc.text('Economia de IR durante Contribuição', 14, yPos);
    doc.setFontSize(10);
    doc.text(`Total economizado com PGBL: ${formatCurrency(resumoComparativo.economiaIRPGBL)}`, 14, yPos + 10);
    
    // Conclusão
    doc.setFontSize(14);
    doc.text('Conclusão', 14, yPos + 25);
    doc.setFontSize(10);
    
    const conclusaoTexto = resultadosAposentadoria.pgbl.rendaLiquida > resultadosAposentadoria.vgbl.rendaLiquida ?
      `Para seu perfil, o PGBL apresenta-se como a opção mais vantajosa, proporcionando uma renda líquida mensal superior em ${formatCurrency(resultadosAposentadoria.pgbl.rendaLiquida - resultadosAposentadoria.vgbl.rendaLiquida)} na aposentadoria.` :
      `Para seu perfil, o VGBL apresenta-se como a opção mais vantajosa, proporcionando uma renda líquida mensal superior em ${formatCurrency(resultadosAposentadoria.vgbl.rendaLiquida - resultadosAposentadoria.pgbl.rendaLiquida)} na aposentadoria.`;
    
    const splitText = doc.splitTextToSize(conclusaoTexto, 180);
    doc.text(splitText, 14, yPos + 35);
    
    // Rodapé
    // Usando type assertion para acessar o método getNumberOfPages
    const pageCount = (doc.internal as any).getNumberOfPages();
    doc.setFontSize(8);
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text('Pellizzetti Advocacia - Calculadora de Previdência: PGBL vs VGBL', 105, 285, { align: 'center' });
      doc.text(`Página ${i} de ${pageCount}`, 195, 285, { align: 'right' });
    }
    
    // Salvar o PDF
    doc.save(`Relatorio_Previdencia_${dadosPessoais.nome || 'Cliente'}.pdf`);
  };
  
  // Não precisamos mais da função calcularTotais, pois agora calculamos diretamente na tabela

  
  // Função para preparar dados para exportação
  const prepareExportData = useCallback((): ExportData | null => {
    if (projecaoAnual.length === 0) return null;
    
    const lastIndex = projecaoAnual.length - 1;
    const lastDataPoint = projecaoAnual[lastIndex];
    
    // Calculate total contributions
    const totalContribuicaoPGBL = projecaoAnual.reduce((total, row) => 
      total + row.contribuicaoPGBLMensal, 0);
    
    // Prepare projection data for charts
    const anos: number[] = [];
    const saldosPGBL: number[] = [];
    const saldosVGBL: number[] = [];
    const saldosReinvestidos: number[] = [];
    
    // Sample data every 12 months (yearly) to keep the dataset manageable
    for (let i = 0; i < projecaoAnual.length; i += 12) {
      if (i < projecaoAnual.length) {
        anos.push(projecaoAnual[i].idade);
        saldosPGBL.push(projecaoAnual[i].saldoPGBL);
        saldosVGBL.push(projecaoAnual[i].saldoVGBL);
        if (parametrosInvestimento.reinvestirGanhosIR) {
          saldosReinvestidos.push(projecaoAnual[i].saldoReinvestido);
        }
      }
    }
    
    // Determine recommendation
    const isPGBLBetter = resultadosAposentadoria.pgbl.rendaLiquida > resultadosAposentadoria.vgbl.rendaLiquida;
    const recomendacao = isPGBLBetter ? 
      "PGBL - Maior renda líquida na aposentadoria" : 
      "VGBL - Maior renda líquida na aposentadoria";
    
    return {
      dadosPessoais: {
        nome: dadosPessoais.nome,
        idade: calcularIdade(dadosPessoais.dataNascimento),
        idadeAposentadoria: dadosPessoais.idadeAposentadoria,
        salarioMensal: dadosPessoais.salarioMensal
      },
      resultados: {
        saldoPGBL: lastDataPoint.saldoPGBL,
        contribuicaoPGBL: totalContribuicaoPGBL,
        contribuicaoPGBLMensal: contribuicaoPGBLMensalValor, // Valor mensal regular da contribuição PGBL
        saldoVGBL: lastDataPoint.saldoVGBL,
        saldoReinvestido: parametrosInvestimento.reinvestirGanhosIR ? 
          lastDataPoint.saldoReinvestido : undefined,
        rendaLiquidaPGBL: resultadosAposentadoria.pgbl.rendaLiquida,
        rendaLiquidaVGBL: resultadosAposentadoria.vgbl.rendaLiquida,
        economiaIRTotal: resumoComparativo.economiaIRPGBL,
        recomendacao
      },
      projecao: {
        anos,
        saldosPGBL,
        saldosVGBL,
        saldosReinvestidos: parametrosInvestimento.reinvestirGanhosIR ? saldosReinvestidos : undefined
      }
    };
  }, [
    projecaoAnual, 
    parametrosInvestimento.reinvestirGanhosIR, 
    dadosPessoais, 
    resultadosAposentadoria, 
    resumoComparativo.economiaIRPGBL,
    contribuicaoPGBLMensalValor
  ]);
  
  // Função para preparar dados para exportação (mantida para uso interno)
  
  // Effect to export data when projection changes
  useEffect(() => {
    console.log("Export useEffect running");
    console.log("onDataExport exists:", !!onDataExport);
    console.log("projecaoAnual length:", projecaoAnual.length);
  
    // Only export data if we have the callback and data to export
    if (onDataExport && projecaoAnual.length > 0) {
      const lastIndex = projecaoAnual.length - 1;
      const lastDataPoint = projecaoAnual[lastIndex];
      console.log("Last data point:", lastDataPoint);
      
      // Calculate total contributions
      const totalContribuicaoPGBL = projecaoAnual.reduce((total, row) => 
        total + row.contribuicaoPGBLMensal, 0);
      
      const exportData = {
        saldoPGBL: lastDataPoint.saldoPGBL,
        contribuicaoPGBL: totalContribuicaoPGBL,
        contribuicaoPGBLMensal: contribuicaoPGBLMensalValor,
        saldoVGBL: lastDataPoint.saldoVGBL,
        saldoReinvestido: parametrosInvestimento.reinvestirGanhosIR ? 
          lastDataPoint.saldoReinvestido : undefined
      };
      console.log("ATTEMPTING TO EXPORT:", exportData);
      onDataExport(exportData);
    }
  }, [projecaoAnual, parametrosInvestimento.reinvestirGanhosIR, onDataExport, contribuicaoPGBLMensalValor]);
return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ 
            color: '#012B09', 
            fontWeight: 'bold',
            borderBottom: '2px solid #E9EDE5',
            paddingBottom: 2
          }}
        >
          Calculadora de Previdência: PGBL vs VGBL
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Ferramenta exclusiva para planejamento previdenciário
        </Typography>
      </Box>

      <Paper 
        sx={{ 
          width: '100%', 
          mb: 4, 
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          borderRadius: '8px',
          overflow: 'hidden'
        }}
      >
        <Tabs 
          value={tabValue} 
          onChange={handleChangeTab} 
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            backgroundColor: '#E9EDE5',
            '& .MuiTab-root': {
              color: '#012B09',
              fontWeight: 'medium',
              '&.Mui-selected': {
                color: '#012B09',
                fontWeight: 'bold'
              }
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#012B09'
            }
          }}
        >
          <Tab label="Dados Pessoais" />
          <Tab label="Imposto de Renda" />
          <Tab label="Parâmetros de Investimento" />
          <Tab label="Tributação no Recebimento" />
          <Tab label="Projeção Mensal" />
          <Tab label="Resultados na Aposentadoria" />
          {/* Tab disabled but code preserved */}
          {/* <Tab label="Resumo Comparativo" /> */}
        </Tabs>

        {/* Aba de Dados Pessoais */}
        {tabValue === 0 && (
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nome Completo"
                  name="nome"
                  value={dadosPessoais.nome}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDadosPessoais({...dadosPessoais, nome: e.target.value})}
                  margin="normal"
                  variant="outlined"
                  sx={{ mb: 3 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Data de Nascimento"
                  name="dataNascimento"
                  type="date"
                  value={dadosPessoais.dataNascimento}
                  onChange={handleDadosPessoaisChange}
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
                <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                  Idade atual: {calcularIdade(dadosPessoais.dataNascimento)} anos
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Idade de Aposentadoria"
                  name="idadeAposentadoria"
                  type="number"
                  value={dadosPessoais.idadeAposentadoria}
                  onChange={handleDadosPessoaisChange}
                  margin="normal"
                  variant="outlined"
                  InputProps={{ inputProps: { min: calcularIdade(dadosPessoais.dataNascimento) + 1, max: 100 } }}
                />
              </Grid>
              {/* Salary fields moved to "Imposto de Renda" tab */}
            </Grid>
          </Box>
        )}
        
        {/* Nova Aba de Imposto de Renda */}
        {tabValue === 1 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Dados para Cálculo do Imposto de Renda
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Salário Mensal Atual (R$)"
                  name="salarioMensal"
                  type="number"
                  value={dadosPessoais.salarioMensal}
                  onChange={handleDadosPessoaisChange}
                  margin="normal"
                  variant="outlined"
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Taxa de Correção Salarial Anual (%)"
                  name="taxaCorrecaoSalarial"
                  type="number"
                  value={dadosPessoais.taxaCorrecaoSalarial}
                  onChange={handleDadosPessoaisChange}
                  margin="normal"
                  variant="outlined"
                  InputProps={{ inputProps: { min: 0, max: 20, step: 0.1 } }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Paper sx={{ p: 2, bgcolor: '#f8f9fa', mt: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Aposentadoria RPPS
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        name="aposentadoriaIntegral"
                        checked={dadosPessoais.aposentadoriaIntegral}
                        onChange={handleDadosPessoaisChange}
                        color="primary"
                      />
                    }
                    label="Aposentadoria RPPS Integral"
                  />
                  {!dadosPessoais.aposentadoriaIntegral && (
                    <TextField
                      fullWidth
                      label="Valor Mensal Aposentadoria Proporcional (R$)"
                      name="valorAposentadoriaProporcional"
                      type="number"
                      value={dadosPessoais.valorAposentadoriaProporcional}
                      onChange={handleDadosPessoaisChange}
                      margin="normal"
                      variant="outlined"
                      InputProps={{ inputProps: { min: 0 } }}
                    />
                  )}
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Outras Rendas Mensais Atuais (R$)"
                  name="outrasRendas"
                  type="number"
                  value={dadosImpostoRenda.outrasRendas}
                  onChange={handleDadosImpostoRendaChange}
                  margin="normal"
                  variant="outlined"
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Outros Descontos Mensais (R$)"
                  name="outrosDescontos"
                  type="number"
                  value={dadosImpostoRenda.outrosDescontos}
                  onChange={handleDadosImpostoRendaChange}
                  margin="normal"
                  variant="outlined"
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Contribuição Previdência Oficial (%)"
                  name="previdenciaOficial"
                  type="number"
                  value={dadosImpostoRenda.previdenciaOficial}
                  onChange={handleDadosImpostoRendaChange}
                  margin="normal"
                  variant="outlined"
                  InputProps={{ 
                    inputProps: { min: 0, max: 100, step: 0.1 },
                    endAdornment: <span>%</span>
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Número de Dependentes"
                  name="dependentes"
                  type="number"
                  value={dadosImpostoRenda.dependentes}
                  onChange={handleDadosImpostoRendaChange}
                  margin="normal"
                  variant="outlined"
                  InputProps={{ inputProps: { min: 0, max: 10 } }}
                />
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6">Alíquotas de IR na Tabela Progressiva</Typography>
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Base de Cálculo Anual (R$)</TableCell>
                      <TableCell>Alíquota (%)</TableCell>
                      <TableCell>Parcela a Deduzir (R$)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Até 22.847,76</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>0</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>De 22.847,77 até 33.919,80</TableCell>
                      <TableCell>7,5</TableCell>
                      <TableCell>1.713,58</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>De 33.919,81 até 45.012,60</TableCell>
                      <TableCell>15</TableCell>
                      <TableCell>4.257,57</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>De 45.012,61 até 55.976,16</TableCell>
                      <TableCell>22,5</TableCell>
                      <TableCell>7.633,51</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Acima de 55.976,16</TableCell>
                      <TableCell>27,5</TableCell>
                      <TableCell>10.432,32</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            
            <Box sx={{ mt: 4, p: 2, bgcolor: '#f8f9fa', borderRadius: 1 }}>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                Sua Situação Atual
              </Typography>
              <Typography>
                Renda Anual: {formatCurrency((dadosPessoais.salarioMensal + dadosImpostoRenda.outrasRendas) * 12)}
              </Typography>
              <Typography>
                Dedução por Dependentes: {formatCurrency(dadosImpostoRenda.dependentes * 2275.08)}
              </Typography>
              <Typography>
                Dedução Previdência Oficial: {formatCurrency((dadosImpostoRenda.previdenciaOficial / 100) * (dadosPessoais.salarioMensal + dadosImpostoRenda.outrasRendas) * 12)}
              </Typography>
              <Typography>
                Outros Descontos: {formatCurrency(dadosImpostoRenda.outrosDescontos * 12)}
              </Typography>
              <Typography>
                Base de Cálculo: {formatCurrency(Math.max(0, (dadosPessoais.salarioMensal + dadosImpostoRenda.outrasRendas) * 12 - dadosImpostoRenda.dependentes * 2275.08 - (dadosImpostoRenda.previdenciaOficial / 100) * (dadosPessoais.salarioMensal + dadosImpostoRenda.outrasRendas) * 12 - dadosImpostoRenda.outrosDescontos * 12))}
              </Typography>
              <Typography>
                Alíquota Efetiva: {formatPercent(calcularIR(
                  (dadosPessoais.salarioMensal + dadosImpostoRenda.outrasRendas) * 12,
                  dadosImpostoRenda.dependentes,
                  dadosImpostoRenda.previdenciaOficial,
                  dadosImpostoRenda.outrosDescontos
                ) / ((dadosPessoais.salarioMensal + dadosImpostoRenda.outrasRendas) * 12) * 100)}
              </Typography>
              <Typography>
                IR Anual Estimado: {formatCurrency(calcularIR(
                  (dadosPessoais.salarioMensal + dadosImpostoRenda.outrasRendas) * 12,
                  dadosImpostoRenda.dependentes,
                  dadosImpostoRenda.previdenciaOficial,
                  dadosImpostoRenda.outrosDescontos
                ))}
              </Typography>
            </Box>
          </Box>
        )}

        {/* Aba de Parâmetros de Investimento */}
        {tabValue === 2 && (
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Taxa de Rentabilidade Anual (%)"
                  name="taxaRentabilidade"
                  type="number"
                  value={parametrosInvestimento.taxaRentabilidade}
                  onChange={handleParametrosInvestimentoChange}
                  margin="normal"
                  variant="outlined"
                  InputProps={{ inputProps: { min: 0, max: 20, step: 0.1 } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Taxa de Administração PGBL/VGBL (% a.a.)"
                  name="taxaAdministracaoPGBL"
                  type="number"
                  value={parametrosInvestimento.taxaAdministracaoPGBL}
                  onChange={handleParametrosInvestimentoChange}
                  margin="normal"
                  variant="outlined"
                  InputProps={{ inputProps: { min: 0, max: 5, step: 0.1 } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Percentual Destinado à Parcela de Risco (%)"
                  name="percentualRisco"
                  type="number"
                  value={parametrosInvestimento.percentualRisco}
                  onChange={handleParametrosInvestimentoChange}
                  margin="normal"
                  variant="outlined"
                  InputProps={{ inputProps: { min: 0, max: 50, step: 0.1 } }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Paper sx={{ p: 2, bgcolor: '#f8f9fa', mt: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Estratégia de Investimento
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          name="investirSempre12Porcento"
                          checked={parametrosInvestimento.investirSempre12Porcento}
                          onChange={handleParametrosInvestimentoChange}
                          color="primary"
                        />
                      }
                      label="Investir sempre 12% da renda anual"
                    />
                    <Tooltip title="O limite de dedução do PGBL na declaração do IR é de 12% da renda tributável anual">
                      <HelpOutlineIcon fontSize="small" color="action" sx={{ ml: 1 }} />
                    </Tooltip>
                  </Box>
                  
                  {!parametrosInvestimento.investirSempre12Porcento && (
                    <TextField
                      fullWidth
                      label="Valor de Investimento Anual (R$)"
                      name="valorInvestimentoAnual"
                      type="number"
                      value={parametrosInvestimento.valorInvestimentoAnual}
                      onChange={handleParametrosInvestimentoChange}
                      margin="normal"
                      variant="outlined"
                      InputProps={{ inputProps: { min: 0 } }}
                    />
                  )}
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          name="reinvestirGanhosIR"
                          checked={parametrosInvestimento.reinvestirGanhosIR}
                          onChange={handleParametrosInvestimentoChange}
                          color="primary"
                        />
                      }
                      label="Reinvestir ganhos com desconto na declaração de IR"
                    />
                    <Tooltip title="A economia de IR obtida com o PGBL será reinvestida em um fundo VGBL">
                      <HelpOutlineIcon fontSize="small" color="action" sx={{ ml: 1 }} />
                    </Tooltip>
                  </Box>
                </Paper>
              </Grid>
              
              {/* Removido o bloco de Tributação na Fase de Recebimento */}
            </Grid>
          </Box>
        )}

        {/* Nova Aba de Tributação no Recebimento */}
        {tabValue === 3 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#012B09', fontWeight: 'medium' }}>
              Tributação no Recebimento do Benefício
            </Typography>
            
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, bgcolor: '#f8f9fa', height: '100%' }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#012B09' }}>
                    PGBL - Tributação
                  </Typography>
                  <Typography paragraph>
                    No PGBL, o Imposto de Renda incide sobre a <strong>totalidade do benefício</strong> recebido, 
                    incluindo tanto o capital investido quanto os rendimentos.
                  </Typography>
                  <Typography paragraph>
                    Por exemplo, se você receber R$ 5.000,00 mensais de um plano PGBL, 
                    o IR incidirá sobre o valor total de R$ 5.000,00.
                  </Typography>
                  <Typography>
                    Isso ocorre porque no PGBL você já obteve benefício fiscal no momento da contribuição, 
                    deduzindo os valores investidos da base de cálculo do IR.
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, bgcolor: '#f8f9fa', height: '100%' }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#012B09' }}>
                    VGBL - Tributação
                  </Typography>
                  <Typography paragraph>
                    No VGBL, o Imposto de Renda incide <strong>apenas sobre os rendimentos</strong>, 
                    não sobre o capital investido.
                  </Typography>
                  <Typography paragraph>
                    Por exemplo, se você investiu R$ 100.000,00 e seu saldo acumulado é de R$ 150.000,00, 
                    o IR incidirá apenas sobre os R$ 50.000,00 de rendimentos (33,33% do valor total).
                  </Typography>
                  <Typography>
                    Isso ocorre porque no VGBL você não teve benefício fiscal no momento da contribuição, 
                    tendo investido com recursos já tributados.
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={12}>
                <Paper sx={{ p: 3, mt: 2 }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#012B09' }}>
                    Tabela Regressiva de Imposto de Renda (Lei 11.053/2004)
                  </Typography>
                  <Typography paragraph>
                    A tabela regressiva, instituída pela Lei 11.053/2004, oferece alíquotas menores quanto maior for o tempo de acumulação do investimento, incentivando o investimento de longo prazo. Esta opção é especialmente vantajosa para quem planeja manter os recursos investidos por mais de 10 anos.
                  </Typography>
                  
                  <Typography paragraph>
                    <strong>Importante:</strong> Na tabela regressiva, cada aporte é tributado individualmente de acordo com seu tempo de permanência. 
                    Isso significa que, ao sacar todo o valor de uma vez, diferentes partes do seu investimento podem ser tributadas com alíquotas diferentes.
                  </Typography>
                  
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ bgcolor: '#E9EDE5' }}>
                          <TableCell>Prazo de Acumulação</TableCell>
                          <TableCell align="center">Alíquota</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>Até 2 anos</TableCell>
                          <TableCell align="center">35%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>De 2 a 4 anos</TableCell>
                          <TableCell align="center">30%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>De 4 a 6 anos</TableCell>
                          <TableCell align="center">25%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>De 6 a 8 anos</TableCell>
                          <TableCell align="center">20%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>De 8 a 10 anos</TableCell>
                          <TableCell align="center">15%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Acima de 10 anos</TableCell>
                          <TableCell align="center">10%</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                      Comparativo entre Tabela Progressiva e Regressiva
                    </Typography>
                    <Typography paragraph>
                      <strong>Tabela Progressiva:</strong> Utiliza as mesmas alíquotas do IR convencional (0%, 7,5%, 15%, 22,5% e 27,5%), 
                      com possibilidade de deduções. É mais vantajosa para quem tem renda mensal menor na aposentadoria.
                    </Typography>
                    <Typography>
                      <strong>Tabela Regressiva:</strong> Alíquotas diminuem conforme o tempo de investimento, 
                      sem possibilidade de deduções. É mais vantajosa para investimentos de longo prazo e valores maiores.
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              
              <Grid item xs={12}>
                <Paper sx={{ p: 3, mt: 2 }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#012B09' }}>
                    Formas de Recebimento e Impacto na Tributação
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 2, bgcolor: '#f8f9fa', height: '100%' }}>
                        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
                          Recebimento em Parcela Única
                        </Typography>
                        <Typography paragraph>
                          Nesta modalidade, o valor total acumulado é recebido de uma só vez. 
                          Na tabela progressiva, incidirá a alíquota de até 27,5% sobre o valor total.
                        </Typography>
                        <Typography paragraph>
                          Na tabela regressiva, cada aporte será tributado conforme seu tempo de permanência. 
                          Aportes mais recentes podem ser tributados com alíquotas maiores (até 35%), 
                          enquanto os mais antigos terão alíquotas menores (mínimo de 10%).
                        </Typography>
                      </Paper>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 2, bgcolor: '#f8f9fa', height: '100%' }}>
                        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
                          Recebimento em Forma Diluída
                        </Typography>
                        <Typography paragraph>
                          Nesta modalidade, o valor é recebido mensalmente. Na tabela progressiva, 
                          como as mensalidades são menores, pode-se enquadrar em alíquotas inferiores a 27,5%.
                        </Typography>
                        <Typography paragraph>
                          Na tabela regressiva, há vantagem adicional: os aportes mais antigos são resgatados 
                          primeiro, beneficiando-se da alíquota mínima de 10% desde o início do recebimento.
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              
              <Grid item xs={12}>
                <Paper sx={{ p: 3, mt: 2, bgcolor: '#f8f9fa' }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#012B09' }}>
                    Sua Situação com Base nos Parâmetros Informados
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" gutterBottom>
                        Regime de Tributação Selecionado:
                      </Typography>
                      <Typography paragraph sx={{ fontWeight: 'medium' }}>
                        {parametrosInvestimento.utilizarTabelaRegressiva ? 'Tabela Regressiva' : 'Tabela Progressiva'}
                      </Typography>
                      
                      {parametrosInvestimento.utilizarTabelaRegressiva && (
                        <>
                          <Typography variant="subtitle2" gutterBottom>
                            Tempo de Acumulação:
                          </Typography>
                          <Typography paragraph sx={{ fontWeight: 'medium' }}>
                            {parametrosInvestimento.tempoAcumulacao} anos
                          </Typography>
                          
                          <Typography variant="subtitle2" gutterBottom>
                            Alíquota Aplicável:
                          </Typography>
                          <Typography paragraph sx={{ fontWeight: 'medium' }}>
                            {parametrosInvestimento.tempoAcumulacao > 10 ? '10%' :
                             parametrosInvestimento.tempoAcumulacao > 8 ? '15%' :
                             parametrosInvestimento.tempoAcumulacao > 6 ? '20%' :
                             parametrosInvestimento.tempoAcumulacao > 4 ? '25%' :
                             parametrosInvestimento.tempoAcumulacao > 2 ? '30%' : '35%'}
                          </Typography>
                        </>
                      )}
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" gutterBottom>
                        Economia de IR durante a fase de contribuição (PGBL):
                      </Typography>
                      <Typography paragraph sx={{ fontWeight: 'medium' }}>
                        {formatCurrency(resumoComparativo.economiaIRPGBL)}
                      </Typography>
                      
                      <Typography variant="subtitle2" gutterBottom>
                        Economia de IR na fase de recebimento (VGBL):
                      </Typography>
                      <Typography paragraph sx={{ fontWeight: 'medium' }}>
                        {formatCurrency((resultadosAposentadoria.pgbl.irMensal || 0) * 12 * 20 - (resultadosAposentadoria.vgbl.irMensal || 0) * 12 * 20)}
                        {' '}(estimativa para 20 anos de recebimento)
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Aba de Projeção Mensal */}
        {tabValue === 4 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Projeção Mensal
            </Typography>
            <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Ano</TableCell>
                    <TableCell>Mês</TableCell>
                    <TableCell>Idade</TableCell>
                    <TableCell>Salário Mensal</TableCell>
                    <TableCell>Contrib. PGBL</TableCell>
                    <TableCell>Economia IR</TableCell>
                    <TableCell>Valor Corrigido</TableCell>
                    <TableCell>Saldo PGBL</TableCell>
                    <TableCell>Saldo VGBL</TableCell>
                    {parametrosInvestimento.reinvestirGanhosIR && (
                      <TableCell>Saldo Reinvestido</TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {projecaoAnual.map((row, index) => (
                    <TableRow key={`${row.ano}-${row.mes}-${index}`}>
                      <TableCell>{row.ano}</TableCell>
                      <TableCell>{row.mes + 1}</TableCell>
                      <TableCell>{row.idade}</TableCell>
                      <TableCell>{formatCurrency(row.salarioMensal)}</TableCell>
                      <TableCell>{formatCurrency(row.contribuicaoPGBLMensal)}</TableCell>
                      <TableCell>{formatCurrency(row.economiaIRMensal)}</TableCell>
                      <TableCell>{formatCurrency(row.valorCorrigido)}</TableCell>
                      <TableCell>{formatCurrency(row.saldoPGBL)}</TableCell>
                      <TableCell>{formatCurrency(row.saldoVGBL)}</TableCell>
                      {parametrosInvestimento.reinvestirGanhosIR && (
                        <TableCell>{formatCurrency(row.saldoReinvestido)}</TableCell>
                      )}
                    </TableRow>
                  ))}
                  
                  {/* Linha de totais */}
                  <TableRow sx={{ fontWeight: 'bold', bgcolor: '#f8f9fa' }}>
                    <TableCell colSpan={4} align="right"><strong>TOTAIS:</strong></TableCell>
                    <TableCell><strong>{formatCurrency(projecaoAnual.reduce((total, row) => total + row.contribuicaoPGBLMensal, 0))}</strong></TableCell>
                    <TableCell><strong>{formatCurrency(projecaoAnual.reduce((total, row) => total + row.economiaIRMensal, 0))}</strong></TableCell>
                    <TableCell colSpan={parametrosInvestimento.reinvestirGanhosIR ? 4 : 3}></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ height: 400, mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Evolução do Saldo Acumulado
              </Typography>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={projecaoAnual}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="idade" label={{ value: 'Idade', position: 'insideBottomRight', offset: -10 }} />
                  <YAxis tickFormatter={(value) => `R$ ${value.toLocaleString()}`} />
                  <RechartsTooltip formatter={(value: any) => formatCurrency(typeof value === 'number' ? value : 0)} />
                  <Legend />
                  <Line type="monotone" dataKey="saldoPGBL" name="Saldo PGBL" stroke="#012B09" strokeWidth={2} />
                  <Line type="monotone" dataKey="saldoVGBL" name="Saldo VGBL" stroke="#82ca9d" strokeWidth={2} />
                  {parametrosInvestimento.reinvestirGanhosIR && (
                    <Line type="monotone" dataKey="saldoReinvestido" name="Saldo Reinvestido" stroke="#8884d8" strokeWidth={2} />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        )}

        {/* Aba de Resultados na Aposentadoria */}
        {tabValue === 5 && (
          <ResultadosAposentadoria 
            resultadosAposentadoria={resultadosAposentadoria}
            parametrosInvestimento={parametrosInvestimento}
            projecaoAnual={projecaoAnual}
            aposentadoriaRPPSValor={aposentadoriaRPPSValor}
            outrasRendasCorrigidasValor={outrasRendasCorrigidasValor}
            formatCurrency={formatCurrency}
            exportData={prepareExportData()?.resultados}
            monthlyResults={{
              pgblMonthlyContribution: contribuicaoPGBLMensalValor,
              pgblMonthlyIncome: resultadosAposentadoria.pgbl.rendaLiquida,
              vgblMonthlyIncome: resultadosAposentadoria.vgbl.rendaLiquida,
              taxSavingsMonthly: resumoComparativo.economiaIRPGBL / (projecaoAnual.length > 0 ? projecaoAnual.length : 1)
            }}
          />
        )}

        {/* Aba de Resumo Comparativo */}
        {tabValue === 6 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#012B09', fontWeight: 'medium' }}>
              Resumo Comparativo PGBL vs VGBL
            </Typography>
            
            <TableContainer component={Paper} sx={{ mb: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
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
                    <TableCell>Economia de IR durante contribuição</TableCell>
                    <TableCell align="right">{formatCurrency(resumoComparativo.economiaIRPGBL)}</TableCell>
                    <TableCell align="right">{formatCurrency(0)}</TableCell>
                    <TableCell align="right">{formatCurrency(resumoComparativo.economiaIRPGBL)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Saldo acumulado na aposentadoria</TableCell>
                    <TableCell align="right">{formatCurrency(resultadosAposentadoria.pgbl.saldo)}</TableCell>
                    <TableCell align="right">{formatCurrency(resultadosAposentadoria.vgbl.saldo)}</TableCell>
                    <TableCell align="right">{formatCurrency(resultadosAposentadoria.vgbl.saldo - resultadosAposentadoria.pgbl.saldo)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Renda mensal líquida na aposentadoria</TableCell>
                    <TableCell align="right">{formatCurrency(resultadosAposentadoria.pgbl.rendaLiquida)}</TableCell>
                    <TableCell align="right">{formatCurrency(resultadosAposentadoria.vgbl.rendaLiquida)}</TableCell>
                    <TableCell align="right">{formatCurrency(resultadosAposentadoria.vgbl.rendaLiquida - resultadosAposentadoria.pgbl.rendaLiquida)}</TableCell>
                  </TableRow>
                  {parametrosInvestimento.reinvestirGanhosIR && (
                    <TableRow>
                      <TableCell>Renda adicional do reinvestimento</TableCell>
                      <TableCell align="right">-</TableCell>
                      <TableCell align="right">
                        {formatCurrency(projecaoAnual.length > 0 ? projecaoAnual[projecaoAnual.length - 1].saldoReinvestido / (20 * 12) : 0)}
                      </TableCell>
                      <TableCell align="right">
                        {formatCurrency(projecaoAnual.length > 0 ? projecaoAnual[projecaoAnual.length - 1].saldoReinvestido / (20 * 12) : 0)}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#012B09', fontWeight: 'medium' }}>
                Conclusão
              </Typography>
              <Paper sx={{ p: 3, bgcolor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <Typography>
                  {resultadosAposentadoria.pgbl.rendaLiquida > resultadosAposentadoria.vgbl.rendaLiquida && 
                   (!parametrosInvestimento.reinvestirGanhosIR || 
                    (resultadosAposentadoria.pgbl.rendaLiquida > 
                     resultadosAposentadoria.vgbl.rendaLiquida + 
                     (projecaoAnual.length > 0 ? projecaoAnual[projecaoAnual.length - 1].saldoReinvestido / (20 * 12) : 0))) ? (
                    <>
                      Para seu perfil, o <strong>PGBL</strong> apresenta-se como a opção mais vantajosa,
                      proporcionando uma renda líquida mensal superior em {formatCurrency(resultadosAposentadoria.pgbl.rendaLiquida - resultadosAposentadoria.vgbl.rendaLiquida)} 
                      na aposentadoria, além de uma economia total de IR durante o período de contribuição 
                      de {formatCurrency(resumoComparativo.economiaIRPGBL)}.
                    </>
                  ) : (
                    <>
                      Para seu perfil, o <strong>VGBL</strong> apresenta-se como a opção mais vantajosa,
                      proporcionando uma renda líquida mensal superior em {formatCurrency(resultadosAposentadoria.vgbl.rendaLiquida - resultadosAposentadoria.pgbl.rendaLiquida)} 
                      na aposentadoria
                      {parametrosInvestimento.reinvestirGanhosIR && (
                        <>, que pode ser ainda maior considerando a renda adicional de {formatCurrency(projecaoAnual.length > 0 ? projecaoAnual[projecaoAnual.length - 1].saldoReinvestido / (20 * 12) : 0)} do reinvestimento</>
                      )}
                      , apesar da economia de IR de {formatCurrency(resumoComparativo.economiaIRPGBL)} durante o 
                      período de contribuição oferecida pelo PGBL.
                    </>
                  )}
                </Typography>
                
                <Typography sx={{ mt: 2, fontWeight: 'medium' }}>
                  Recomendações:
                </Typography>
                <ul>
                  <li>
                    <Typography>
                      {resumoComparativo.economiaIRPGBL > 0 && resultadosAposentadoria.pgbl.rendaLiquida < resultadosAposentadoria.vgbl.rendaLiquida ? (
                        <>
                          Considere investir a economia de IR do PGBL em investimentos complementares 
                          para potencializar seu patrimônio.
                        </>
                      ) : (
                        <>
                          Continue acompanhando a evolução dos seus investimentos e reavalie sua 
                          estratégia previdenciária anualmente.
                        </>
                      )}
                    </Typography>
                  </li>
                  <li>
                    <Typography>
                      Diversifique seus investimentos para além da previdência privada, 
                      considerando opções como Tesouro Direto, fundos de investimento e ações.
                    </Typography>
                  </li>
                  <li>
                    <Typography>
                      Consulte um especialista em direito previdenciário para avaliar as melhores estratégias 
                      para sua aposentadoria, considerando também os benefícios do INSS e outros regimes.
                    </Typography>
                  </li>
                </ul>
              </Paper>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={gerarRelatorioPDF}
                  startIcon={<SaveIcon />}
                  sx={{ 
                    py: 1.5, 
                    px: 4, 
                    backgroundColor: '#012B09',
                    '&:hover': {
                      backgroundColor: '#01461E',
                    },
                    borderRadius: '8px',
                    fontWeight: 'bold'
                  }}
                >
                  Gerar Relatório PDF
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 5 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleRecalcular}
          disabled={isCalculating}
          sx={{ 
            py: 1.5, 
            px: 4, 
            backgroundColor: '#012B09',
            '&:hover': {
              backgroundColor: '#01461E',
            },
            borderRadius: '8px',
            fontWeight: 'bold'
          }}
        >
          {isCalculating ? (
            <>
              <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
              Calculando...
            </>
          ) : 'Recalcular'}
        </Button>
      </Box>
      
      <Snackbar 
        open={showFeedback} 
        autoHideDuration={3000} 
        onClose={() => setShowFeedback(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Cálculos atualizados com sucesso!
        </Alert>
      </Snackbar>
    </Container>
  );
};


// Set default props
PrevCalculator.defaultProps = {
  onDataExport: undefined
};
export default PrevCalculator;

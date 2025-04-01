import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DataVisualizer from '../components/PrevCalculator/DataVisualizer';

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

export default function VisualizarPrevidencia() {
  const [data, setData] = useState<ExportData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string);
        
        // Validar se o JSON tem a estrutura esperada
        if (!jsonData.dadosPessoais || !jsonData.resultados || !jsonData.projecao) {
          throw new Error('O arquivo JSON não contém os dados esperados.');
        }
        
        setData(jsonData);
        setLoading(false);
      } catch (err) {
        setError('Erro ao processar o arquivo. Certifique-se de que é um JSON válido exportado pela calculadora.');
        setLoading(false);
      }
    };
    
    reader.onerror = () => {
      setError('Erro ao ler o arquivo.');
      setLoading(false);
    };
    
    reader.readAsText(file);
  }, []);

  const handleCalculatorRedirect = () => {
    router.push('/test-calculator');
  };

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
          Visualizador de Dados Previdenciários
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Carregue um arquivo JSON exportado da calculadora para visualizar os resultados
        </Typography>
      </Box>

      {!data && (
        <Paper 
          sx={{ 
            p: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '300px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            borderRadius: '8px',
          }}
        >
          <input
            accept="application/json"
            style={{ display: 'none' }}
            id="upload-json-file"
            type="file"
            onChange={handleFileUpload}
          />
          <label htmlFor="upload-json-file">
            <Button
              variant="contained"
              component="span"
              startIcon={<UploadFileIcon />}
              sx={{ 
                py: 1.5, 
                px: 4, 
                backgroundColor: '#012B09',
                '&:hover': {
                  backgroundColor: '#01461E',
                },
                borderRadius: '8px',
                fontWeight: 'bold',
                mb: 3
              }}
            >
              Carregar Arquivo JSON
            </Button>
          </label>
          
          {loading && (
            <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CircularProgress size={40} sx={{ mb: 2 }} />
              <Typography>Processando arquivo...</Typography>
            </Box>
          )}
          
          {error && (
            <Alert severity="error" sx={{ mt: 3, width: '100%' }}>
              {error}
            </Alert>
          )}
          
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body1" paragraph>
              Não tem um arquivo para carregar?
            </Typography>
            <Button 
              variant="outlined" 
              onClick={handleCalculatorRedirect}
              sx={{ 
                borderColor: '#012B09',
                color: '#012B09',
                '&:hover': {
                  borderColor: '#01461E',
                  backgroundColor: 'rgba(1, 43, 9, 0.04)',
                },
              }}
            >
              Ir para a Calculadora
            </Button>
          </Box>
        </Paper>
      )}

      {data && <DataVisualizer data={data} />}
      
      {data && (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button 
            variant="outlined" 
            onClick={() => setData(null)}
            sx={{ 
              borderColor: '#012B09',
              color: '#012B09',
              '&:hover': {
                borderColor: '#01461E',
                backgroundColor: 'rgba(1, 43, 9, 0.04)',
              },
              mr: 2
            }}
          >
            Carregar Outro Arquivo
          </Button>
          
          <Button 
            variant="contained" 
            onClick={handleCalculatorRedirect}
            sx={{ 
              backgroundColor: '#012B09',
              '&:hover': {
                backgroundColor: '#01461E',
              },
            }}
          >
            Ir para a Calculadora
          </Button>
        </Box>
      )}
    </Container>
  );
}

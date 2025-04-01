import Head from 'next/head';
import { Box, Container } from '@mui/material';
import PrevCalculator from '../components/PrevCalculator';
import Footer from '../components/Footer';
import CalcHeader from '../components/CalcHeader'

const CalculadoraPgblVgblPage = () => {
  return (
    <>
      <Head>
        <title>Calculadora PGBL vs VGBL | Planejamento Previdenciário | Pellizzetti Advocacia</title>
        <meta name="description" content="Calculadora para comparar PGBL e VGBL e auxiliar no planejamento previdenciário. Ferramenta exclusiva da Pellizzetti Advocacia." />
        <meta name="keywords" content="calculadora previdenciária, PGBL, VGBL, planejamento previdenciário, aposentadoria, simulação previdenciária" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <CalcHeader/>

      <Box sx={{
        paddingTop: '120px',
        paddingBottom: '60px',
        backgroundColor: '#f9f9f9'
      }}>
        <Container maxWidth="lg">
          <h1 className="text-center text-3xl font-bold mb-8">Calculadora PGBL vs VGBL</h1>
          <p className="text-center mb-8">Compare os benefícios entre PGBL e VGBL para tomar a melhor decisão para sua aposentadoria</p>
          <PrevCalculator />
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default CalculadoraPgblVgblPage;

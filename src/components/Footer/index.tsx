// src/components/Footer/index.tsx
import React from 'react';
import Link from 'next/link';
import { Box, Container, Grid, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#012B09',
        color: 'white',
        py: 6,
        mt: 8
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Pellizzetti Advocacia
            </Typography>
            <Typography variant="body2">
              Especialistas em Direito Previdenciário
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Link href="/" passHref>
                <Typography 
                  component="a" 
                  sx={{ 
                    color: 'white', 
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  Início
                </Typography>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contato
            </Typography>
            <Typography variant="body2">
              Telefone: (45) 99131-3858
            </Typography>
            <Typography variant="body2">
              Email: contato@pellizzetti.adv.br
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Redes Sociais
            </Typography>
            <Link href="https://www.youtube.com/@brunopellizzetti" passHref>
              <Typography 
                component="a" 
                sx={{ 
                  color: 'white', 
                  textDecoration: 'none',
                  display: 'block',
                  mb: 1,
                  '&:hover': { textDecoration: 'underline' }
                }}
                target="_blank"
                rel="noreferrer"
              >
                YouTube
              </Typography>
            </Link>
            <Link href="https://api.whatsapp.com/send?phone=5545991313858" passHref>
              <Typography 
                component="a" 
                sx={{ 
                  color: 'white', 
                  textDecoration: 'none',
                  display: 'block',
                  '&:hover': { textDecoration: 'underline' }
                }}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </Typography>
            </Link>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} Pellizzetti Advocacia. Todos os direitos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

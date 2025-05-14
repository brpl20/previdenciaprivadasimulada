// src/components/Header/index.tsx
"use client";

import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Box,
  Menu,
  MenuItem,
  Typography,
  styled,
  Button,
  ButtonProps,
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useNavStyles } from "@/hooks/useNavStyles";
import { useNavAnimation } from "@/hooks/useNavAnimation";
import { useMobileNav } from "@/hooks/useMobileNav";
import { PositionColorRelation } from "@/hooks/types";

interface HeaderProps {
  positionColorRelation: PositionColorRelation
}


const StyledButton = styled(Button)({
  textTransform: 'none',
  fontSize: '1.25rem',
  fontWeight: 300,
  color: '#012B09',
  '&:hover': {
    backgroundColor: 'transparent',
  }
});

interface CustomButtonProps extends ButtonProps {
  target?: string;
  rel?: string;
}

const YoutubeButton = styled(Button)<CustomButtonProps>({
  textTransform: 'none',
  fontSize: '1.25rem',
  fontWeight: 300,
  color: 'white',
  backgroundColor: '#FF0000',
  borderRadius: '30px',
  padding: '8px 16px',
  width: '150px',
  '&:hover': {
    backgroundColor: '#CC0000',
  }
});

const ContactButton = styled(Button)<CustomButtonProps>({
  textTransform: 'none',
  fontSize: '1.25rem',
  fontWeight: 300,
  color: '#E5E9E5',
  backgroundColor: '#4C6751',
  borderRadius: '30px',
  padding: '8px 16px',
  width: '150px',
  '&:hover': {
    backgroundColor: '#012B09',
  }
});

export const Header = ({ positionColorRelation }: HeaderProps) => {
  const { navStyles } = useNavStyles(positionColorRelation);
  const { menuAnimation, navOptionsAnimation } = useNavAnimation();
  const { handleRedirect, isNavOpen, openCloseNav } = useMobileNav();

  const [faqAnchorEl, setFaqAnchorEl] = useState<null | HTMLElement>(null);
  const [toolsAnchorEl, setToolsAnchorEl] = useState<null | HTMLElement>(null);

  const handleFaqMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setFaqAnchorEl(event.currentTarget);
  };

  const handleToolsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setToolsAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setFaqAnchorEl(null);
    setToolsAnchorEl(null);
  };

  return (
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#E9EDE5',
          boxShadow: 3,
          py: 1,
          ...(isNavOpen && { height: '100%' })
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ px: 2, py: 0 }}>
            <Box sx={{ flexGrow: 1 }} />

            {/* Mobile menu button */}
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={openCloseNav}
              sx={{ display: { xs: 'flex', md: 'none' } }}
            >
              <MenuIcon fontSize="large" />
            </IconButton>

            {/* Mobile menu drawer */}
            <Drawer
              anchor="top"
              open={isNavOpen}
              onClose={openCloseNav}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiDrawer-paper': {
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'white',
                  pt: 2
                }
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                <IconButton onClick={openCloseNav} aria-label="fechar menu">
                  <CloseIcon fontSize="large" />
                </IconButton>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 2 }}>
                <a href="https://www.pellizzetti.adv.br/">
                  <Image
                    width={120}
                    height={70}
                    src="/logoCompleta.svg"
                    alt="Advogado Previdenciário Benefício INSS"
                    style={{ width: '120px', cursor: 'pointer' }}
                    priority
                  />
                </a>
              </Box>

              <motion.div
                variants={navOptionsAnimation}
                initial="hidden"
                animate={isNavOpen ? "visible" : "hidden"}
              >
                <List sx={{ mt: 10 }}>
                  <Typography variant="h6" sx={{ color: '#012B09', fontWeight: 600, textAlign: 'center', mb: 2 }}>
                    FAQs
                  </Typography>

                  <ListItem disablePadding>
                    <ListItemButton
                      component="a"
                      href="https://www.pellizzetti.adv.br/blog/faq-advogado"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ textAlign: 'center' }}
                    >
                      <ListItemText
                        primary="FAQ Advogado"
                        sx={{ color: '#012B09', textAlign: 'center' }}
                      />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton
                      component="a"
                      href="https://www.pellizzetti.adv.br/blog/faq-beneficio"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ textAlign: 'center' }}
                    >
                      <ListItemText
                        primary="FAQ Benefício"
                        sx={{ color: '#012B09', textAlign: 'center' }}
                      />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton
                      component="a"
                      href="https://www.pellizzetti.adv.br/blog/faq-tutoriais"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ textAlign: 'center' }}
                    >
                      <ListItemText
                        primary="FAQ Tutoriais"
                        sx={{ color: '#012B09', textAlign: 'center' }}
                      />
                    </ListItemButton>
                  </ListItem>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="h6" sx={{ color: '#012B09', fontWeight: 600, textAlign: 'center', mb: 2 }}>
                    Ferramentas
                  </Typography>

                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleRedirect("calculadora-pgbl-vgbl")}>
                      <ListItemText primary="Calculadora PGBL vs VGBL" sx={{ color: '#012B09', textAlign: 'center' }} />
                    </ListItemButton>
                  </ListItem>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="h6" sx={{ color: '#012B09', fontWeight: 600, textAlign: 'center', mb: 2 }}>
                    Navegação
                  </Typography>

                  <ListItem disablePadding>
                    <ListItemButton
                      component="a"
                      href="https://www.pellizzetti.adv.br/#especialistas"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ textAlign: 'center' }}
                    >
                      <ListItemText
                        primary="Especialistas"
                        sx={{ color: '#012B09', textAlign: 'center' }}
                      />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton
                      component="a"
                      href="https://www.pellizzetti.adv.br/blog"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ textAlign: 'center' }}
                    >
                      <ListItemText
                        primary="Blog"
                        sx={{ color: '#012B09', textAlign: 'center' }}
                      />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton
                      component="a"
                      href="https://www.pellizzetti.adv.br/#quem_somos"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ textAlign: 'center' }}
                    >
                      <ListItemText
                        primary="Quem Somos"
                        sx={{ color: '#012B09', textAlign: 'center' }}
                      />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton
                      component="a"
                      href="https://www.pellizzetti.adv.br/ebook"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ textAlign: 'center' }}
                    >
                      <ListItemText
                        primary="E-book"
                        sx={{ color: '#012B09', textAlign: 'center' }}
                      />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton
                      component="a"
                      href="https://www.youtube.com/@brunopellizzetti"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ListItemText
                        primary="Youtube"
                        sx={{
                          color: 'red',
                          textAlign: 'center',
                          fontWeight: 600
                        }}
                      />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton
                      component="a"
                      href="https://api.whatsapp.com/send?phone=5545991313858&text=Ol%C3%A1%2C%20visitei%20seu%20site%20e%20gostaria%20de%20obter%20mais%20informa%C3%A7%C3%B5es%20sobre%20minha%20aposentadoria."
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ListItemText primary="Contato" sx={{ color: '#012B09', textAlign: 'center' }} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </motion.div>
            </Drawer>

            {/* Desktop navigation */}
            <Box sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 3,
              color: '#012B09'
            }}>
              <a href="https://www.pellizzetti.adv.br/">
              <Image
                width={120}
                height={70}
                src="/logoCompleta.svg"
                alt="Advogado Previdenciário Benefício INSS"
                style={{ width: '120px', cursor: 'pointer' }}
                priority
              />
            </a>

              {/* FAQ Menu */}
              <div>
                <StyledButton
                  onClick={handleFaqMenuOpen}
                  endIcon={<span style={{ fontSize: '0.75rem' }}>▼</span>}
                >
                  FAQs
                </StyledButton>
                <Menu
                  anchorEl={faqAnchorEl}
                  open={Boolean(faqAnchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                  sx={{ mt: 1 }}
                >
                  <MenuItem
                    onClick={() => {
                      window.open("https://www.pellizzetti.adv.br/blog/faq-advogado", "_self");
                      handleMenuClose();
                    }}
                  >
                    FAQ Advogado
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      window.open("https://www.pellizzetti.adv.br/blog/faq-beneficio", "_self");
                      handleMenuClose();
                    }}
                  >
                    FAQ Benefícios
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      window.open("https://www.pellizzetti.adv.br/blog/faq-tutoriais", "_self");
                      handleMenuClose();
                    }}
                  >
                    FAQ Tutoriais
                  </MenuItem>
                </Menu>
              </div>

              {/* Tools Menu */}
              <div>
                <StyledButton
                  onClick={handleToolsMenuOpen}
                  endIcon={<span style={{ fontSize: '0.75rem' }}>▼</span>}
                >
                  Ferramentas
                </StyledButton>
                <Menu
                  anchorEl={toolsAnchorEl}
                  open={Boolean(toolsAnchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                  sx={{ mt: 1 }}
                >
                  <MenuItem onClick={() => {
                    handleRedirect("calculadora-pgbl-vgbl");
                    handleMenuClose();
                  }}>
                    Calculadora PGBL vs VGBL
                  </MenuItem>
                </Menu>
              </div>

              <StyledButton onClick={() => window.open("https://www.pellizzetti.adv.br/#especialistas", "_self")}>
                Especialistas
              </StyledButton>

              <StyledButton onClick={() => window.open("https://www.pellizzetti.adv.br/blog", "_self")}>
                Blog
              </StyledButton>

              <StyledButton onClick={() => window.open("https://www.pellizzetti.adv.br/#quem_somos", "_self")}>
                Quem Somos
              </StyledButton>

              <StyledButton onClick={() => window.open("https://www.pellizzetti.adv.br/ebook", "_self")}>
                E-book
              </StyledButton>

              <YoutubeButton
                component="a"
                href="https://www.youtube.com/@brunopellizzetti"
                target="_blank"
                rel="noreferrer"
              >
                Youtube
              </YoutubeButton>

              <ContactButton
                component="a" // Isso transforma o botão em um link
                href="https://api.whatsapp.com/send?phone=5545991313858&text=Ol%C3%A1%2C%20visitei%20seu%20site%20e%20gostaria%20de%20obter%20mais%20informa%C3%A7%C3%B5es%20sobre%20minha%20aposentadoria."
                target="_blank"
                rel="noreferrer nofollow"
              >
                Contato
              </ContactButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
  );
};

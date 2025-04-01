"use client";

import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Typography, Button, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { montaguSlab } from "@/app/GoogleFonts";

const BlogHeader = () => {
  const router = useRouter();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleRedirect = (url) => {
    router.push(`/${url}`);
    setIsNavOpen(false);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#E9EDE5" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-evenly", gap: 5, padding:"20px" }}>
        <Link href="/" passHref>
          <Image
            width={120}
            height={70}
            src="/logoCompleta.svg"
            alt="Advogado Previdenciário Benefício INSS"
            style={{ cursor: "pointer" }}
            priority
          />
        </Link>

        <IconButton
          edge="end"
          aria-label="menu"
          onClick={() => setIsNavOpen(true)}
          sx={{ display: { md: "none" }, color: "#012f0d" }}
        >
          <MenuIcon sx={{ color: "#012B09" }} />
        </IconButton>

        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
          <Button sx={{ color: "#012f0d", fontFamily:"montaguSlab", fontSize:"18px" }} onClick={() => handleRedirect("/blog")}>Blog</Button>
          <Button sx={{ color: "#012f0d", fontFamily:"montaguSlab", fontSize:"18px" }} onClick={() => handleRedirect("/#quem_somos")}>Quem Somos</Button>
          <Button sx={{ color: "#012f0d", fontFamily:"montaguSlab", fontSize:"18px" }} onClick={() => handleRedirect("calculadora-pgbl-vgbl")}>Calculadora PGBL vs VGBL</Button>
          <Button sx={{ color: "white", backgroundColor:"#DC2626", fontFamily:"montaguSlab", fontSize:"18px", padding:"16px 20px", borderRadius:"20px"}} component={Link} href="https://www.youtube.com/@brunopellizzetti" target="_blank">YouTube</Button>
          <Button sx={{ color: "white", backgroundColor:"#4C6751", fontFamily:"montaguSlab", fontSize:"18px", padding:"16px 20px", borderRadius:"20px" }} component={Link} href="https://api.whatsapp.com/send?phone=5545991313858&text=Ol%C3%A1" target="_blank">Contato</Button>
        </Box>
      </Toolbar>

      <Drawer anchor="right" open={isNavOpen} onClose={() => setIsNavOpen(false)}>
        <Box sx={{ width: 250, padding: 2 }}>
          <IconButton onClick={() => setIsNavOpen(false)} sx={{ alignSelf: "flex-end" }}>
            <CloseIcon />
          </IconButton>
          <List>
            <ListItem button onClick={() => handleRedirect("blog/faq-advogado")}> <ListItemText primary="FAQ Advogado" /> </ListItem>
            <ListItem button onClick={() => handleRedirect("blog/faq-beneficio")}> <ListItemText primary="FAQ Benefício" /> </ListItem>
            <ListItem button onClick={() => handleRedirect("blog/faq-tutoriais")}> <ListItemText primary="FAQ Tutoriais" /> </ListItem>
            <ListItem button onClick={() => handleRedirect("calculadora-pgbl-vgbl")}> <ListItemText primary="Calculadora PGBL vs VGBL" /> </ListItem>
            <ListItem button component={Link} href="https://www.youtube.com/@brunopellizzetti" target="_blank">
              <ListItemText primary="YouTube" />
            </ListItem>
            <ListItem button component={Link} href="https://api.whatsapp.com/send?phone=5545991313858&text=Ol%C3%A1" target="_blank">
              <ListItemText primary="Contato" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default BlogHeader;

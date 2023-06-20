import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Badge,
  Icon,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from "../../state";

import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";
import { CartMenu } from "../../components/CartMenu";
import Footer from "../../components/Footer";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Layout = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const theme = useTheme();

  const [isMobileToggle, setIsMobileToggle] = useState(false);
  const cart = useSelector((state) => state.cart.cart);
  return (
    <Box>
      <ScrollToTop />
      <CartMenu />
      <Box
        display='flex'
        width='100%'
        height='60px'
        position='fixed'
        top='0'
        left='0'
        zIndex='1'
        color='black'
        backgroundColor='rgba(255, 255, 255, 0.95)'
      >
        <Box
          width='80%'
          margin='auto'
          display='flex'
          justifyContent='space-between'
          alignItems='center'
        >
          <Box
            onClick={() => navigate("/")}
            sx={{
              cursor: "pointer",
              padding: "0.5rem 1rem",
              // "&:hover": {
              //   backgroundColor: shades.neutral[200],
              //   borderRadius: "2rem",
              // },
              fontSize: isMobile ? "0.85rem" : "1.5rem",
            }}
            color='#black'
            fontWeight='bold'
            fontStyle='italic'
            fontFamily='cursive'
          >
            E-Commerce App
          </Box>
          <Box>
            {!isMobile && (
              <>
                <IconButton sx={{ color: "black" }}>
                  <SearchOutlined />
                </IconButton>
                <IconButton sx={{ color: "black" }}>
                  <PersonOutline />
                </IconButton>
              </>
            )}

            <Badge
              badgeContent={cart.length}
              color='secondary'
              invisible={cart.length === 0}
              sx={{
                "& .MuiBadge-badge": {
                  right: 5,
                  top: 5,
                  padding: "0 4px",
                  height: "14px",
                  minWidth: "13px",
                },
              }}
            >
              <IconButton
                onClick={() => dispatch(setIsCartOpen({}))}
                sx={{ color: "black" }}
              >
                <ShoppingBagOutlined />
              </IconButton>
            </Badge>

            <IconButton sx={{ color: "black" }}>
              <MenuOutlined />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Outlet />
      <Footer />
    </Box>
  );
};

export default Layout;

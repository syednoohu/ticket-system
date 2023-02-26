import React from "react";
import {styled}  from "@mui/system";
import { useSendLogoutMutation } from "../Redux/features/authApiSlice";

import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined
} from "@mui/icons-material";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import profileImage from "../assets/profile.jpeg";
const navItems = [
  {
    text: "Dashboard",
    icon: <DashboardOutlinedIcon />,
  },
  {
    text: "Project",
    icon: <ShoppingCartOutlined />,
  }, 
  {
    text: "Company",
    icon: <BusinessOutlinedIcon />,
  }, 
  {
    text: "Shop",
    icon: <BusinessOutlinedIcon />,
  },
  {
    text: "Ticket",
    icon: <Groups2Outlined />,
  },
  {
    text: "Item Management",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "User",
    icon: <Groups2Outlined />,
  },
  {
    text: "Logout",
    icon: <ShoppingCartOutlined />,
  },

];

const FlexBetween  = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));


const Sidebar = ({ currentUser={}, drawerWidth, isSidebarOpen, setIsSidebarOpen, isNonMobile,}) => {
  const [sendLogout, {
    isLoading,
    isSuccess,
    isError,
    error
}] = useSendLogoutMutation()


  // console.log("currentUser : ",currentUser)
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 2rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h5" fontWeight="bold">
                    WINZ/HACSON
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return ( null
                    // <Typography key={text} sx={{ m: "2.25rem 0 1rem 2rem" }}>
                    //   {text}
                    // </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        if (lcText ==='logout') {
                          sendLogout()
                          navigate(`/login`);

                        }else {
                          navigate(`/${lcText}`);
                          setActive(lcText);
                        }
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth:"30px",
                          ml: "1rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
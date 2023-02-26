import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
// import { useGetUserQuery } from "../Redux/apiSlice";


const ClientLayout = () => {

  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // const userId = useSelector((state) => state.global.userId);
  // const { data } = useGetUserQuery(userId) || {} ;
  const currentUser = useSelector((state) => state.auth.currentUser);

  console.log(currentUser)
  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        currentUser={currentUser || {}}
        isNonMobile={isNonMobile}
        drawerWidth="200px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
          currentUser={currentUser || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default ClientLayout;



import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";


const Order = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      TICKET PAGE
    </Box>
  );
};

export default Order;
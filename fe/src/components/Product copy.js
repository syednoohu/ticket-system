import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";

const Product = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      hi hi this is from Product Page
    </Box>
  );
};

export default Product;
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const  OuterLayout = () => {
  return (
    <Box width="100%" height="100%" bgcolor={"background.secondary"} color={"text.primary"}>
      <div>OuterLayout</div>
      <Outlet />
    </Box>
  );
}

export default OuterLayout;

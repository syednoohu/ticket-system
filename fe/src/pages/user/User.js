import React, { useState } from "react";
import { Box, useMediaQuery, InputBase, IconButton} from "@mui/material";
import { styled } from "@mui/system"; 
import { CleaningServices, Search } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetAllUsersQuery } from "../../Redux/features/userApiSlice";
import UserActions from './UserActions';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

import Header from "../../components/Header";

const FlexBetween = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const User = () => {
  const navigate = useNavigate()
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState(""); //search: '新南苑雞煲火鍋'
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  let params = { page, pageSize, search};

  const { data, isLoading } = useGetAllUsersQuery(params, {refetchOnMountOrArgChange:true}) || {};
  console.log(data, isLoading)

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userFullName",
      headerName: "User Name",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      // type: 'actions',
      width: 150,
      renderCell: (params) => <UserActions {...{ params }} />,
    },
  ];
 
  return (
    <Box // <BoxWrapper/>
      bgcolor="aliceblue"
      height="100%"
      m="1rem 0.7rem" 
      // m="1rem 0.7rem" 
      // display={isNonMobile ? "flex" : "block"}
      >   
      <Header title="User" subtitle="" />

      {/* Search Bar #2 */}
      <Box
        bgcolor=""
        borderRadius="5px"
        display="flex"
        flexDirection="column"
        autoComplete="off"
        sx={{
          p: 1,
          width: "100%",
          // height: "20%",
          // border: "1px solid gray",
        }}
      >
        {/*  */}
        <FlexBetween>
          {/* Left */}
          <FlexBetween
            backgroundColor="#a9939329"
            borderRadius="9px"
            gap="3rem"
            // p="0.1rem 1.5rem"
          >
            <InputBase
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
            />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
          {/* Right */}
          <Fab 
            color="secondary" 
            variant="Extended" 
            aria-label="add" 
            size='large'      
            onClick={() => navigate('/UserNew')}
            // 
          >
            <AddIcon/> 
         </Fab>
          {/* // */}
        </FlexBetween>
        {/*  */}
      </Box>  
      {/* Grid #3 */}
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          }
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.users) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        />
      </Box>

      {/* //// */}
    </Box>
  );
};

export default User;
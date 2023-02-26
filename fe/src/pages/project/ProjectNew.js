//https://www.youtube.com/watch?v=3uEyy_f81r0
import React, { useEffect, useState } from "react";
import moment from "moment";

import { Alert, Snackbar, TextField, useMediaQuery } from "@mui/material";
import {  Box, Button, InputAdornment } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useCreateProjectMutation } from "../../Redux/features/projectApiSlice";
import { useGetAllCompanysNameWithCodeQuery, useGetAllShopsByCompanyQuery } from "../../Redux/features/companyApiSlice";

// import  CustomizedSnackbarsA  from '../../components/CustomizedSnackbars'
import Header from "../../components/Header";
import { useForm } from "react-hook-form";

import  {FormInputDate}  from "../../form-components/V1/FormInputDate";
import  FormInputText  from "../../form-components/V2/FormInputText";
import FormMultipleSelectWithChip from "../../form-components/V2/FormMultipleSelectWithChip"

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {  phoneRegExp } from "../../form-components/V2/utils";
import FormSelectCompany from "../../form-components/V2/FormSelectCompany";

const schema = yup.object({
  projectCode: yup.string().min(3,'must be at least 3 characters long').max(10,'must be at max. 10 characters long').required('Project Codeis required'),
  serviceFrom: yup.date().required(),
  serviceTo: yup.date().when("serviceFrom", (serviceFrom, schema) => serviceFrom && schema.min(serviceFrom))
});

const ProjectNew = () => {
  const [companyOptions, setCompanyOptions] = React.useState([]);   // company Code DL
  const [selectedCompany, setSelectedCompany] = React.useState(''); // set to currenty selected company in the dropdown list
  const [shopOptions, setShopOptions] = React.useState([]);         // shop Code DL

  const [location, setLocation] = React.useState([]);
  let [serialNos, setSerialNos] = React.useState('');

  let params = { selectedCompany };
  const { handleSubmit, reset, watch, formState: { errors }, control } = useForm({
    defaultValues: {
      companyCode: '',
      projectCode: 'PCODE',
      serviceFrom: moment(new Date()).format("YYYY-MM-DDTHH:mm:ss"),
      serviceTo: moment(new Date()).format("YYYY-MM-DDTHH:mm:ss"),
      // serialNos: '',
    },
    resolver: yupResolver(schema)
  });


  const changeHandler = e => {
    const {
      target: { value },
    } = e;
    setLocation(value)      // setLocationName(typeof value === 'string' ? value.split(',') : value,)
  };

  const changeHandlerA = e => {
    const {
      target: { value },
    } = e;
    setSerialNos(value)      // setLocationName(typeof value === 'string' ? value.split(',') : value,)
  };

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const { data : companyNameWithCode =[], 
    isLoading : isGetAllCompanysNameWithCodeLoading,
    isSuccess : isGetAllCompanysNameWithCodeSuccess
  } = useGetAllCompanysNameWithCodeQuery();
  
  useEffect(() => {
    setSelectedCompany(watch("companyCode"))

  }, [watch("companyCode")])

console.log("selectedCompany :",selectedCompany)
  const { data : allShopsByCompany =[],         // we can dispatch(addAllShops(allShopsByCompany))
    isFetching : isAllShopsByCompanyFetching,
    isLoading : isAllShopsByCompanyLoading,
    isSuccess : isAllShopsByCompanySuccess
  } = useGetAllShopsByCompanyQuery({selectedCompany}, {refetchOnMountOrArgChange:true}) ;


  console.log("allShopsByCompany :",allShopsByCompany)
  useEffect(() => {
    if (isGetAllCompanysNameWithCodeSuccess){
      setCompanyOptions(companyNameWithCode)
    }
  }, [isGetAllCompanysNameWithCodeSuccess, isGetAllCompanysNameWithCodeLoading])

  useEffect(() => {
    if (!isAllShopsByCompanyFetching){
      console.log(" isAllShopsByCompanySuccess - update setShopOptions([]) ")
      setShopOptions([])
      setShopOptions(allShopsByCompany || [])
    }
  }, [ isAllShopsByCompanyFetching])
  


  // useEffect(() => {
  //   if (!isAllShopsByCompanyLoading){
  //     console.log(" isAllShopsByCompanySuccess - update setShopOptions([]) ")
  //     setShopOptions([])
  //     setShopOptions(allShopsByCompany || [])
  //   }
  // }, [isAllShopsByCompanyLoading, isAllShopsByCompanyFetching])
    // }, [isAllShopsByCompanyLoading, isAllShopsByCompanySuccess,isAllShopsByCompanyFetching])
  // }, [isAllShopsByCompanyLoading, isAllShopsByCompanySuccess,selectedCompany,[watch("companyCode")]])

  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [createProject, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useCreateProjectMutation()

  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) {
      reset();
      setMessage('Record Added Successfully!! ')
      setOpen(true);
    }
    if (isError) {
      setOpen(true);
      setMessage('Error! Please Try Again!! ')
    }

  }, [isSuccess, isError, navigate])
  const onSubmit = async (data) => {
    data.location = location
    
    serialNos = serialNos.replace(/\n/g, " ");  //replace /n with ' '  01/01/2010 12/31/2010
    data.serviceFrom = moment(data.serviceFrom).format("YYYY-MM-DDTHH:mm:ss")
    data.serviceTo = moment(data.serviceTo).format("YYYY-MM-DDTHH:mm:ss")

    data.serialNos = serialNos
    // console.log(data)
    debugger
    try {
      const response = await createProject(data).unwrap()
      console.log(response)
    
    } catch(err) {
      setOpen(true);
      setMessage(err.data.message)
      console.error('Failed to save the Project : ', err)
    }
}




// console.log("selectedCompany : ",selectedCompany)

return (
    <Box  m="1rem 0.7rem"
      // display={isNonMobile ? "flex" : "block"} 
      // alignItems= 'center'

      // height="100%"
    >
      <Header title="New Project.. " subtitle="" />
      
      <Box noValidate component='form' onSubmit={handleSubmit(onSubmit)} 
        sx={{width: '50%', my: '2rem', mx:'auto', alignItems: 'center'}}>
        <FormSelectCompany errors={errors} control={control} name='companyCode' label='Company Code' companies ={companyOptions}/>
        <FormInputText errors={errors} control={control} name='projectCode'  label='Project Code' />
        <FormInputDate errors={errors} control={control} name='serviceFrom' required label='Project From' />
        <FormInputDate errors={errors} control={control} name='serviceTo' required label='Project To' />
        <FormMultipleSelectWithChip value={location} onChange={changeHandler}  name='Location' required label='Location' locationList ={shopOptions} />
        <TextField style={{textAlign: 'left'}} multiline label="Serial Numbers" onChange={changeHandlerA} rows={20} />  
        {/* { companyOptions.length !==0 && <FormSelectCompany errors={errors} control={control} name='companyCode' label='Company Code' companies ={companyOptions}/>} */}
        {/* <FormInputText errors={errors} control={control} name='projectName'  label='Project Name' sxProps ={{ width :"20%", height :"20%"}} /> */}
        {/* <FormMultipleSelectChip errors={errors} control={control} name='stores' required label='Stores' locationList ={storeNames} /> */}
        {/* <FormInputText errors={errors} control={control} name='phone' required label='Phone' inputProps={{
          startAdornment: <InputAdornment position="start">+852</InputAdornment>,
          type: 'number'
        }} /> */}
        {/* <FormSelect errors={errors} control={control} name='country' label='Country' /> */}

        <Button
          disabled={isLoading}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >Submit</Button>
      </Box>

       <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
        // action={action}
      />

      {/* {CustomizedSnackbars} */}
      {/* { isSuccess && <CustomizedSnackbars message ="Very SUCCESS"/>} */}
  
      {/* { isSuccess && <Snackbar open ={true} autoHideDuration={4000} >
          <Alert severity="success"> Company Added Successfully </Alert>
        </Snackbar>
      }
      { isError && <Snackbar open ={true} autoHideDuration={4000} >
          <Alert severity="error"> Error Occured </Alert>
        </Snackbar>
      } */}
      
      {/* {isError && <Snackbar  open ={true} autoHideDuration={4000} message ="Error occured"/>} */}
      {/* <CustomizedSnackbarsA isOpen={open} severity="success" />  */}
      {/* // {isError && <CustomizedSnackbars isOpen={true} severity="error"/> } */}
    </Box>
  );
};

export default ProjectNew;
//https://www.youtube.com/watch?v=3uEyy_f81r0
import React, { useEffect, useState } from "react";
import moment from "moment";

import { Alert, Snackbar, TextField, useMediaQuery } from "@mui/material";
import {  Box, Button, InputAdornment } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useCreateContractMutation } from "../../Redux/features/contractApiSliceNOUSE";
import { useGetAllCompanysNameWithCodeQuery } from "../../Redux/features/companyApiSlice";

// import  CustomizedSnackbarsA  from '../../components/CustomizedSnackbars'
import Header from "../../components/Header";
import { useForm } from "react-hook-form";

import  {FormInputDate}  from "../../form-components/V1/FormInputDate";
import  FormInputText  from "../../form-components/V2/FormInputText";
// import FormMultipleSelectChip from "../../form-components/V2/FormMultipleSelectChip"
import FormMultipleSelectWithChip from "../../form-components/V2/FormMultipleSelectWithChip"
import  FormSelect  from "../../form-components/V2/FormSelect";

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {  phoneRegExp } from "../../form-components/V2/utils";
import FormSelectCompany from "../../form-components/V2/FormSelectCompany";

const storeNames = [
  'Location-A',
  'Location-B',
  'Location-C',
  'Location-D',
  'Location-E',
  'Location-F',
  'Location-G',
  'Location-H',
];

const schema = yup.object({
  contractName: yup.string().required('Contract Name Name is required'),
  contractCode: yup.string().min(3,'must be at least 3 characters long').max(3,'must be at max. 3 characters long').required('Company Name Name is required'),
  contractFrom: yup.date().required(),
  contractTo: yup.date().when("contractFrom", (contractFrom, schema) =>
    contractFrom && schema.min(contractFrom))
});

const companyList  = ["Channel", "Hermes"];

const ContractNew = () => {
  // const [locationName, setLocationName] = React.useState([]);
  const [companyOptions, setCompanyOptions] = React.useState([]);

  const [location, setLocation] = React.useState([]);
  let [serialNos, setSerialNos] = React.useState('');
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
  const { data : companyNameWithCode , 
    isLoading : isLoadingOptoins,
    isSuccess : isSuccessOptions
    
  } = useGetAllCompanysNameWithCodeQuery();
  
  useEffect(() => {
    if (isSuccessOptions){
      setCompanyOptions(companyNameWithCode)
    }
  }, [isSuccessOptions, isLoadingOptoins])


  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [createContract, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useCreateContractMutation()

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
    data.contractFrom = moment(data.contractFrom).format("YYYY-MM-DDTHH:mm:ss")
    data.contractTo = moment(data.contractTo).format("YYYY-MM-DDTHH:mm:ss")

    data.serialNos = serialNos
    console.log(data)
    debugger
    try {
      const response = await createContract(data).unwrap()
      console.log(response)
    
    } catch(err) {
      setOpen(true);
      setMessage(err.data.message)
      console.error('Failed to save the Contract: ', err)
    }
}
const { handleSubmit, reset, formState: { errors }, control } = useForm({
  defaultValues: {
    contractName: 'Name of the Contract',
    contractCode: 'AAA',
    // contractFrom: new Date(),
    contractFrom: moment(new Date()).format("YYYY-MM-DDTHH:mm:ss"),

    contractTo: new Date(),
    // serialNos: '',
  },
  resolver: yupResolver(schema)
});


  return (
    <Box  m="1rem 0.7rem"
      // display={isNonMobile ? "flex" : "block"} 
      // alignItems= 'center'

      // height="100%"
    >
      <Header title="New Project.. " subtitle="" />
      
      <Box noValidate component='form' onSubmit={handleSubmit(onSubmit)} 
        sx={{width: '50%', my: '2rem', mx:'auto', alignItems: 'center'}}>

        { companyOptions.length !==0 && <FormSelectCompany errors={errors} control={control} name='companyCode' label='Company Code' companies ={companyOptions}/>}
        <FormInputText errors={errors} control={control} name='contractName'  label='Project Name' sxProps ={{ width :"20%", height :"20%"}} />
        <FormInputText errors={errors} control={control} name='contractCode'  label='Project Code' />
        <FormInputDate errors={errors} control={control} name='contractFrom' required label='Project From' />
        <FormInputDate errors={errors} control={control} name='contractTo' required label='Project To' />
        <FormMultipleSelectWithChip value={location} onChange={changeHandler}  name='Location' required label='Location' locationList ={storeNames} />
        <TextField style={{textAlign: 'left'}} multiline label="Serial Numbers" onChange={changeHandlerA} rows={20} />
        {/* <FormMultipleSelectChip errors={errors} control={control} name='stores' required label='Stores' locationList ={storeNames} /> */}
        {/* <FormInputText errors={errors} control={control} name='phone' required label='Phone' inputProps={{
          startAdornment: <InputAdornment position="start">+852</InputAdornment>,
          type: 'number'
        }} /> */}
        {/* <FormSelect errors={errors} control={control} name='country' label='Country' /> */}

        <Button
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

export default ContractNew;
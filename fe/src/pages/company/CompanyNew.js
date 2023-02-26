//https://www.youtube.com/watch?v=3uEyy_f81r0
import React, { useEffect, useState } from "react";
import { Alert, Snackbar, useMediaQuery } from "@mui/material";
import {  Box, Button, InputAdornment } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useCreateCompanyMutation } from "../../Redux/features/companyApiSlice";
// import  CustomizedSnackbarsA  from '../../components/CustomizedSnackbars'
import Header from "../../components/Header";
import { useForm } from "react-hook-form";

import  FormInputText  from "../../form-components/V2/FormInputText";
import  FormSelect  from "../../form-components/V2/FormSelect";

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {  phoneRegExp } from "../../form-components/V2/utils";

const schema = yup.object({
  companyName: yup.string().required('Company Name Name is required'),
  companyCode: yup.string().min(3,'must be at least 3 characters long').max(3,'must be at max. 3 characters long').required('Company Name Name is required'),
  phone: yup.string().required('Phone is required').matches(phoneRegExp, 'Phone number is not valid'),
  fax: yup.string().required('Fax is required').matches(phoneRegExp, 'Fax number is not valid'),
  contact: yup.string().required('Contact Person is required'),
  email: yup.string().required('Email is required').email(),
  address: yup.string().required('Full Address is required'),
  country: yup.string().required('Country is required'),
});

// const countryNames = ["HK", "Maccau"];
const countryList  = ["HK", "Maccau"];

const CompanyNew = () => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [createCompany, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useCreateCompanyMutation()

  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) {
      reset();
      // alert('Record Added ')
      setMessage('Record Added Successfully!! ')
      setOpen(true);
      // navigate('/company')
    }
    if (isError) {
      setOpen(true);
      // alert('Please try again ')
      setMessage('Error! Please Try Again!! ')

      // navigate('/company')
    }

  }, [isSuccess, isError, navigate])
  const onSubmit = async (data) => {
    console.log(data)
    try {
      const response = await createCompany(data)
      // const response = await createCompany(data).unwrap()
      console.log(response)
    
    } catch(err) {
      console.error('Failed to save the Company: ', err)
    }
  console.log(data);
}
const { handleSubmit, reset, formState: { errors }, control } = useForm({
  defaultValues: {
    companyCode: '',
    companyName: '',
    address: '',
    contact: '',
    website: '',
    email: '',
    fax: '',
    phone: '',
    country: '',
  },
  resolver: yupResolver(schema)
});


  return (
    <Box  m="1rem 0.7rem"
      display={isNonMobile ? "flex" : "block"} 
      // alignItems= 'center'

      // height="100%"
    >
      <Header title="New Company " subtitle="" />
      
      <Box noValidate component='form' onSubmit={handleSubmit(onSubmit)} 
        sx={{width: '50%', my: '2rem', mx:'auto', alignItems: 'center'}}>
        <FormInputText errors={errors} control={control} name='companyCode'  label='Company Code' sxProps ={{ width :"20%", height :"20%"}} />
        <FormInputText errors={errors} control={control} name='companyName'  label='Company Full Name' />
        <FormInputText errors={errors} control={control} name='address' required label='Address' />
        <FormInputText errors={errors} control={control} name='contact' required label='Contact Person' />
        <FormInputText errors={errors} control={control} name='website' label='Website' />
        <FormInputText errors={errors} control={control} name='email' label='Email' />
        <FormInputText errors={errors} control={control} name='phone' label='Phone' />
        <FormInputText errors={errors} control={control} name='fax' label='Fax' />
        {/* <FormInputText errors={errors} control={control} name='phone' required label='Phone' inputProps={{
          startAdornment: <InputAdornment position="start">+852</InputAdornment>,
          type: 'number'
        }} /> */}
        <FormSelect errors={errors} control={control} name='country' label='Country' optionsList ={countryList} />

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

export default CompanyNew;
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import { Box, Button, InputAdornment,Snackbar } from "@mui/material"
import { useForm } from "react-hook-form";

import  FormInputText  from "../../form-components/V2/FormInputText";
import  FormSelect  from "../../form-components/V2/FormSelect";
import  FormSelectCompany  from "../../form-components/V2/FormSelectCompany";

import Header from "../../components/Header";
import { useCreateShopMutation } from "../../Redux/features/shopApiSlice";


import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {  phoneRegExp } from "../../form-components/V2/utils";
import { useGetAllCompanysNameWithCodeQuery } from "../../Redux/features/companyApiSlice";

const schema = yup.object({
  shopCode: yup.string().min(3,'must be at least 3 characters long').max(10,'must be at max. 3 characters long').required('Shop Code is required'),
  shopName: yup.string().required('Shop Name is required'),
  companyCode: yup.string().required('Company is required'), //.min(3,'must be at least 3 characters long').max(3,'must be at max. 3 characters long').required('Company Code is required'),
  contact: yup.string().required('Contact Person is required'),
  phone: yup.string().required('Phone is required').matches(phoneRegExp, 'Phone number is not valid'),
  fax: yup.string().required('fax is required').matches(phoneRegExp, 'fax number is not valid'),
  email: yup.string().required('Email is required').email(),
  address: yup.string().required('Full Address is required'),
  country: yup.string().required('Country is required'),
});


  // const companies = [
  //   {
  //     companyCode: "CHN",
  //     companyName: "Channel",
  //   },
  //   {
  //     companyCode: 'HER',
  //     companyName: "HERMES",
  //   },
  //   {
  //     companyCode: 'GUC',
  //     companyName: "GUCCI",
  //   }
  // ]
  const countryList  = ["HK", "Maccau"];
const ShopNew = () => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [companyOptions, setCompanyOptions] = React.useState([]);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [createShop, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useCreateShopMutation()

  const { data : companyNameWithCode , 
    isLoading : isLoadingOptoins,
    isSuccess : isSuccessOptions
    
  } = useGetAllCompanysNameWithCodeQuery();
  console.log(companyOptions)
  console.log(companyOptions.length)
  console.log(isSuccessOptions)
  console.log(companyNameWithCode)

  useEffect(() => {
    if (isSuccessOptions){
      setCompanyOptions(companyNameWithCode)
    }
  }, [isSuccessOptions, isLoadingOptoins])

  console.log(companyOptions)
  console.log(companyOptions.length)
  console.log(isSuccessOptions)
  console.log(companyNameWithCode)

  useEffect(() => {
    if (isSuccess) {
    reset();
    // alert('Record Added ')
    setMessage('Record Added Successfully!! ')
    setOpen(true);
    // navigate('/company')
    }
    if (isError) {
      console.log(isSuccess,isError,isLoading)
      setOpen(true);
      // alert('Please try again ')
      setMessage('Error! Please Try Again!!.... ')
      // setMessage(error)
      console.log(error)

      // navigate('/company')
    }
  }, [isSuccess, isError])

  const { handleSubmit, reset, formState: { errors }, control } = useForm({
    defaultValues: {
      shopCode: '',
      shopName: '',
      companyCode :'',
      contact:'' ,
      phone:'' ,
      fax: '',
      email: '',
      address: '',
      country: ''
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    console.log(data)
    try {
      // const response = await createShop(data)
      const response = await createShop(data).unwrap()
      console.log(response)
    
    } catch(err) {
      console.error('Failed to save the Shop: ', err)
    }
  }

  return (
    <Box  m="1rem 0.7rem"
      display={isNonMobile ? "flex" : "block"} 
      // alignItems= 'center'

      // height="100%"
    >
      <Header title="New Shop " subtitle="" />
      <Box noValidate component='form' onSubmit={handleSubmit(onSubmit)} 
        sx={{width: '50%', my: '2rem', mx:'auto', alignItems: 'center'}}>

        { companyOptions.length !==0 && <FormSelectCompany errors={errors} control={control} name='companyCode' label='Company Code' companies ={companyOptions}/>}
        <FormInputText errors={errors} control={control} name='shopCode'  label='Shop Code' sxProps ={{ width :"20%", height :"20%"}} />
        <FormInputText errors={errors} control={control} name='shopName' label='Shop Full Name' />
        {/* <FormInputText errors={errors} control={control} name='companyCode'  label='Company Code' sxProps ={{ width :"20%", height :"20%"}} /> */}
        <FormInputText errors={errors} control={control} name='contact' label='Contact Person' />
        <FormInputText errors={errors} control={control} name='phone' label='Phone' />
        <FormInputText errors={errors} control={control} name='fax' label='Fax' />
        <FormInputText errors={errors} control={control} name='email' label='Email' />
        <FormInputText errors={errors} control={control} name='address' label='Address' />
        <FormSelect    errors={errors} control={control} name='country' label='Country'  optionsList ={countryList} />


        {/* <FormInputText errors={errors} control={control} name='phone' label='Phone' inputProps={{
          startAdornment: <InputAdornment position="start">+852</InputAdornment>,
          type: 'number'
        }} /> */}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >Submit</Button>
       
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          message={message}
          // action={action}
      />

      </Box>
    </Box>
  );
};

export default ShopNew;
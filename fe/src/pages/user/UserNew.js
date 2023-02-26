//https://www.youtube.com/watch?v=3uEyy_f81r0
import React, { useEffect, useState } from "react";
import { Alert, Snackbar, useMediaQuery } from "@mui/material";
import {  Box, Button, InputAdornment } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useCreateUserMutation } from "../../Redux/features/userApiSlice";
// import  CustomizedSnackbarsA  from '../../components/CustomizedSnackbars'
import Header from "../../components/Header";
import { useForm } from "react-hook-form";

import  FormInputText  from "../../form-components/V2/FormInputText";
import  FormSelect  from "../../form-components/V2/FormSelect";

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {  phoneRegExp } from "../../form-components/V2/utils";

const schema = yup.object({
  loginName: yup.string().required('Login Name is required'),
  password: yup.string().required('Password is required'),
  userFullName: yup.string().required('User Full Name is required'),
  phone: yup.string().required('Phone is required').matches(phoneRegExp, 'Phone number is not valid'),
  email: yup.string().required('email is required'),
  role: yup.string().required('Role is required'),
});

const RoleList  = ["Admin", "Service Engineer", "Engineer"];

const UserNew = () => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [createUser, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useCreateUserMutation()

  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) {
      reset();
      // alert('Record Added ')
      setMessage('Record Added Successfully!! ')
      setOpen(true);
      // navigate('/user')
    }
    if (isError) {
      setOpen(true);
      // alert('Please try again ')
      setMessage('Error! Please Try Again!! ')

      // navigate('/user')
    }

  }, [isSuccess, isError, navigate])
  const onSubmit = async (data) => {
    console.log(data)
    try {
      const response = await createUser(data)
      // const response = await createCompany(data).unwrap()
      console.log(response)
    
    } catch(err) {
      console.error('Failed to save the User: ', err)
    }
  console.log(data);
}
const { handleSubmit, reset, formState: { errors }, control } = useForm({
  defaultValues: {
    loginName: '',
    password: '',
    userFullName: '',
    phone: '',
    email: '',
    role: 'Engineer',
  },
  resolver: yupResolver(schema)
});


  return (
    <Box  m="1rem 0.7rem"
      display={isNonMobile ? "flex" : "block"} 
      // alignItems= 'center'

      // height="100%"
    >
      <Header title="New User " subtitle="" />
      
      <Box noValidate component='form' onSubmit={handleSubmit(onSubmit)} 
        sx={{width: '50%', my: '2rem', mx:'auto', alignItems: 'center'}}>
        <FormInputText errors={errors} control={control} name='loginName'  label='Login Name' sxProps ={{ width :"20%", height :"20%"}} />
        <FormInputText errors={errors} control={control} name='password'  label='Password' />
        <FormInputText errors={errors} control={control} name='userFullName' required label='Full Name' />
        <FormInputText errors={errors} control={control} name='phone' label='Phone' />
        <FormInputText errors={errors} control={control} name='email' label='Email' />
        <FormSelect errors={errors} control={control} name='role' label='Role' optionsList ={RoleList} />

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

    </Box>
  );
};

export default UserNew;
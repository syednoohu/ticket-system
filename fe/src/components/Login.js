//https://github.com/wpcodevo/Blog_MUI_React-hook-form
import React from "react";
import { useNavigate } from "react-router-dom";

import { useRef, useEffect } from "react";
import { Container, Box, Typography, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import bgImage from "../assets/bgImage.jpg";
import { FormInputText } from "../form-components/V1/FormInputText";
import LoadingButton from "@mui/lab/LoadingButton";
import MetaData from "../hooks/MetaData";
import { useLoginMutation } from "../Redux/features/authApiSlice";
import { setUser } from "../Redux/features/authSlice";
import { useDispatch } from "react-redux";

const defaultValues = {
  loginName: "syed",
  password: "syed",
};

const Login = () => {
  const methods = useForm({ defaultValues });
  const userRef = useRef();
  const { handleSubmit, control, reset, setValue, watch } = methods;

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (data.loginName === "" || data.password === "") {
      alert("Please enter username and password");
      return;
    }

    try {
      const userData = await login(data).unwrap();
      dispatch(setUser({ ...userData }));
      reset();
      navigate("/company");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* <MetaData title={"Login Page"} /> */}
      <Container
        maxWidth={false}
        sx={{ height: "100vh", backgroundImage: `url(${bgImage})` }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%", height: "100%" }}
        >
          <Box
            bgcolor="aliceblue"
            borderRadius="5px"
            display="flex"
            flexDirection="column"
            component="form"
            autoComplete="off"
            sx={{
              mt: 15,
              p: 1,
              width: "50%",
              height: "40%",
              border: "1px solid gray",
              opacity: 0.5,
            }}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Typography
              variant="h6"
              component="h1"
              sx={{
                textAlign: "center",
                mb: "1.5rem",
                color: "#204764",
                fontWeight: "bold",
                fontSize: "1.5rem",
              }}
            >
              Log into your account
            </Typography>

            <FormInputText
              control={control}
              label="User Account"
              type="text"
              name="loginName"
              focused
              required
              ref={userRef}
            />
            <FormInputText
              control={control}
              label="You Password"
              type="password"
              name="password"
              focused
              required
            />

            {/* <FormInputText  name="loginName" control={control} label="User Account" myCol = 'red'/>
            <FormInputText name="password" control={control} label="Password" myCol = 'red'/> */}

            <LoadingButton
              loading={isLoading}
              loadingIndicator="Please wait...."
              type="submit"
              variant="contained"
              sx={{
                pt: "0.8rem",
                mt: "0.8rem",
                width: "100%",
                marginInline: "auto",
                color: "white",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              Login
            </LoadingButton>
          </Box>
        </Grid>
      </Container>
    </>
  );
};

export default Login;

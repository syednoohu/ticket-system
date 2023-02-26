import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from '@mui/material'
import { styled } from "@mui/material/styles";

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'black',
    fontWeight: 400,
    fontSize:"1.2rem"
  },
  '& .MuiInputBase-input': {
    borderColor: '#c8d0d4',
    color: 'black',
    fontWeight: 400,
    fontSize:"1rem"
  },
  '& .MuiInput-underline:after': {
    border: 'none',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-error': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#d32f2f',
      },
    },
    '& fieldset': {
      borderColor: '#c8d0d4',
      borderRadius: "10px",
    },
    '&:hover fieldset': {
      border: '1px solid #c8d0d4',
    },
    '&.Mui-focused fieldset': {
      border: '1px solid #c8d0d4',
    },
  },
});
//.css-p51h6s-MuiInputBase-input-MuiOutlinedInput-input
export const FormInputText = React.forwardRef(( props, ref ) => {
  const {name, control, ...otherProps} = props 
  return (
    <Controller
    control={control}
    name={name}
    defaultValue=''
      render={({ field }) => (
        <CssTextField
          {...field}
          {...otherProps}
          variant='outlined'
          sx={{ mb: '1.5rem' }}
          inputRef={ref}
          // autoComplete="off"
          // error={!!errors[name]}
          // helperText={
          //   errors[name] ? (errors[name]?.message as unknown as string) : ''
          // }
        />
      )}
      // render={({
      //   field: { onChange, value },
      //   fieldState: { error },
      //   formState,
        
      // }) => (
      //   <CssTextField
      //   {...other}
      //   sx={{ width: '100%', p:1 }}
      //     helperText={error ? error.message : null}
      //     error={!!error}
      //     onChange={onChange}
      //     value={value}
      //     fullWidth
      //     label={label}
      //     variant="outlined"
          
      //     InputLabelProps={{
      //       sx: { fontSize:"1rem", 
      //       // color: "black", 
      //       "&.Mui-focused": { 
      //         // color: "black",
      //       } },
      //     }}
      //   />
      // )}
    />
  );
});

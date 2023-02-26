//https://codesandbox.io/s/8rod3?file=/src/App.js
import React from "react";
import { TextField } from "@mui/material";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";

import moment from "moment";
import { Controller } from "react-hook-form";

const DATE_FORMAT = "dd-mm-yyyy";
let val = moment().subtract(10, "days").format("DD/DD/YYYY");
export const FormInputDate = ({ name, control, label}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Controller
              name={name}
              control={control}
              // defaultValue={null}
              render={({
                field: { onChange, value },
                fieldState: { error, invalid }
              }) => (
                <DatePicker
                  label={label}
                  disableFuture
                  value={value}
                  onChange={onChange}
                  // onChange={(value) =>{
                  //   console.log("value :",value)  
                  //   onChange(moment(value).format("YYYY-MM-DD"))
                  //   }
                  // }
                  renderInput={(params) => (
                    console.log("params", params),
                    (
                      <TextField
                      helperText={invalid ? error.message : null}
                      variant="standard"
                      margin="dense"
                      fullWidth
                      color="primary"
                      {...params}
                      error={invalid}
                      />
                    )
                  )}
                />
              )}
            />
    </LocalizationProvider>
  );
};

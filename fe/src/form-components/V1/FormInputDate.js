//https://codesandbox.io/s/8rod3?file=/src/App.js
import { Box, Button, TextField, Container } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import moment from "moment";
import { Controller } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";


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
            // disableFuture
            value={value}
            onChange={(value) =>
              onChange(moment(value).format("YYYY-MM-DD"))
            }
            renderInput={(params) => (
              // console.log(invalid),
              (
                <TextField
                  error={invalid}
                  helperText={invalid ? error.message : null}
                  variant="standard"
                  margin="dense"
                  fullWidth
                  color="primary"
                  autoComplete="bday"
                  {...params}
                />
              )
            )}
          />
        )}
      />
    </LocalizationProvider>

  );
}

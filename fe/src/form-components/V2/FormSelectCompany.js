import { FormControl, MenuItem, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { Controller } from "react-hook-form"
import { addErrorIntoField } from "./utils";
import ErrorMessage from "./ErrorMessage";

const FormSelectCompany = ({ label, name, control, errors, companies}) => {
  // console.log("companies :",companies)

 return (
    <FormControl fullWidth sx={{ mb: '1rem' }}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField {...addErrorIntoField(errors[name])} {...field} required select label={label} variant="filled">
            <MenuItem value=''><em>None</em></MenuItem>
            {companies.map(company => (
              <MenuItem key={company.companyCode} value={company.companyCode}>{company.companyName}</MenuItem>
            ))}
          </TextField>
        )}
      />
      {errors[name] ? <ErrorMessage message={errors[name].message} /> : null}

    </FormControl>
  )
}

export default FormSelectCompany
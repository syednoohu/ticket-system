import { FormControl, MenuItem, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { Controller } from "react-hook-form"
import { addErrorIntoField } from "./utils";
import ErrorMessage from "./ErrorMessage";

const SelectFields = ({ label, name, control, errors, optionsList }) => {
 return (
    <FormControl fullWidth sx={{ mb: '1rem' }}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField {...addErrorIntoField(errors[name])} {...field} required select label={label} variant="filled">
            <MenuItem value=''><em>None</em></MenuItem>
            {optionsList.map(opt => (
              <MenuItem key={opt} value={opt}>{opt}</MenuItem>
            ))}
          </TextField>
        )}
      />
      {errors[name] ? <ErrorMessage message={errors[name].message} /> : null}

    </FormControl>
  )
}

export default SelectFields
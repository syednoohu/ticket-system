import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Controller } from "react-hook-form"
import { Typography } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({ label, inputProps, control, name, errors,locationList }) {
//  console.log(label, inputProps, control, name, errors)
 console.log("control : ",control)
const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    // console.log(event.target.value)
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
      );
    };
    console.log("personName : ",personName)


  return (
    <div>
      <FormControl fullWidth sx={{ m: 1, width: 300 }}>
        <Typography variant={"span"} >
          Locations
        </Typography>
        <Controller
          name={name}
          control={control}
          defaultValue={personName?? []}
          render={({ field : { onChange, value, ...rest} }) => (
            <Select 
            {...rest}
            // name={name}
            // control={control}
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={personName}
            onChange={handleChange}
            // onChange={field.onChange}
            // input={<OutlinedInput id="select-multiple-chip" label={label} />}
            renderValue={(selected) => {
              console.log(selected)
              // defaultValue={selected}
              value={selected}
              return <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                { selected.map((value) => {
                  console.log(value)
                  return <Chip key={value} label={value} />
                  }
                  )
                }
              </Box>
            }}
            MenuProps={MenuProps}
          >
            {locationList.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, personName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
      
          )}
        />
      </FormControl>
    </div>
  );
}
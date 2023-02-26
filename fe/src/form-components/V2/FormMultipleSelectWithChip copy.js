import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { FormHelperText, Typography } from '@mui/material';

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


function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightLight
        : theme.typography.fontWeightBold,
  };
}

export default function FormMultipleSelectWithChip({ label, value, onChange,  name, locationList }) {
  console.log("locationList:",locationList)
  
  const theme = useTheme();
  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        {/* <Typography variant="h6" color="inherit" style={{ }}>
          Location Names
        </Typography> */}
        <InputLabel id="demo-multiple-chip-label">{label}</InputLabel>
        <Select
          // labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={value}
          onChange={onChange}
          input={<OutlinedInput id="select-multiple-chip" label={label} />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {locationList.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, value, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText id="component-helper-text">
          Choose all the Locations
        </FormHelperText>
      </FormControl>
    </div>
  );
}

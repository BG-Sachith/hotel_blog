import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React from 'react';

export default function DropDownDefault({
  label,
  selectedItem,
  items,
  handleChange,
}: any) {
  // console.log(items);
  return (
    <div className="w-100 grid">
      <FormControl sx={{ m: 1, minWidth: 120, display: 'grid' }} size="small">
        <InputLabel id="demo-simple-select-required-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          value={selectedItem}
          label={label}
          onChange={handleChange}
        >
          {/* <MenuItem value="">
          <em>None</em>
        </MenuItem> */}
          {items.map((i: any, x: number) => (
            <MenuItem value={i?.id} key={x}>
              {i?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

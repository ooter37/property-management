import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

const filter = createFilterOptions();

export default function FreeSoloCreateOption(props) {
  const {value,setValue, selections} = props
//   const handleChange = (event) => {
//     setValue(event.target.value);
// };
  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (newValue && newValue.inputValue) {return setValue(newValue.inputValue)}
        setValue(newValue)}}
      
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        if (params.inputValue !== '') {
          filtered.push({
            inputValue: params.inputValue,
            title: `Add "${params.inputValue}"`,
          });
        }
        return filtered;
      }}

      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      // id="free-solo-with-text-demo"
      options={selections}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option;
      }}
      //VICTORY
      renderOption={(option) => {
        if (!option.title) {
          return option
        } else {return option.title}
      }}
      // renderOption={(option) => option.title}
      style={{ width: 300 }}
      freeSolo
      
      renderInput={params => ( 
        <TextField required {...params} label="Task Name" 
          // onChange={handleChange} 
        /> 
      )} 
    />
  );
}
import React from 'react';
import './SelectInput.scss'
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
// import { makeStyles } from '@material-ui/core/styles';
// import { grayColor } from "../UI/material-dashboard-react";

// const styles = {
//   root: {
//       padding: "13px",
//       "&:": {
//         backgroundColor: "unset"
//       }
//     },
//   //   labelRoot: {
//   //     marginLeft: "-14px"
//   //   },
    
//   marginTop: {
//     // marginTop: "16px"
//   },
//   labelRoot: {
//     //   ...defaultFont,
//       color: grayColor[3] + " !important",
//       fontWeight: "400",
//       fontSize: "14px",
//       lineHeight: "1.42857",
//       letterSpacing: "unset"
//     }
// };

const filter = createFilterOptions();

// const useStyles = makeStyles(styles);

export default function FreeSoloCreateOption(props) {
  const {value,setValue} = props
  // const classes = useStyles();

//   const handleChange = (event) => {
//     setValue(event.target.value);
// };
  return (
    <Autocomplete
  //   classes={{
  //     root: classes.marginTop,
  //     disabled: classes.disabled,
  //     underline: classes.underline
  // }}
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
      options={props.selections}
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

        
        <TextField className='select-textfield' required {...params} label={props.label} 

          // onChange={handleChange} 
        /> 
      )} 
    />
  );
}
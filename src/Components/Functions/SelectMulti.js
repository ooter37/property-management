import './Functions.scss'
import React, {useEffect} from 'react'
import { FormControl, TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
// import {primaryColor,grayColor,defaultFont} from "../UI/material-dashboard-react";


// const theme = createMuiTheme({

//     overrides: {
//       MuiInput: {
//         underline: {
//             "&:hover:not($disabled):before,&:before": {
//               borderColor: grayColor[4] + " !important",
//               borderWidth: "1px !important"
//             },
//             "&:after": {
//               borderColor: primaryColor[0] + '!important'
//             }
//           },
//           labelRoot: {
//             ...defaultFont,
//             color: grayColor[3] + " !important",
//             fontWeight: "400",
//             fontSize: "14px",
//             lineHeight: "1.42857",
//             letterSpacing: "unset"
//           },
//       }
//     }
// })

const styles = {
    formControl: {
        paddingBottom: "10px",
        margin: "27px 0 0 0",
        position: "relative",
        verticalAlign: "unset"
    },
    // grid: {
    //     padding: "0 15px !important"
    //   },
    // cardCategoryWhite: {
    //   color: "rgba(255,255,255,.62)",
    //   margin: "0",
    //   fontSize: "14px",
    //   marginTop: "0",
    //   marginBottom: "0"
    // },
    // cardTitleWhite: {
    //   color: "#FFFFFF",
    //   marginTop: "0px",
    //   minHeight: "auto",
    //   fontWeight: "300",
    //   fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    //   marginBottom: "3px",
    //   textDecoration: "none"
    // }
  };

  const useStyles = makeStyles(styles);

export default function SelectMulti(props) {
    const classes = useStyles();

    const filter = createFilterOptions();

    const {value, setValue, setServices, selections} = props

    useEffect(() => {
        let filteredServices = []
        value.forEach((elem) => {
            if (typeof elem === 'string') {
                filteredServices.push(elem)
            } else {
                filteredServices.push(elem.inputValue)
            }
        })
        setServices(filteredServices)
    },[value,setServices])

    return (
        <FormControl fullWidth className={classes.formControl}>
            {/* <MuiThemeProvider theme={theme}> */}
                <Autocomplete
                    id='service'
                    value={value}
                    onChange={(event, newValue) => {
                        if (newValue && newValue.inputValue) {
                            return setValue(newValue.inputValue)
                        } setValue(newValue)}}
                    filterOptions={(options, params) => {
                        const filtered = filter(options, params);
                        if (params.inputValue !== '') {
                            filtered.push({
                            inputValue: params.inputValue,
                            title: `Add "${params.inputValue}"`,
                        });}
                        return filtered;}}
                    multiple
                    options={selections}
                    getOptionLabel={(option) => {
                        if (typeof option === 'string') {
                            return option
                        }
                        if (option.inputValue) {
                            return option.inputValue
                        }
                        return option
                    }}
                    renderOption={(option) => {
                        if (!option.title) {
                        return option
                        } else {return option.title}
                    }}
                    freeSolo
                    renderInput={(params) => (
                    <TextField {...params} variant="standard" label="Services Provided"/>)}
                />
            {/* </MuiThemeProvider> */}
        </FormControl>
    )
}
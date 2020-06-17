import './Functions.scss'
import React from 'react'
import {  makeStyles } from '@material-ui/core/styles';
import { FormControl, Select, InputLabel, MenuItem } from "@material-ui/core";

const styles = {
    formControl: {
        paddingBottom: "10px",
        margin: "27px 0 0 0",
        position: "relative",
        verticalAlign: "unset"
    },
    grid: {
        padding: "0 15px !important"
      },
    cardCategoryWhite: {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none"
    }
  };
  const useStyles = makeStyles(styles);


export default function StateInput(props) {
    const classes = useStyles();

    return (
        <FormControl
        className={classes.formControl}
        fullWidth
        >
            <InputLabel
            classes={{root: classes.labelRoot}}
            > State
            </InputLabel>
            <Select
            // required
            value={props.state}
            onChange={(e) => props.setState(e.target.value)}
            classes={{
                root: classes.marginTop,
                disabled: classes.disabled,
                underline: classes.underline
            }}
            >
                <MenuItem value="AL">Alabama</MenuItem>
                <MenuItem value="AK">Alaska</MenuItem>
                <MenuItem value="AZ">Arizona</MenuItem>
                <MenuItem value="AR">Arkansas</MenuItem>
                <MenuItem value="CA">California</MenuItem>
                <MenuItem value="CO">Colorado</MenuItem>
                <MenuItem value="CT">Connecticut</MenuItem>
                <MenuItem value="DE">Delaware</MenuItem>
                <MenuItem value="DC">District Of Columbia</MenuItem>
                <MenuItem value="FL">Florida</MenuItem>
                <MenuItem value="GA">Georgia</MenuItem>
                <MenuItem value="HI">Hawaii</MenuItem>
                <MenuItem value="ID">Idaho</MenuItem>
                <MenuItem value="IL">Illinois</MenuItem>
                <MenuItem value="IN">Indiana</MenuItem>
                <MenuItem value="IA">Iowa</MenuItem>
                <MenuItem value="KS">Kansas</MenuItem>
                <MenuItem value="KY">Kentucky</MenuItem>
                <MenuItem value="LA">Louisiana</MenuItem>
                <MenuItem value="ME">Maine</MenuItem>
                <MenuItem value="MD">Maryland</MenuItem>
                <MenuItem value="MA">Massachusetts</MenuItem>
                <MenuItem value="MI">Michigan</MenuItem>
                <MenuItem value="MN">Minnesota</MenuItem>
                <MenuItem value="MS">Mississippi</MenuItem>
                <MenuItem value="MO">Missouri</MenuItem>
                <MenuItem value="MT">Montana</MenuItem>
                <MenuItem value="NE">Nebraska</MenuItem>
                <MenuItem value="NV">Nevada</MenuItem>
                <MenuItem value="NH">New Hampshire</MenuItem>
                <MenuItem value="NJ">New Jersey</MenuItem>
                <MenuItem value="NM">New Mexico</MenuItem>
                <MenuItem value="NY">New York</MenuItem>
                <MenuItem value="NC">North Carolina</MenuItem>
                <MenuItem value="ND">North Dakota</MenuItem>
                <MenuItem value="OH">Ohio</MenuItem>
                <MenuItem value="OK">Oklahoma</MenuItem>
                <MenuItem value="OR">Oregon</MenuItem>
                <MenuItem value="PA">Pennsylvania</MenuItem>
                <MenuItem value="RI">Rhode Island</MenuItem>
                <MenuItem value="SC">South Carolina</MenuItem>
                <MenuItem value="SD">South Dakota</MenuItem>
                <MenuItem value="TN">Tennessee</MenuItem>
                <MenuItem value="TX">Texas</MenuItem>
                <MenuItem value="UT">Utah</MenuItem>
                <MenuItem value="VT">Vermont</MenuItem>
                <MenuItem value="VA">Virginia</MenuItem>
                <MenuItem value="WA">Washington</MenuItem>
                <MenuItem value="WV">West Virginia</MenuItem>
                <MenuItem value="WI">Wisconsin</MenuItem>
                <MenuItem value="WY">Wyoming</MenuItem>
                <MenuItem value="AS">American Samoa</MenuItem>
                <MenuItem value="GU">Guam</MenuItem>
                <MenuItem value="MP">Northern Mariana Islands</MenuItem>
                <MenuItem value="PR">Puerto Rico</MenuItem>
                <MenuItem value="UM">United States Minor Outlying Islands</MenuItem>
                <MenuItem value="VI">Virgin Islands</MenuItem>
            </Select>
        </FormControl>
    )
} 
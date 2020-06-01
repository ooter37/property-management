import './AddTransaction.scss'
import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {  Grid, makeStyles, MenuItem, FormControl, InputLabel, Select, FormHelperText, Button, Typography } from "@material-ui/core";
import Card from "../../UI/Card";
import CardHeader from "../../UI/CardHeader.js";
import CustomInput from "../../UI/CustomInput.js";

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {primaryColor,dangerColor,successColor,grayColor,defaultFont} from "../UI/material-dashboard-react";

const theme = createMuiTheme({
    overrides: {
      MuiInput: {
        underline: {
            "&:hover:not($disabled):before,&:before": {
              borderColor: grayColor[4] + " !important",
              borderWidth: "1px !important"
            },
            "&:after": {
              borderColor: primaryColor[0] + '!important'
            }
          },
      }
    }
})

const styles = {

      labelRoot: {
        ...defaultFont,
        color: grayColor[3] + " !important",
        fontWeight: "400",
        fontSize: "14px",
        lineHeight: "1.42857",
        letterSpacing: "unset"
      },
      labelRootError: {
        color: dangerColor[0]
      },
      labelRootSuccess: {
        color: successColor[0]
      },
    //   feedback: {
    //     position: "absolute",
    //     top: "18px",
    //     right: "0",
    //     zIndex: "2",
    //     display: "block",
    //     width: "24px",
    //     height: "24px",
    //     textAlign: "center",
    //     pointerEvents: "none"
    //   },
    //   marginTop: {
    //     // marginTop: "16px"
    //   },
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
    //   fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none"
    }
  };
  const useStyles = makeStyles(styles);

function AddTransaction(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [houseId, setHouseId] = useState('')
    const [error, setError] = useState(false)

    const mappedMenuItems = props.houses.houses && props.houses.houses.map((house) => {
        return (
        <MenuItem key={`mappedMenuItems${house.house_id}`} value={house.house_id}>{house.address}</MenuItem>
        )
    })

    const classes = useStyles();

    return (
        <div>
                <Grid container>
                <Grid item xs={12} sm={12} md={8} className={classes.grid}>
                    <Card>
                        <CardHeader color="primary" className='add-renter-header'>
                            <Typography variant='h5' className={classes.cardTitleWhite}>Transactions</Typography>
                            {/* <p className={classes.cardCategoryWhite}>Enter the renter's details.</p> */}
                        </CardHeader>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={5} className={classes.grid}>
                            <MuiThemeProvider theme={theme}>
                                    <FormControl
                                    className={classes.formControl}
                                    fullWidth
                                    required
                                    error={error}
                                    >
                                        <InputLabel
                                        classes={{root: classes.labelRoot}}
                                        > House
                                        </InputLabel>
                                        <Select
                                        // required
                                        value={houseId}
                                        onChange={(e) => {setError(false) 
                                            setHouseId(e.target.value)}}
                                        classes={{
                                            root: classes.marginTop,
                                            disabled: classes.disabled,
                                            underline: classes.underline
                                        }}
                                        >
                                            {mappedMenuItems}
                                        </Select>
                                        {error && <FormHelperText>This is required!</FormHelperText>}
                                    </FormControl>
                                </MuiThemeProvider>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} className={classes.grid}>
                                
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} className={classes.grid}>
                               
                            </Grid>
                        </Grid>
                        <Grid container className='house-submit-container'>
                            <Grid item xs={12} sm={12} md={6} className={classes.grid}>
                               
                            </Grid>
                            <Grid item>
                                {/* <Button onClick={() => handleClick()} type='submit' variant='contained' color="primary" className='add-renter-button'>Add</Button> */}
                            </Grid>
                        </Grid>
                 
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

// const mapDispatchToProps = {requestUserData}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(AddTransaction)
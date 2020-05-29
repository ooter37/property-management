import './UpdateRenter.scss'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getRenters, getHouses} from '../../../redux/reducers/houses'
import {pleaseSignIn, success} from '../../Functions/Sweetalerts'
import { makeStyles } from "@material-ui/core/styles";
import { Grid, MenuItem, FormControl, InputLabel, Select, FormHelperText, Button, Typography } from "@material-ui/core";
import CustomInput from "../../UI/CustomInput.js";
import Card from "../../UI/Card";
import CardHeader from "../../UI/CardHeader.js";
import {primaryColor,dangerColor,successColor,grayColor,defaultFont} from "../../UI/material-dashboard-react";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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
      feedback: {
        position: "absolute",
        top: "18px",
        right: "0",
        zIndex: "2",
        display: "block",
        width: "24px",
        height: "24px",
        textAlign: "center",
        pointerEvents: "none"
      },
      marginTop: {
        // marginTop: "16px"
      },
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

function UpdateRenter(props) {
    const [name, setName] = useState(props.selectedRenterFull.name);
    const [email, setEmail] = useState(props.selectedRenterFull.email);
    const [phone, setPhone] = useState(props.selectedRenterFull.phone);
    const [houseId, setHouseId] = useState(props.selectedRenterFull.houseId)
    const [error, setError] = useState(false)
    const classes = useStyles();

    const {data} = props.user
    const {getHouses} = props

    useEffect(() => {
        if (data) {
            getHouses()
        }
    },[data,getHouses])

    function handleClick() {
        setError(false)
        if (!houseId) {
            setError(true)
        }
    }

    async function UpdateRenter() {
        try {
            if (houseId)
            if (props.user.data) {
                const id = props.selectedRenterFull.renter_id
                await axios.put('/api/renters', {id,houseId,name,email,phone})
                props.getRenters()
                resetForm()
                success.fire({title: `${name} updated.`})
            } else {
                pleaseSignIn()
            }
        } catch (error) {
            console.log('Error updating renter.', error)
        }
    }

    function resetForm() {
        setName('')
        setEmail('')
        setPhone('')
        setHouseId('')
    }
    
    const mappedMenuItems = props.houses.houses && props.houses.houses.map((house) => {
        return (
        <MenuItem key={`mappedMenuItems${house.house_id}`} value={house.house_id}>{house.address}</MenuItem>
        )
    })

    return (
        <form onSubmit={UpdateRenter}>
            {/* <button onClick={()=> console.log(props)}>loglogg</button> */}
            <Grid container>
                <Grid item xs={12} sm={12} md={8} className={classes.grid}>
                    <Card>
                        <CardHeader color="primary" className='add-renter-header'>
                            <Typography variant='h5' className={classes.cardTitleWhite}>{props.selectedRenterFull ? `Updating ${props.selectedRenterFull.name}` : 'Something went wrong, please refresh the page.'}</Typography>
                            {/* <p className={classes.cardCategoryWhite}>Enter the renter's details.</p> */}
                        </CardHeader>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={5} className={classes.grid}>
                                <CustomInput
                                labelText="Name"
                                id="name"
                                formControlProps={{
                                    required: true,
                                    fullWidth: true
                                }}
                                inputProps={{
                                    // required: true,
                                    value: name,
                                    onChange: (e) => setName(e.target.value)
                                }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} className={classes.grid}>
                                <CustomInput
                                labelText="Phone Number"
                                id="phone"
                                formControlProps={{
                                    required: true,
                                    fullWidth: true
                                }}
                                inputProps={{
                                    value: phone,
                                    onChange: (e) => setPhone(e.target.value),
                                }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} className={classes.grid}>
                                <CustomInput
                                labelText="Email"
                                formControlProps={{
                                    required: true,
                                    fullWidth: true,
                                }}
                                inputProps={{
                                    value: email,
                                    onChange: (e) => setEmail(e.target.value),
                                    type: 'email',
                                    // required: 
                                }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container className='house-submit-container'>
                            <Grid item xs={12} sm={12} md={6} className={classes.grid}>
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
                            <Grid item className='cancel-submit-container' >
                                <Button onClick={()=> props.setDisplaying('default')} variant='outlined' color="secondary" className='cancel-update-button'>Cancel</Button>
                                <Button onClick={() => handleClick()} type='submit' variant='contained' color="primary" className='submit-update-button'>Update</Button>
                            </Grid>
                            {/* <Grid item>
                                <Button onClick={() => handleClick()} type='submit' variant='contained' color="primary" className='add-renter-button'>Update</Button>
                            </Grid> */}
                            
                        </Grid>
                 
                    </Card>
                </Grid>
            </Grid>
        </form>
    )
}

const mapDispatchToProps = {getRenters, getHouses}

const mapStateToProps = state => state

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRenter)

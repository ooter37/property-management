import './UpdateHouse.scss'
import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {getHouses} from '../../../redux/reducers/houses'
import {setSelectedHouseRedux} from '../../../redux/reducers/houses'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import { Grid, Button, FormControl, InputLabel, Select, MenuItem} from "@material-ui/core";
import {pleaseSignIn, success, confirmDelete} from '../../Functions/Sweetalerts'
import CustomInput from "../../UI/CustomInput.js";
import Card from "../../UI/Card";
import CardHeader from "../../UI/CardHeader.js";
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import {primaryColor,grayColor} from "../../UI/material-dashboard-react";
import PriceInput from '../../Functions/PriceInput'

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
    //   ...defaultFont,
      color: grayColor[3] + " !important",
      fontWeight: "400",
      fontSize: "14px",
      lineHeight: "1.42857",
      letterSpacing: "unset"
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

function UpdateHouse(props) {
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [status, setStatus] = useState('')
    const [rent, setRent] = useState('')
    const [redirect, setRedirect] = useState(false)

    const classes = useStyles();

    const existingAddress = props.houses.selectedHouse.address
    const existingCity = props.houses.selectedHouse.city
    const existingState = props.houses.selectedHouse.state
    const existingZipcode = props.houses.selectedHouse.zipcode
    const existingStatus = props.houses.selectedHouse.status
    const existingRent = props.houses.selectedHouse.rent
    const id = props.houses.selectedHouse.house_id

    useEffect(() => {
        if (existingAddress) {
            setAddress(existingAddress)
        }
    },[existingAddress])

    useEffect(() => {
        if (existingCity) {
            setCity(existingCity)
        }
    },[existingCity])

    useEffect(() => {
        if (existingState) {
            setState(existingState)
        }
    },[existingState])

    useEffect(() => {
        if (existingZipcode) {
            setZipcode(existingZipcode)
        }
    },[existingZipcode])

    useEffect(() => {
        if (existingStatus) {
            setStatus(existingStatus)
        }
    },[existingStatus])

    useEffect(() => {
        if (existingRent) {
            setRent(existingRent)
        }
    },[existingRent])

    const deleteExistingHouse = () => {
        if (props.user.data) {
                axios.delete(`/api/houses/${id}`)
                .then(() => {
                    props.getHouses()
                    setRedirect(true)})
                    success.fire({title: `${props.houses.selectedHouse.address} has been deleted.`})
            }  else {
                pleaseSignIn.fire()
            }
        }
    
    const updateExistingHouse = () => {
        if (props.user.data) {
                // const newAddress = address ? address : props.location.state.address
                // const newCity = city ? city : props.location.state.city
                // const newState = state ? state : props.location.state.state
                // // const newStringZipcode = stringZipcode ? stringZipcode : props.location.state.zipcode
                // const newZipcode = zipcode ? zipcode : props.location.state.zipcode
                // const newRent = rent ? rent : props.location.state.rent
                // const newStatus = status ? status : props.location.state.status
                // const houseId = props.location.state.selectedHouse
                // const newZipcode = parseInt(newStringZipcode, 10)
                // const newRent = parseInt(newStringRent, 10)
                axios.put('/api/houses', {id,address,city,state,zipcode,rent,status})
                .then(() => {
                    props.getHouses()
                    setRedirect(true)
                    success.fire({title: `${existingAddress} has been updated.`})
                })
               } else {
                pleaseSignIn.fire()
            }
        }
        

    return (
        <form onSubmit={updateExistingHouse}>
            {redirect ? <Redirect to="/main" /> : null}
            <Grid container>
                <Grid item xs={12} sm={12} md={8} className={classes.grid}>
                    <Card>
                        <CardHeader color="primary" className='add-contractor-header'>
                            <h4 className={classes.cardTitleWhite}>Update Address</h4>
                            <p className={classes.cardCategoryWhite}>Enter the fields you would like to update.</p>
                        </CardHeader>
                        <Grid container className='address-cancel-container'>
                            <Grid item xs={12} sm={12} md={6} className={classes.grid}>
                                <CustomInput
                                labelText="Address"
                                id="address"
                                formControlProps={{
                                    required: true,
                                    fullWidth: true
                                }}
                                inputProps={{
                                    value: address,
                                    onChange: (e) => setAddress(e.target.value)
                                }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} className={classes.grid}>
                                {/* <CustomInput
                                labelText="Status"
                                id="status"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    value: status,
                                    onChange: (e) => setStatus(e.target.value)
                                }}
                                /> */}
                                <MuiThemeProvider theme={theme}>
                                    <FormControl
                                    className={classes.formControl}
                                    fullWidth
                                    >
                                        <InputLabel
                                        classes={{root: classes.labelRoot}}
                                        > Status
                                        </InputLabel>
                                        <Select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        classes={{
                                            root: classes.marginTop,
                                            disabled: classes.disabled,
                                            underline: classes.underline
                                        }}
                                        >
                                            <MenuItem value='Rental - Long Term'>Monthly Rental</MenuItem>
                                            <MenuItem value='Rental - Short Term'>Short Term Rental</MenuItem>
                                            <MenuItem value='Residence - Primary'>Primary Residence </MenuItem>
                                            <MenuItem value='Under Remodel'>Remodeling</MenuItem>
                                            <MenuItem value='Unoccupied'>Unoccupied</MenuItem>
                                            <MenuItem value='Other'>Other</MenuItem>
                                        </Select>
                                    </FormControl>
                                </MuiThemeProvider>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} className={classes.grid}>
                                <FormControl required className={classes.formControl} >
                                    <PriceInput
                                    price={rent}
                                    setPrice={setRent}
                                    label='Rent (monthly)'/>
                                </FormControl>
                                
                                {/* <CustomInput
                                labelText="Rent"
                                id="rent"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    value: stringRent,
                                    onChange: (e) => setStringRent(e.target.value)
                                }}
                                /> */}
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={4} className={classes.grid}>
                                <CustomInput
                                labelText="City"
                                id="city"
                                formControlProps={{
                                    required: true,
                                    fullWidth: true
                                }}
                                inputProps={{
                                    value: city,
                                    onChange: (e) => setCity(e.target.value)
                                }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} className={classes.grid}>
                                <MuiThemeProvider theme={theme}>
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
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
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
                                </MuiThemeProvider>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} className={classes.grid}>
                                <CustomInput
                                labelText="Postal Code"
                                id="postal-code"
                                formControlProps={{
                                    required: true,
                                    fullWidth: true
                                }}
                                inputProps={{
                                    value: zipcode,
                                    onChange: (e) => setZipcode(e.target.value)
                                }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container className='status-rent-cancel-add-container'>
                            <Grid item className='delete-house-button'>
                                <Button onClick={() => { 
                if (props.user.data) {
                        confirmDelete.fire({
                            text: 'Are you sure you want to delete this house? Renters associated with this house will also be deleted. This action is irreversible.'}).then((result) => {
                            if (result.value) {deleteExistingHouse()}})
                        } else {pleaseSignIn.fire()}
                    }
                }  variant='contained' color="secondary" className='delete-house-button'>Delete House</Button>
                            </Grid>
                            <Grid item className='cancel-submit-container' >
                                <Button onClick={()=> setRedirect(true)} variant='outlined' color="secondary" className='cancel-update-button'>Cancel</Button>
                                <Button type='submit' variant='contained' color="primary" className='submit-update-button'>Submit</Button>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </form>
    )
}

const mapDispatchToProps = {getHouses, setSelectedHouseRedux}

const mapStateToProps = state => state

export default connect(mapStateToProps, mapDispatchToProps)(UpdateHouse)

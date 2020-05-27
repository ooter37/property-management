import './AddHouse.scss'
import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {getHouses, setSelectedHouseRedux} from '../../../redux/reducers/houses'
import { Grid, Button, FormControl, InputLabel, Select, MenuItem, CardMedia, Typography, FormHelperText } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import {pleaseSignIn, success} from '../../Functions/Sweetalerts'
import PriceInput from '../../Functions/PriceInput'
import CustomInput from "../../UI/CustomInput.js";
import Card from "../../UI/Card";
import CardHeader from "../../UI/CardHeader.js";
import {primaryColor,dangerColor,successColor,grayColor} from "../../UI/material-dashboard-react";

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

function AddHouse(props) {
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipcode, setZipcode] = useState()
    const [status, setStatus] = useState('')
    const [rent, setRent] = useState()
    // const [ownership, setOwnership] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [image, setImage] = useState('')
    const [error, setError] = useState(false)
    const classes = useStyles();

    function handleClick() {
        setError(false)
        if (!state) {
            setError(true)
        }
    }

    useEffect(() => {
        if (image !== '/no-image-selected.png' && address && city && state) {
            setImage(`https://maps.googleapis.com/maps/api/streetview?size=300x200&location=${(`${address},+${city},+${state}`).replace(/\s/g,',+')}&key=${process.env.REACT_APP_GOOGLE}`)
        }
    },[address,city,state,image])


    const submitNewHouse = () => {
        if (props.user.data) { state &&
            axios.post('/api/houses', {address,city,state,zipcode,rent,status})
            .then(() => {
                props.getHouses()
                // console.log(props.houses.houses)
                // props.setSelectedHouseRedux(props.houses.houses[0])
                // console.log(props.houses.selectedHouse)
                setRedirect(true)
                success.fire({title: `${address} has been added.`})
            })
        } else {
            pleaseSignIn.fire()
        }
}
        
        
    return (
        <form onSubmit={submitNewHouse}>
            {redirect ? <Redirect to="/main" /> : null}
            <Grid container>
                <Grid item xs={12} sm={12} md={8} className={classes.grid}>
                    <Card>
                        <CardHeader color="primary" className='add-contractor-header'>
                            <h4 className={classes.cardTitleWhite}>Add House</h4>
                            {/* <p className={classes.cardCategoryWhite}>An image the house will be pulled from Google Maps Street View.</p> */}
                        </CardHeader>
                        <Grid 
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                            className='update-contents-container'>
                            <Grid item className='image-panel' md={4}>
                                {/* <CardContent className='image-panel-background'> */}
                                <Grid 
                                // spacingTop={4}
                                container 
                                direction="column" 
                                justify="space-around"
                                alignItems="center"
                                >
                                    <Grid item  md={12}>
                                        <Typography className='text-preview' variant='body1'>Preview</Typography>
                                    </Grid>
                                    <Grid item className={classes.grid} md={12}>
                                        <CardMedia
                                        style = {{ height: 200, minWidth: 200}}
                                        // className={classes.cover}
                                        image= {image}
                                        // image= {`https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80`}
                                        title="Live from space album cover"
                                        />
                                    </Grid>
                                    <Grid item className='remove-image-button' md={12} >
                                        <Button onClick={() => setImage('/no-image-selected.png')} variant='outlined' color="secondary" className='delete-house-button'>Remove</Button>
                                    </Grid>
                                </Grid>
                                {/* </CardContent> */}
                            </Grid>

                                
                            <Grid item className='form-contents-container' md={8}>
                                <Grid 
                                container
                                // direction="column"
                                // justify="space-between"
                                // alignItems="flex-end"
                                >   
                                    <Grid item className={classes.grid} md={12}>
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
                                    <Grid item className={classes.grid} md={4}>
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
                                    <Grid item  className={classes.grid} md={4}>
                                        <MuiThemeProvider theme={theme}>
                                            <FormControl
                                            className={classes.formControl}
                                            fullWidth
                                            required
                                            error={error}
                                            >
                                                <InputLabel
                                                classes={{root: classes.labelRoot}}
                                                > State
                                                </InputLabel>
                                                <Select
                                                // required
                                                value={state}
                                                onChange={(e) => {setError(false)
                                                    setState(e.target.value)}}
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
                                                {error && <FormHelperText>This is required!</FormHelperText>}
                                            </FormControl>
                                        </MuiThemeProvider>
                                    </Grid>
                                    <Grid item className={classes.grid} md={4}>
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
                                    <Grid item className={classes.grid} md={6}>
                                        <CustomInput
                                        labelText="Status"
                                        id="status"
                                        formControlProps={{
                                            // required: true,
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            value: status,
                                            onChange: (e) => setStatus(e.target.value)
                                        }}
                                        />
                                    </Grid>
                                    <Grid item  className={classes.grid} md={6}>
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
                                            required: true,
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            value: rent,
                                            onChange: (e) => setRent(e.target.value)
                                        }}
                                        /> */}
                                    </Grid>
                                    <Grid item className='cancel-submit-container'  md={12}>
                                        <Grid 
                                        container
                                        direction="row"
                                        justify="flex-end"
                                        alignItems="flex-end">

                                        <Button onClick={()=> setRedirect(true)} variant='outlined' color="secondary" className='cancel-update-button'>Cancel</Button>
                                        <Button onClick={() => handleClick()} type='submit' variant='contained' color="primary" className='submit-update-button'>Submit</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid> 
                            {/* <Grid container className='status-rent-cancel-add-container'>
                                
                            </Grid> */}
                        </Grid>
                    </Card>
                </Grid>
                
            </Grid>
        </form>
    )
}

const mapDispatchToProps = {getHouses, setSelectedHouseRedux}

const mapStateToProps = state => state

export default connect(mapStateToProps, mapDispatchToProps)(AddHouse)

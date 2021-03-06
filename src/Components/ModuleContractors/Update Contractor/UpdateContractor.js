import './UpdateContractor.scss'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getContractors} from '../../../redux/reducers/houses'
import {pleaseSignIn, success} from '../../Functions/Sweetalerts'
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { Grid, Button, FormControl, Select, InputLabel, MenuItem, TextField, Typography } from "@material-ui/core";
import CustomInput from "../../UI/CustomInput.js";
import Card from "../../UI/Card";
import CardHeader from "../../UI/CardHeader.js";
import {primaryColor,grayColor} from "../../UI/material-dashboard-react";
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

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

  const taskSelections = [
    'General Contractor',
    'Electrical',
    'Handyman',
    'Home Repair',
    'House Cleaning',
    'Landscaping',
    'Painting',
    'Plumbing',
    'Restoration',
    'Pool Maintenance',
    'Roofing',
    'Tree Care',
];

function UpdateContractor(props) {
    const [name, setName] = useState(props.selectedContractorFull.name);
    const [email, setEmail] = useState(props.selectedContractorFull.email);
    const [phone, setPhone] = useState(props.selectedContractorFull.phone);
    const [address, setAddress] = useState(props.selectedContractorFull.address)
    const [city, setCity] = useState(props.selectedContractorFull.city)
    const [state, setState] = useState(props.selectedContractorFull.state)
    const [zipcode, setZipcode] = useState(props.selectedContractorFull.zipcode)
    const [services, setServices] = useState('')
    const [value, setValue] = useState(props.selectedContractorFull.services)

    const classes = useStyles();

    const filter = createFilterOptions();

    async function updateContractor() {
        try {
            if (props.user.data) {
                const id = props.selectedContractorFull.contractor_id
                await axios.put('/api/contractors', {id,name,email,phone,address,city,state,zipcode,services})
                props.getContractors()
                props.toggleUpdating(false)
                resetForm()
                success.fire({title: `${name} updated.`})
            } else {
                pleaseSignIn.fire()
            }
        } catch (error) {
            console.log('Error updating contractor.', error)
        }
    }

    useEffect(() => {
        let filteredServices = []
        value && 
        value.forEach((elem) => {
            if (typeof elem === 'string') {
                filteredServices.push(elem)
            } else {
                filteredServices.push(elem.inputValue)
            }
        })
        setServices(filteredServices)
    },[value])

    function resetForm() {
        setName('')
        setEmail('')
        setPhone('')
        setAddress('')
        setCity('')
        setState('')
        setZipcode('')
        setServices('')
    }

    return (
        <form onSubmit={updateContractor}>
            {/* <button onClick={() => console.log(props.selectedContractorFull.services)} >service log</button> */}
            <Grid container>
                <Grid item xs={12} sm={12} md={8} className={classes.grid}>
                    <Card>
                        <CardHeader color="primary" className='add-contractor-header'>
                            <Typography variant='h5' className={classes.cardTitleWhite}>{props.selectedContractorFull ? `Updating ${props.selectedContractorFull.name}` : 'Something went wrong, please refresh the page.'}</Typography>
                            {/* <p className={classes.cardCategoryWhite}>Edit the fields you'd like to update.</p> */}
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
                                    fullWidth: true
                                }}
                                inputProps={{
                                    value: email,
                                    onChange: (e) => setEmail(e.target.value),
                                    type: 'email'
                                }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={6} className={classes.grid}>
                                <FormControl fullWidth className={classes.formControl}>
                                    <Autocomplete
                                    id='service'
                                    value={value}
                                    onChange={(event, newValue) => {
                                        if (newValue && newValue.inputValue) {
                                            return setValue(newValue.inputValue)
                                        } setValue(newValue)
                                    }
                                    }
                                    filterOptions={(options, params) => {
                                        const filtered = filter(options, params);
                                        if (params.inputValue !== '') {
                                            filtered.push({
                                            inputValue: params.inputValue,
                                            title: `Add "${params.inputValue}"`,
                                        });}
                                        return filtered;}}
                                    multiple
                                    options={taskSelections}
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
                                    <TextField {...params} variant="standard" label="Services Provided"/>)}/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} className={classes.grid}>
                                <CustomInput
                                labelText="Address"
                                id="address"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    value: address,
                                    onChange: (e) => setAddress(e.target.value)
                                }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={4} className={classes.grid}>
                                <CustomInput
                                labelText="City"
                                id="city"
                                formControlProps={{
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
                                    fullWidth: true
                                }}
                                inputProps={{
                                    value: zipcode,
                                    onChange: (e) => setZipcode(e.target.value)
                                }}
                                />
                            </Grid>
                            <Grid container className='status-rent-cancel-add-container'>

                            <Grid item className='delete-house-button'>
                                {/* <Button 
                //                 onClick={() => { 
                // if (props.user.data) {
                //         confirmDelete.fire({
                //             text: 'Are you sure you want to delete this house? Renters associated with this house will also be deleted. This action is irreversible.'}).then((result) => {
                //             if (result.value) {deleteExistingHouse()}})
                //         } else {pleaseSignIn.fire()}
                //     }}  
                    variant='contained' color="secondary" className='delete-house-button'>Delete Provider</Button> */}
                            </Grid>
                            <Grid item className='cancel-submit-container' >
                                <Button onClick={()=> props.setDisplaying('default')} variant='outlined' color="secondary" className='cancel-update-button'>Cancel</Button>
                                <Button type='submit' variant='contained' color="primary" className='submit-update-button'>Update</Button>
                            </Grid>

                        </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </form>
    )
}

const mapDispatchToProps = {getContractors}

const mapStateToProps = state => state

export default connect(mapStateToProps, mapDispatchToProps)(UpdateContractor)

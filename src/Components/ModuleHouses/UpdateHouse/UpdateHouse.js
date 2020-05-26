import './UpdateHouse.scss'
import React, {useState} from 'react'
import {connect} from 'react-redux'
import {getHouses} from '../../../redux/reducers/houses'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
// import { Card } from 'tabler-react'
// import "tabler-react/dist/Tabler.css";
import AddressForm from '../../Functions/AddressForm'
import StatusForm from '../../Functions/StatusForm'
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import {pleaseSignIn, errorUpdate, success, errorDelete} from '../../Functions/Sweetalerts'
import CustomInput from "../../UI/CustomInput.js";
import Button from "../../UI/Button.js";
import Card from "../../UI/Card";
import CardHeader from "../../UI/CardHeader.js";

const styles = {
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

function UpdateHouse(props) {
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipcode, setZipcode] = useState()
    const [status, setStatus] = useState('')
    const [stringRent, setStringRent] = useState(0)
    const [redirect, setRedirect] = useState(false)
    const classes = useStyles();

    const deleteExistingHouse = () => {
        if (props.user.data) {
            if (!props.location.state) {
                setRedirect(true)
                errorDelete.fire()
            } else {
                const id = props.location.state.selectedHouse
                axios.delete(`/api/houses/${id}`)
                .then(() => {
                    props.getHouses()
                    setRedirect(true)})
                    success.fire({title: `${props.location.state.address} has been deleted.`})
            } } else {
                pleaseSignIn.fire()
            }
        }
    
    const updateExistingHouse = () => {
        if (props.user.data) {
            if (!props.location.state) {
                setRedirect(true)
                errorUpdate.fire()
            } else {
                const newAddress = address ? address : props.location.state.address
                const newCity = city ? city : props.location.state.city
                const newState = state ? state : props.location.state.state
                // const newStringZipcode = stringZipcode ? stringZipcode : props.location.state.zipcode
                const newZipcode = zipcode ? zipcode : props.location.state.zipcode
                const newStringRent = stringRent ? stringRent : props.location.state.rent
                const newStatus = status ? status : props.location.state.status
                const houseId = props.location.state.selectedHouse
                // const newZipcode = parseInt(newStringZipcode, 10)
                const newRent = parseInt(newStringRent, 10)
                axios.put('/api/houses', {houseId,newAddress,newCity,newState,newZipcode,newRent,newStatus})
                .then(() => {
                    props.getHouses()
                    setRedirect(true)
                    success.fire({title: `${props.location.state.address} has been updated.`})
                })
            }   } else {
                pleaseSignIn.fire()
            }
        }

    return (
        <form onSubmit={updateExistingHouse}>
            <Grid container>
                <Grid item xs={12} sm={12} md={8} className={classes.grid}>
                    <Card>
                        <CardHeader color="primary" className='add-contractor-header'>
                            <h4 className={classes.cardTitleWhite}>Update Address</h4>
                            <p className={classes.cardCategoryWhite}>Enter the fields you'd like to update.</p>
                        </CardHeader>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={5} className={classes.grid}>
                                <CustomInput
                                labelText="Name"
                                id="name"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    // value: name,
                                    // onChange: (e) => setName(e.target.value)
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
                                    // value: phone,
                                    // onChange: (e) => setPhone(e.target.value),
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
                                    // value: email,
                                    // onChange: (e) => setEmail(e.target.value),
                                    type: 'email'
                                }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={6} className={classes.grid}>
                                <CustomInput
                                labelText="Service"
                                id="service"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    // value: service,
                                    // onChange: (e) => setService(e.target.value)
                                }}
                                />
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
                                <CustomInput
                                labelText="State"
                                id="state"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    value: state,
                                    onChange: (e) => setState(e.target.value)
                                }}
                                />
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
                            <Button type='submit' variant='contained' color="primary" className='add-contractor-button'>Add</Button>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </form>










        // <Grid className='update-house-component-container'>
        // <Card>            
        // {redirect ? <Redirect to="/main" /> : null}
        // <Typography variant='h6'>Enter values you would like to change. Click update when finished.</Typography>


        //     <div className='address-form'><AddressForm 
        //     address={address} setAddress={setAddress} required={false}
        //     city={city} setCity={setCity} 
        //     state={state} setState={setState} 
        //     zipcode={stringZipcode} setZipcode={setStringZipcode} 
        //     />
        //     </div>
        //     <div className='address-form'><StatusForm
        //     status={status} setStatus={setStatus} required={false}
        //     rent={stringRent} setRent={setStringRent} 
        //     />
        //     </div>
        //     <div className='address-form'> 
        //         <Grid container spacing={1}>
        //             {/* <Grid item xs={12} sm={6}>
        //             <TextField
        //             required
        //             select
        //             fullWidth
        //             id="ownership"
        //             name="ownership"
        //             // label='Ownership'
        //             // autoComplete="fname"
        //             value={ownership}
        //             onChange={(e) => setOwnership(e.target.value)}
        //             label='Ownership'>
        //                 <MenuItem value='Owner'>Owner</MenuItem>
        //                 <MenuItem value='Property Manager'>Property Manager</MenuItem>
        //                 <MenuItem value='Other'>Other</MenuItem>                       
        //             </TextField>
        //             </Grid> */}
        //             <Grid item xs={12} sm={6} className='update-house-component-buttons'>
        //                 <Button color='primary' className='add-house-button' onClick={() => updateExistingHouse()} variant='contained'>Update House</Button>
        //                 <Button color='secondary' className='delete-house-button' onClick={() => deleteExistingHouse()} variant='contained'>Delete House</Button>
        //             </Grid>
        //         </Grid>
        //     </div>
        // </Card>
        // </Grid>
    )
}

const mapDispatchToProps = {getHouses}

const mapStateToProps = state => state

export default connect(mapStateToProps, mapDispatchToProps)(UpdateHouse)

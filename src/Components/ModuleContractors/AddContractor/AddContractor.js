import './AddContractor.scss'
import React, {useState} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {pleaseSignIn, success} from '../../Functions/Sweetalerts'
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import CustomInput from "../../UI/CustomInput.js";
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

function AddContractor(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipcode, setZipcode] = useState()
    const [service, setService] = useState()
    const classes = useStyles();


    function submitNewContractor() {
        if (props.user.data) {
            axios.post('/api/contractors', {name,email,phone,address,city,state,zipcode})
            .then(() => {
                success.fire({title: `${name} added as a new contractor.`})
                axios.get('/api/contractors').then(res => {
                    props.setContractors(res.data)
                    resetForm()
            })
            })
        } else {
            pleaseSignIn.fire()
        }
    }

    function resetForm() {
        setName('')
        setEmail('')
        setPhone('')
        setAddress('')
        setCity('')
        setState('')
        setZipcode('')
        setService()
    }

    return (
        <form onSubmit={submitNewContractor}>
            <Grid container>
                <Grid item xs={12} sm={12} md={8} className={classes.grid}>
                    <Card>
                        <CardHeader color="primary" className='add-contractor-header'>
                            <h4 className={classes.cardTitleWhite}>Add Contractor</h4>
                            <p className={classes.cardCategoryWhite}>Enter the contractor's details.</p>
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
                                <CustomInput
                                labelText="Service"
                                id="service"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    value: service,
                                    onChange: (e) => setService(e.target.value)
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
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(AddContractor)

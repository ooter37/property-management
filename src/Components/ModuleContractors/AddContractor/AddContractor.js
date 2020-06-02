import './AddContractor.scss'
import React, {useState} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getContractors} from '../../../redux/reducers/houses'
import {pleaseSignIn, success} from '../../Functions/Sweetalerts'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Typography } from "@material-ui/core";
import CustomInput from "../../UI/CustomInput.js";
import Card from "../../UI/Card";
import CardHeader from "../../UI/CardHeader.js";
import StateInput from '../../Functions/StateInput'
import SelectMulti from '../../Functions/SelectMulti'

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

function AddContractor(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipcode, setZipcode] = useState('')
    //service state must remain empty so data type is correct on service array
    const [services, setServices] = useState()
    const [value, setValue] = useState([])
    const classes = useStyles();


    async function submitNewContractor() {
        try {
            if (props.user.data) {
                await axios.post('/api/contractors', {name,email,phone,address,city,state,zipcode,services})
                props.getContractors()
                resetForm()
                success.fire({title: `${name} added as a new contractor.`})
            } else {
                pleaseSignIn.fire()
            }
        } catch (error) {
            console.log('Error adding contractor.', error)
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
        //setServices must remain empty so data type is correct on service array
        setServices()
    }

    return (
        <form onSubmit={submitNewContractor}>
            {/* <button onClick={() => console.log(services)} >service log</button> */}
            <Grid container>
                <Grid item xs={12} sm={12} md={8} className={classes.grid}>
                    <Card>
                        <CardHeader color="primary" className='add-contractor-header'>
                            <Typography variant='h5' className={classes.cardTitleWhite}>Add a service provider</Typography>
                            {/* <p className={classes.cardCategoryWhite}>Enter the provider's details.</p> */}
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
                                <SelectMulti value={value} setValue={setValue} setServices={setServices} selections={taskSelections} />
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
                                <StateInput state={state} setState={setState} />
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
                            {/* <Grid item xs={12} sm={12} md={4} className={classes.grid}> */}
                                <Grid 
                                container
                                direction="row"
                                justify="flex-end"
                                alignItems="flex-end">
                                    <Button type='submit' variant='contained' color="primary" className='add-contractor-button'>Add</Button>
                                </Grid>
                            {/* </Grid> */}
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </form>
    )
}

const mapDispatchToProps = {getContractors}

const mapStateToProps = state => state

export default connect(mapStateToProps, mapDispatchToProps)(AddContractor)

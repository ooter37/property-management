import './AddContractor.scss'
import React, {useState} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {pleaseSignIn, success} from '../../Functions/Sweetalerts'
import { makeStyles } from "@material-ui/core/styles";
import {InputLabel, TextField, Grid } from "@material-ui/core";
import CustomInput from "../../UI/CustomInput.js";
import Button from "../../UI/Button.js";
// import GridItem from '../../UI/GridItem';
// import GridContainer from "../../UI/GridContainer.js";
// import Button from "../../UI/Button.js";
import Card from "../../UI/Card";
// import CardBody from "../../UI/CardBody.js";
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
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipcode, setZipcode] = useState()
    const classes = useStyles();


    function submitNewContractor() {
        if (props.user.data) {
            axios.post('/api/contractors', {name,email,phone,address,city,state,zipcode})
            .then(() => {
                success.fire({title: `${name} added as a new contractor.`})
            })
        } else {
            pleaseSignIn.fire()
        }
    }

    return (
        <div>
            <br/>
 
            <br/>
{/* 
            <form>

            
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={8}>
                    <Card style = {{ maxWidth: 800, minHeight: 400}}>
                        <TextField
                        className='contractor-textfield'
                        // required={props.required}
                        id="address"
                        name="address"
                        label="Address line"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        variant='outlined'
                        margin='normal'
                        />
                        <TextField
                        className='contractor-textfield'
                        // required={props.required}
                        id="city"
                        name="city"
                        label="City"
                        // fullWidth
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        variant='outlined'
                        margin='normal'
                        />
                    </Card>
                </Grid>
            </Grid>
</form>
 */}


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
                      fullWidth: true
                    }}
                  />
                </Grid>
                <Grid item item xs={12} sm={12} md={3} className={classes.grid}>
                  <CustomInput
                    labelText="Phone Number"
                    id="phone"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} className={classes.grid}>
                  <CustomInput
                    labelText="Email"
                    id="email"
                    formControlProps={{
                      fullWidth: true
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
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} className={classes.grid}>
                  <CustomInput
                    labelText="Address"
                    id="address"
                    formControlProps={{
                      fullWidth: true
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
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} className={classes.grid}>
                  <CustomInput
                    labelText="State"
                    id="state"
                    formControlProps={{
                      fullWidth: true
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
                  />
                </Grid>
              <Button variant='contained' color="primary" className='add-contractor-button'>Add</Button>
              </Grid>
          </Card>
        </Grid>
      </Grid>
        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(AddContractor)

import './AddHouse.scss'
import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import AddressForm from '../../Functions/AddressForm'
import StatusForm from '../../Functions/StatusForm'
import { TextField, Button, Grid, MenuItem } from '@material-ui/core';
import {pleaseSignIn, success} from '../../Functions/Sweetalerts'

function AddHouse (props) {
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [stringZipcode, setStringZipcode] = useState()
    const [status, setStatus] = useState('')
    const [stringRent, setStringRent] = useState(0)
    const [ownership, setOwnership] = useState('')
    const [redirect, setRedirect] = useState(false)

    const submitNewHouse = () => {
        if (props.user.data) {
            const zipcode = parseInt(stringZipcode, 10)
            const rent = parseInt(stringRent, 10)
            axios.post('/api/houses', {address,city,state,zipcode,rent,status,ownership})
            .then(() => {
                setRedirect(true)
                success.fire({title: `${address} has been added.`})
            })
        } else {
            pleaseSignIn.fire()
        }
}

    return (
        <div>            
            {redirect ? <Redirect to="/main" /> : null}
            <div className='address-form'><AddressForm 
            address={address} setAddress={setAddress} required={true}
            city={city} setCity={setCity} 
            state={state} setState={setState} 
            zipcode={stringZipcode} setZipcode={setStringZipcode} 
            /></div>
            <div className='address-form'><StatusForm
            status={status} setStatus={setStatus} required={true}
            rent={stringRent} setRent={setStringRent} 
            /></div>
            <div className='address-form'> 
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    select
                    fullWidth
                    id="ownership"
                    name="ownership"
                    // label='Ownership'
                    // autoComplete="fname"
                    value={ownership}
                    onChange={(e) => setOwnership(e.target.value)}
                    label='Ownership'>
                        <MenuItem value='Owner'>Owner</MenuItem>
                        <MenuItem value='Property Manager'>Property Manager</MenuItem>
                        <MenuItem value='Other'>Other</MenuItem>                       
                    </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button className='add-house-button' onClick={() => submitNewHouse()} variant='contained'>Add House</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(AddHouse)

import './UpdateHouse.scss'
import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import { Button, Grid, Typography } from '@material-ui/core';
import { Card } from 'tabler-react'
import "tabler-react/dist/Tabler.css";
import AddressForm from '../../Functions/AddressForm'
import StatusForm from '../../Functions/StatusForm'
import {pleaseSignIn, errorUpdate, success, errorDelete} from '../../Functions/Sweetalerts'

function UpdateHouse(props) {
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [stringZipcode, setStringZipcode] = useState()
    const [status, setStatus] = useState('')
    const [stringRent, setStringRent] = useState(0)
    const [redirect, setRedirect] = useState(false)

    const deleteExistingHouse = () => {
        if (props.user.data) {
            if (!props.location.state) {
                setRedirect(true)
                errorDelete.fire()
            } else {
                const id = props.location.state.selectedHouse
                axios.delete(`/api/houses/${id}`)
                .then(() => {
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
                const newStringZipcode = stringZipcode ? stringZipcode : props.location.state.zipcode
                const newStringRent = stringRent ? stringRent : props.location.state.rent
                const newStatus = status ? status : props.location.state.status
                const houseId = props.location.state.selectedHouse
                const newZipcode = parseInt(newStringZipcode, 10)
                const newRent = parseInt(newStringRent, 10)
                axios.put('/api/houses', {houseId,newAddress,newCity,newState,newZipcode,newRent,newStatus})
                .then(() => {
                    setRedirect(true)})
                    success.fire({title: `${props.location.state.address} has been updated.`})
            } } else {
                pleaseSignIn.fire()
            }
        }

    return (
        <Grid className='update-house-component-container'>
        <Card>            
        {redirect ? <Redirect to="/main" /> : null}
        <Typography variant='h6'>Enter values you would like to change. Click update when finished.</Typography>


            <div className='address-form'><AddressForm 
            address={address} setAddress={setAddress} required={false}
            city={city} setCity={setCity} 
            state={state} setState={setState} 
            zipcode={stringZipcode} setZipcode={setStringZipcode} 
            /></div>
            <div className='address-form'><StatusForm
            status={status} setStatus={setStatus} required={false}
            rent={stringRent} setRent={setStringRent} 
            /></div>
            <div className='address-form'> 
                <Grid container spacing={1}>
                    {/* <Grid item xs={12} sm={6}>
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
                    </Grid> */}
                    <Grid item xs={12} sm={6} className='update-house-component-buttons'>
                        <Button color='primary' className='add-house-button' onClick={() => updateExistingHouse()} variant='contained'>Update House</Button>
                        <Button color='secondary' className='delete-house-button' onClick={() => deleteExistingHouse()} variant='contained'>Delete House</Button>
                    </Grid>
                </Grid>
            </div>
        </Card>
        </Grid>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(UpdateHouse)

import './UpdateHouse.scss'
import React, {useState} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import AddressForm from '../../Functions/AddressForm'
import StatusForm from '../../Functions/StatusForm'
import { Button, Grid } from '@material-ui/core';

function UpdateHouse(props) {
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [stringZipcode, setStringZipcode] = useState()
    const [status, setStatus] = useState('')
    const [stringRent, setStringRent] = useState(0)

    const updateExistingHouse = () => {
        const newAddress = address ? address : props.location.state.address
        const newCity = city ? city : props.location.state.city
        const newState = state ? state : props.location.state.state
        const newStringZipcode = stringZipcode ? stringZipcode : props.location.state.zipcode
        const newStringRent = stringRent ? stringRent : props.location.state.rent
        const newStatus = status ? status : props.location.state.status
        // if (props.user.data) {
            const houseId = props.location.state.selectedHouse
            const newZipcode = parseInt(newStringZipcode, 10)
            const newRent = parseInt(newStringRent, 10)
            axios.put('/api/houses', {houseId,newAddress,newCity,newState,newZipcode,newRent,newStatus})
    //         .then(() => {
    //             axios.get('/api/houses').then(res => {
    //                 props.setHouses(res.data)
    //                 if (res.data[0]){props.setSelectedHouse(res.data[0].house_id)}
    //     })
    // })
// }
}

    return (
        <div>            
            <button onClick={() => console.log(address)}>state</button>
            {/* <button onClick={() => console.log(newAddress)}>new</button> */}
            {/* <button onClick={() => console.log(props.location.state.address)}>props</button> */}
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
                    <Grid item xs={12} sm={6}>
                        <Button className='add-house-button' onClick={() => updateExistingHouse()} variant='contained'>Update House</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(UpdateHouse)

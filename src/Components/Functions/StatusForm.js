import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem'
import PriceInput from '../Functions/PriceInput'

// const status = [
//     'Rental - Long Term (Normal Rental)',
//     'Rental - Short Term (Airbnb, VRBO)',
//     'Rental - Other',
//     'Residence - Primary',
//     'Residence - Secondary',
//     'Residence - Other',
//     'Under Remodel',
//     'Unoccupied',
//     'Other'
// ]

export default function StatusForm(props) {
  return (
    <React.Fragment>
      {/* <Typography variant="h6" gutterBottom>
        Address
      </Typography> */}
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
            <TextField
            required
            select
            fullWidth
            id="status"
            name="status"
            // label='Select'
            // autoComplete="fname"
            value={props.status}
            onChange={(e) => props.setStatus(e.target.value)}
            label='Status'>
                <MenuItem value='Rental - Long Term'>Rental - Long Term (Normal Rental)</MenuItem>
                <MenuItem value='Rental - Short Term'>Rental - Short Term (Airbnb, VRBO)</MenuItem>
                <MenuItem value='Residence - Primary'>Residence - Primary</MenuItem>
                <MenuItem value='Residence - Secondary'>Residence - Secondary</MenuItem>
                <MenuItem value='Residence - Other'>Residence - Other</MenuItem>
                <MenuItem value='Under Remodel'>Under Remodel</MenuItem>
                <MenuItem value='Unoccupied'>Unoccupied</MenuItem>
                <MenuItem value='Rental - Other'>Rental - Other</MenuItem>
                <MenuItem value='Other'>Other</MenuItem>
            </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
        <PriceInput label='Monthly Income (rent)' price={props.rent} setPrice={props.setRent} />
        </Grid>
        {/* <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="billing address-line1"
            value={props.address}
            onChange={(e) => props.setAddress(e.target.value)}
          />
        </Grid> */}
        {/* <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="billing address-line2"
          />
        </Grid> */}
        {/* <Grid item xs={12} sm={6}>
          <TextField
            required
            id="status"
            name="city"
            label="City"
            fullWidth
            autoComplete="billing address-level2"
            value={props.city}
            onChange={(e) => props.setCity(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField 
            id="state" 
            name="state" 
            label="State/Province/Region" 
            fullWidth 
            value={props.state}
            onChange={(e) => props.setState(e.target.value)}
            />
        </Grid> */}
        {/* <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="billing postal-code"
            value={props.zipcode}
            onChange={(e) => props.setZipcode(e.target.value)}
          />
        </Grid> */}
        {/* <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="billing country"
          />
        </Grid> */}
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}
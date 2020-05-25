import React from 'react';
import {TextField, MenuItem, Card, Grid} from '@material-ui/core';

export default function AddressForm(props) {
  return (
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            required={props.required}
            id="address"
            name="address"
            label="Address line"
            fullWidth
            value={props.address}
            onChange={(e) => props.setAddress(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required={props.required}
            id="city"
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
            label="State" 
            required={props.required}
            fullWidth 
            select
            value={props.state}
            onChange={(e) => props.setState(e.target.value)}
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
            </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required={props.required}
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="billing postal-code"
            value={props.zipcode}
            onChange={(e) => props.setZipcode(e.target.value)}
          />
        </Grid>
      </Grid>
  );
}
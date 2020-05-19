import React from 'react'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'

export default function PriceInput(props) {
    const {price, setPrice} = props
    
    return (
    <CurrencyTextField
		label={props.label}
		variant="standard"
		value={price}
		currencySymbol="$"
		minimumValue="0"
		outputFormat="string"
		decimalCharacter="."
		digitGroupSeparator=","
		onChange={(event, value)=> setPrice(value)}
    />
    );
}
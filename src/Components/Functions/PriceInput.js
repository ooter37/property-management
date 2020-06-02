import React from 'react'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import {primaryColor,grayColor} from '../UI/material-dashboard-react'

// const theme = createMuiTheme({
//     overrides: {
//       MuiInput: {
//         underline: {
//             "&:hover:not($disabled):before,&:before": {
//               borderColor: grayColor[4] + " !important",
//               borderWidth: "1px !important"
//             },
//             "&:after": {
//               borderColor: primaryColor[0] + '!important'
//             }
//           },
//       }
//     }
// })
export default function PriceInput(props) {
    const {price, setPrice} = props
    
    return (
	// <MuiThemeProvider theme={theme}>
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
	// </MuiThemeProvider>
    );
}
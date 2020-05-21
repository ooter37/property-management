import React from 'react'
import Typography from '@material-ui/core/Typography';

export default function displayHouseStatus (element) {
    return(
        <Typography component={'div'}>
            <Typography variant='h6'>Rental Status</Typography>
            <div>{element.status}</div>
            <div>Monthly Income: ${element.rent}</div>
        </Typography>
        )
}

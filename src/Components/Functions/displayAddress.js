import React from 'react'
import Typography from '@material-ui/core/Typography';

export default function displayAddress (element) {
    return(
        <Typography component={'div'}>
            <Typography variant='h6'>Address</Typography>
            <div>{element.address}</div>
            <div>{element.city}, {element.state} {element.zipcode}</div>
        </Typography>
        )
}

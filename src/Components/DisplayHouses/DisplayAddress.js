import React from 'react'
import Typography from '@material-ui/core/Typography';

export default function DisplayAddress (props) {
    return(
        <Typography component={'div'}>
            <Typography variant='h6'>Address</Typography>
            <div>{props.house.address}</div>
            <div>{props.house.city}, {props.house.state} {props.house.zipcode}</div>
        </Typography>
        )
}

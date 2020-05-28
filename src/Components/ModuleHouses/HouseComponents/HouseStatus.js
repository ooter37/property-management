import React from 'react'
import Typography from '@material-ui/core/Typography';

export default function HouseStatus (props) {
    return(
        <Typography component={'div'}>
            <Typography variant='h6'>Rental Status</Typography>
            <div>{props.house.status}</div>
            <div>Monthly Income: ${props.house.rent}</div>
        </Typography>
        )
}

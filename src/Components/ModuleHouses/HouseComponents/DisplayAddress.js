import React from 'react'
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

export default function DisplayAddress (props) {
    return(
        <Typography component={'div'}>
            <Typography variant='h6'>Address</Typography>
            <Tooltip title={props.house.address}><Typography noWrap={true} className='house-card-display-address'>{props.house.address}</Typography></Tooltip>
            <Tooltip title={`${props.house.city} ${props.house.state} ${props.house.zipcode} `}><Typography noWrap={true} className='house-card-display-address'>{`${props.house.city} ${props.house.state} ${props.house.zipcode} `}</Typography></Tooltip>
        </Typography>
        )
}

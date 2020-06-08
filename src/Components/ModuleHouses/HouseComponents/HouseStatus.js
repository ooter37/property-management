import React from 'react'
import Typography from '@material-ui/core/Typography';
// import Tooltip from '@material-ui/core/Tooltip';

export default function HouseStatus (props) {
    return(
        <Typography component={'div'}>
            <Typography variant='h6'>Rental Status</Typography>
            <Typography>{props.house.status}</Typography>
            <Typography noWrap={true} className='house-card-display-rent'>Monthly Income: ${props.house.rent}</Typography>

            {/* <div>Monthly Income: ${props.house.rent}</div> */}
        </Typography>
        )
}

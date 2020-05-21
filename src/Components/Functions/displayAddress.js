import React from 'react'
import Typography from '@material-ui/core/Typography';

export default function displayAddress (element) {
    return(
        <div className='address-container'>
            <Typography component={'div'}>
                <Typography variant='h5'>Address</Typography>
                <div>{element.address}</div>
                <div>{element.city}, {element.state} {element.zipcode}</div>
                {/* <div>{element.state}</div> */}
                {/* <div>{element.zipcode}</div> */}
            </Typography>
        </div>
        )
}

import React from 'react'

export default function displayAddress (element) {
    return(
        <div className='address-container'>
            <div>{element.address}</div>
            <div>{element.city}</div>
            <div>{element.state}</div>
            <div>{element.zipcode}</div>
        </div>
        )
}

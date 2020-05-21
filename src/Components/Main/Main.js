import React from 'react'
import './Main.scss'
import DisplayHouses from '../DisplayHouses/DisplayHouses'
import ImageUpload from '../Functions/ImageUpload'

export default function Main (props) {
    
    return (
        <div className='main'>
            <DisplayHouses />
            <ImageUpload/>
        </div>
    )
}


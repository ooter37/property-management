import React from 'react'
import './Main.scss'
import DisplayHouses from '../DisplayHouses/DisplayHouses'
import HouseButton from '../Functions/HouseButton'

export default function Main (props) {
    
    return (
        <div className='main'>
            <DisplayHouses />
            <HouseButton/>
        </div>
    )
}


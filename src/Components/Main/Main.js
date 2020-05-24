import React from 'react'
import './Main.scss'
import DisplayHouses from '../DisplayHouses/DisplayHouses'
import Header from '../Header/Header'

export default function Main (props) {
    
    return (
        <div className='main'>
            <Header />
            
            <DisplayHouses />
        </div>
    )
}


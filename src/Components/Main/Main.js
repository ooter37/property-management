import React from 'react'
import './Main.scss'
import DisplayHouses from '../DisplayHouses/DisplayHouses'
import FileUpload from '../Functions/FileUpload'

export default function Main (props) {
    
    return (
        <div className='main'>
            <DisplayHouses />
            <FileUpload />
        </div>
    )
}


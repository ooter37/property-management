import './ModuleRenters.scss'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import DisplayRenters from './Display Renters/DisplayRenters'
import AddRenter from './AddRenter/AddRenter'
import SingleEmail from '../Email/SingleEmail'

export default function ModuleRenters(){
    const [renters, setRenters] = useState('')
    const [emailing, setEmailing] = useState(null)

    useEffect(() => {
        axios.get('/api/renters').then(res => {
            setRenters(res.data)
        })}, []
    )

return (
    <div>
        <DisplayRenters 
        setEmailing={setEmailing} 
        renters={renters}
        setRenters={setRenters}
        />
        {
            (emailing)
            ?
        <SingleEmail setEmailing={setEmailing} emailing={emailing} />
        :
        <AddRenter setRenters={setRenters} />
        }
    </div>
)
}
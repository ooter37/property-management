import './ModuleRenters.scss'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import DisplayRenters from './Display Renters/DisplayRenters'
import AddRenter from './AddRenter/AddRenter'

export default function ModuleRenters(){
    const [renters, setRenters] = useState('')

    useEffect(() => {
        axios.get('/api/renters').then(res => {
            setRenters(res.data)
        })}, []
    )

return (
    <div>
        <button onClick={() => console.log(renters)}>log renters</button>
        <DisplayRenters 
        renters={renters}
        setRenters={setRenters}
        />
        <AddRenter setRenters={setRenters} />
    </div>
)
}
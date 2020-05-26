import './ModuleRenters.scss'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import DisplayRenters from './Display Renters/DisplayRenters'
// import AddContractor from './Add Contractor/AddContractor'

export default function ModuleRenters(){
    const [renters, setRenters] = useState('')

    useEffect(() => {
        axios.get('/api/renters').then(res => {
            setRenters(res.data)
        })}, []
    )

return (
    <div>
        <DisplayRenters 
        renters={renters}
        setRenters={setRenters}
        />
        {/* <AddContractor setContractors={setContractors} /> */}
    </div>
)
}
import './ModuleContractors.scss'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import DisplayContractors from './DisplayContractors/DisplayContractors'
import AddContractor from './AddContractor/AddContractor'

export default function ModuleContractors(){
    const [contractors, setContractors] = useState('')

    useEffect(() => {
        axios.get('/api/contractors').then(res => {
            setContractors(res.data)
        })}, []
    )

return (
    <div>
        <DisplayContractors 
        contractors={contractors}
        setContractors={setContractors}
        />
        <AddContractor setContractors={setContractors} />
    </div>
)
}
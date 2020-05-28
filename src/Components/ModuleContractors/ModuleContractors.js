import './ModuleContractors.scss'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import DisplayContractors from './DisplayContractors/DisplayContractors'
import AddContractor from './AddContractor/AddContractor'
import UpdateContractor from './Update Contractor/UpdateContractor'

export default function ModuleContractors(){
    const [contractors, setContractors] = useState('')
    const [updating, setUpdating] = useState(true)
    useEffect(() => {
        axios.get('/api/contractors').then(res => {
            setContractors(res.data)
        })}, []
    )

return (
    <div>
        <DisplayContractors 
        updating={updating}
        setUpdating={setUpdating}
        contractors={contractors}
        setContractors={setContractors}
        />
        {
            (updating)
            ?
            <UpdateContractor setContractors={setContractors} />
            :
            
        <AddContractor setContractors={setContractors} />
        }
    </div>
)
}
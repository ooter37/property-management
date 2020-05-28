import './ModuleContractors.scss'
import React, {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux' 
import {getContractors} from '../../redux/reducers/houses'
import DisplayContractors from './DisplayContractors/DisplayContractors'
import AddContractor from './AddContractor/AddContractor'
import UpdateContractor from './Update Contractor/UpdateContractor'

function ModuleContractors(props){
    const [redirect,setRedirect] = useState(false)
    // const [contractors, setContractors] = useState('')
    const [updating, setUpdating] = useState(true)
    //change updating default state to false when component is ready
    const [selectedContractor, setSelectedContractor] = useState(true)

    const {data} = props.user
    const {getContractors} = props
    // useEffect(() => {
    //     axios.get('/api/contractors').then(res => {
    //         setContractors(res.data)
    //     })}, []
    //     )
    useEffect(() => {
        if (!data) {setRedirect(true)}
        else if (!data.loading) {
          getContractors()
        }
      },
      [getContractors, data])

      function toggleUpdating(selected) {
        setUpdating(!updating)
        setSelectedContractor(selected)
      }
        
        
return (
    <div>
         {
        redirect
        &&
        <Redirect to='/' />
        }
        <DisplayContractors 
        toggleUpdating={toggleUpdating}
        updating={updating}
        setUpdating={setUpdating}
        contractors={props.houses.contractors}
        // contractors={contractors}
        // setContractors={setContractors}
        />
        {
            (updating)
            ?
            <UpdateContractor selectedContractor={selectedContractor} />
            :
            
        <AddContractor />
        }
    </div>
)
}

const mapDispatchToProps = {getContractors}

const mapStateToProps = state => state

export default connect(mapStateToProps, mapDispatchToProps)(ModuleContractors)

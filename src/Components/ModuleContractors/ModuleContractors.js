import './ModuleContractors.scss'
import React, {useState, useEffect} from 'react'
// import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux' 
import {getContractors} from '../../redux/reducers/houses'
import DisplayContractors from './DisplayContractors/DisplayContractors'
import AddContractor from './AddContractor/AddContractor'
import UpdateContractor from './Update Contractor/UpdateContractor'
import Email from '../Email/Email'

function ModuleContractors(props){
    // const [redirect,setRedirect] = useState(false)
    // const [contractors, setContractors] = useState('')
    // const [updating, setUpdating] = useState(false)
    const [selectedContractorFull, setSelectedContractorFull] = useState('')
    const [emailing, setEmailing] = useState('')
    const [displaying, setDisplaying] = useState('default')
    const {data} = props.user
    const {getContractors} = props
    // useEffect(() => {
    //     axios.get('/api/contractors').then(res => {
    //         setContractors(res.data)
    //     })}, []
    //     )
    useEffect(() => {
        // if (!data) {setRedirect(true)}
        // else 
        if (data) {
          getContractors()
        }
      },
      [getContractors, data])

      function toggleUpdating(displaying,contractorData) {
        setDisplaying(displaying)
        setSelectedContractorFull(contractorData)
      }
      
        
        
return (
    <div>
         {/* {
        redirect
        &&
        <Redirect to='/' />
        } */}
        <DisplayContractors 
        toggleUpdating={toggleUpdating}
        setDisplaying={setDisplaying}
        // updating={updating}
        // setUpdating={setUpdating}
        setEmailing={setEmailing} 
        contractors={props.houses.contractors}
        // contractors={contractors}
        // setContractors={setContractors}
        />
        {(() => {
        switch (displaying) {
          case 'emailing':   return <Email setDisplaying={setDisplaying} emailing={emailing} />;
          case 'updating': return <UpdateContractor toggleUpdating={toggleUpdating} selectedContractorFull={selectedContractorFull} setDisplaying={setDisplaying}/>;
          default:      return <AddContractor />;
        }
      })()}

{/* 

        {
            (updating)
            ?
            <UpdateContractor toggleUpdating={toggleUpdating} setUpdating={setUpdating} selectedContractorFull={selectedContractorFull} />
            :
            
        <AddContractor />
        } */}
    </div>
)
}

const mapDispatchToProps = {getContractors}

const mapStateToProps = state => state

export default connect(mapStateToProps, mapDispatchToProps)(ModuleContractors)

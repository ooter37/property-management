import './ModuleRenters.scss'
import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux' 
import {getRenters} from '../../redux/reducers/houses'
import DisplayRenters from './Display Renters/DisplayRenters'
import AddRenter from './AddRenter/AddRenter'
import Email from '../Email/Email'
import UpdateRenter from './Update Renter/UpdateRenter'

function ModuleRenters(props){
    const [displaying, setDisplaying] = useState('default')
    const [selectedRenterFull, setSelectedRenterFull] = useState('')
    const [emailing, setEmailing] = useState('')

    const {data} = props.user
    const {getRenters} = props

    useEffect(() => {
        if (data) {
            getRenters()
        }
      },[getRenters, data])

      function toggleUpdating(displaying,renterData) {
        setDisplaying(displaying)
        setSelectedRenterFull(renterData)
      }

return (
    <div>
        <DisplayRenters 
        setDisplaying={setDisplaying}
        toggleUpdating={toggleUpdating}
        renters={props.houses.renters}
        setEmailing={setEmailing} 
        />
        
        {(() => {
        switch (displaying) {
          case 'emailing':   return <Email setDisplaying={setDisplaying} emailing={emailing} />;
          case 'updating': return <UpdateRenter selectedRenterFull={selectedRenterFull} setDisplaying={setDisplaying}/>;
          default:      return <AddRenter />;
        }
      })()}

        {/* {
            (emailing)
            ?
        <SingleEmail setEmailing={setEmailing} emailing={emailing} />
        :
        <AddRenter setRenters={setRenters} />
        } */}
    </div>
)
}

const mapDispatchToProps = {getRenters}

const mapStateToProps = state => state

export default connect(mapStateToProps, mapDispatchToProps)(ModuleRenters)

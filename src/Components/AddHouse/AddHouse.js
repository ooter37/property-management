import React, {useState} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

import './AddHouse.scss'

function AddHouse (props) {

    return (
        <div>
            this is the AddHouse component
        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(AddHouse)

import React from 'react'
import {connect} from 'react-redux'
import './Navbar.scss'

const Navbar = () => {
    return (
        <div className='Navbar'>
            
        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(Navbar)
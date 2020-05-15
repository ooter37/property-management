import React from 'react'
import {connect} from 'react-redux'
import './Header.scss'

const Header = () => {
    return (
        <div className='header'>

        </div>
    )
}

const mapStateToProps = state => state
  
  export default connect(mapStateToProps, null)(Header)
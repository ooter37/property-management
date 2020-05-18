import React from 'react'
import {connect} from 'react-redux'
import './Header.scss'
import Logout from '../Auth/Logout'
const Header = (props) => {
    return (
        <div className='header'>
            {
                (props.user.data)
                &&
                <Logout />
            }
        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(Header)
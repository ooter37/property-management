import React from 'react'
import {connect} from 'react-redux'
import {logout} from '../../redux/reducers/user'

const Logout = () => {
    const logoutHandler = () => {
        props.logout().then(() => {
            console.log('logout successful')
        })
        .catch(err => console.log('Error logging out.', err))
    }
    return (
        <div>
            <button
            onClick={logoutHandler}
            >Logout</button>
        </div>
    )
}
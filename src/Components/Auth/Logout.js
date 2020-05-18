import React, {useState} from 'react'
import {connect} from 'react-redux'
import {logout} from '../../redux/reducers/user'
import {Redirect} from 'react-router-dom'


const Logout = (props) => {
    const [redirect, setRedirect] = useState(false)
    const toggleRedirect = () => {
        setRedirect(!redirect)
    }
    const logoutHandler = () => {
        toggleRedirect()
        props.logout().then(() => {
            console.log('Logout successful.')
        })
        .catch(err => console.log('Error logging out.', err))
    }
    return (
        <div>
            {
            redirect
            &&
            <Redirect to='/' />
            }
            <button
            onClick={logoutHandler}
            >Logout</button>
        </div>
    )
}

export default connect(null, { logout })(Logout);
import './Auth.scss'
import React, {useState} from 'react'
import {connect} from 'react-redux'
import {logout} from '../../redux/reducers/user'
import {Redirect} from 'react-router-dom'
import {Button} from '@material-ui/core/';
import {success} from '../Functions/Sweetalerts'

const Logout = (props) => {
    const [redirect, setRedirect] = useState(false)
    const toggleRedirect = () => {
        setRedirect(!redirect)
    }
    const logoutHandler = () => {
        toggleRedirect()
        props.logout()
        // .then(() => {
        //     // success.fire({title: `Logged out.`})
        //     // console.log(props)
        // })
        .catch(err => console.log('Error logging out.', err))
    }
    return (
        <div>
            {
            redirect
            &&
            <Redirect to='/' />
            }
            <Button className='logout-button' onClick={() => logoutHandler()} color="inherit">Logout</Button>
        </div>
    )
}

export default connect(null, { logout })(Logout);
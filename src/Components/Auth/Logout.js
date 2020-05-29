import './Auth.scss'
import React, {useState} from 'react'
import {connect} from 'react-redux'
import {logout} from '../../redux/reducers/user'
import {Redirect} from 'react-router-dom'
import {Button} from '@material-ui/core/';

const Logout = (props) => {
    const [redirect, setRedirect] = useState(false)

    const logoutHandler = () => {
        setRedirect(!redirect)
        props.logout()
    }
    
    return (
        <div>
            {
            redirect
            &&
            <Redirect to='/' />
            }
            <Button className='logout-button' onClick={() => logoutHandler()} variant='contained' color="primary">Logout</Button>
        </div>
    )
}

export default connect(null, { logout })(Logout);
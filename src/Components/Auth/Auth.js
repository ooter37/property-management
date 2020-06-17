import './Auth.scss'
import React, {useState} from 'react'
import Login from './Login'
import Register from './Register'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from '../../redux/reducers/user'

const Auth = () => {
    // const {redirect, toggleRedirect} = useRedirect(false)
    const [redirect, setRedirect] = useState(false)
    const [display, setDisplay] = useState(true)
    // console.log(redirect)
    const toggleRedirect = () => {
        setRedirect(!redirect)
    }
    const toggleDisplay = () => {
        setDisplay(!display)
    }
    return (
        <div>
            {
            redirect
            &&
            <Redirect to='/main' />
            }
            <div>
                {
                    display
                    ?
                    <Login toggleRedirect={toggleRedirect} toggleDisplay={toggleDisplay} />
                    :
                    <Register toggleRedirect={toggleRedirect} toggleDisplay={toggleDisplay} />
                }
            </div>
        </div>
    )
}

export default connect(null, { login })(Auth);

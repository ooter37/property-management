import React, {useState} from "react";
import { connect } from "react-redux";
import { login } from "../src/redux/reducers/user";

const Login = (props) => {
    const [state, setState] = useState({email: '', password: ''})

    const loginHandler = (e) => {
        e.preventDefault()
        props.login(state)
        .then(() => {
            setState({email: '', password: ''})
            props.toggleRedirect()
        })
        .catch((err) => {
            console.log("Error with login.", err)
        })
    }
    const changeHandler = (e) => {
        setState({...state, [e.target.name]: e.target.value})
    }
    return(
        <div className='login-component'>
            Login Component
            <form className='form-container' onSubmit={loginHandler}>
                <input 
                placeholder='email'
                type='text'
                name='email'
                required
                value={state.email}
                onChange={(e) => changeHandler(e)}
                />
                <input 
                placeholder='password'
                type='password'
                name='password'
                required
                value={state.password}
                onChange={(e) => changeHandler(e)}
                />
                <button>Login</button>
            </form>
            {
                props.location
                ?
                null
                :
                <div>
                    <button onClick={props.toggleDisplay}>Click to Login</button>
                </div>
            }
        </div>
    )
}

export default connect(null, { login })(Login);

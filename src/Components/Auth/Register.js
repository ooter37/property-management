import React, {useState} from "react";
import { connect } from "react-redux";
import { register } from "../../redux/reducers/user";

const Register = (props) => {
    const [state, setState] = useState({email: '', password: ''})

    const registrationHandler = (e) => {
        e.preventDefault()
        props.register(state)
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
            Register Component
            <form className='form-container' onSubmit={registrationHandler}>
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
                <button>Register</button>
            </form>
            {
                props.location
                ?
                null
                :
                <div>
                    <button onClick={props.toggleDisplay}>Click to Register</button>
                </div>
            }
        </div>
    )
}

export default connect(null, { register })(Register);

import './Auth.scss'
import React, {useState, useEffect} from 'react';
import { connect } from "react-redux";
import {Redirect, Link} from 'react-router-dom'
import { Button, CssBaseline, Paper, Box, Grid, Typography} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { login } from "../../redux/reducers/user";
import CustomInput from '../UI/CustomInput'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1590118242265-17319c3f9d0d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1652&q=80)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#4caf50',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
  const classes = useStyles();
  const {data, loading} = props.user

  useEffect(() => {
    if (data && loading !== true) {
      setRedirect(true)
    }
  },[data, loading])

//   const toggleRedirect = () => {
//     setRedirect(!redirect)
// }

  const loginHandler = (e) => {
    e.preventDefault()
    props.login({email,password})
    // .then(() => {
    //     setEmail('')
    //     setPassword('')
    //     toggleRedirect()
    // })
    .catch((err) => {
        console.log("Error with login.", err)
    })
}

  return (
    <Grid container component="main" className={classes.root}>
    {/* {console.log(props)} */}
      <CssBaseline />
    {/* <button onClick={() => console.log(props)}>PROP GETTER!!!</button> */}
      <Grid item xs={false} sm={4} md={7} className={classes.image + ' logo-container'}>
        <Typography component="h1" variant="h2" align='center' className='logo-prop'>Prop</Typography>
        <Typography component="h1" variant="h1" align='center' className='logo-aid'>Aid</Typography>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          {/* <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1" variant="h5">Welcome to Prop Aid!</Typography>
          <Typography component="h1" variant="body1">This website was created to help you manage properties. You can track houses, contractors, renters, tasks, and more.</Typography>
          <form className={classes.form} onSubmit={loginHandler}>
            <CustomInput
            labelText="Email"
            id="email"
            formControlProps={{
                required: true,
                fullWidth: true
            }}
            inputProps={{
                value: email,
                onChange: (e) => setEmail(e.target.value)
            }}
            />
            <CustomInput
            labelText="Password"
            id="password"
            formControlProps={{
                required: true,
                fullWidth: true
            }}
            inputProps={{
                value: password,
                onChange: (e) => setPassword(e.target.value)
            }}
            />

            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className='auth-button'
              // className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link to='/register' variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
            </Box>
          </form>
          {
            redirect
            &&
            <Redirect to='/main' />
            }
        </div>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { login })(Login);
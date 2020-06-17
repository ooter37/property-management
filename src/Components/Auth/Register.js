import './Auth.scss'
import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from "react-redux";
import { register } from "../../redux/reducers/user";
import {Redirect} from 'react-router-dom'
import {Link} from 'react-router-dom'
import CustomInput from '../UI/CustomInput'

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Register(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const classes = useStyles();

    const toggleRedirect = () => {
        setRedirect(!redirect)
    }

const registrationHandler = (e) => {
    e.preventDefault()
    props.register({email,password})
    .then(() => {
        setEmail('')
        setPassword('')
        toggleRedirect()
    })
    .catch((err) => {
        console.log("Error with login.", err)
    })
}

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={registrationHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className='auth-button'
            // className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to='/' variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
            {
            redirect
            &&
            <Redirect to='/main' />
            }
      </div>
      <Box mt={5}>
        {/* <Copyright /> */}
      </Box>
    </Container>
  );
}

export default connect(null, { register })(Register);
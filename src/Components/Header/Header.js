import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import './Header.scss'
import {AppBar, Toolbar, IconButton, Typography, Button, makeStyles} from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import Logout from '../Auth/Logout'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

const Header = (props) => {
    const classes = useStyles();
    const [redirect, setRedirect] = useState(false)
    const toggleRedirect = () => {
        setRedirect(!redirect)
    }
    return (
        
        <AppBar position="static">
            {
            redirect
            &&
            <Redirect to='/' />
            }
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          {
            (props.user.data)
            ?
            <Logout />
            :
            <Button onClick={() => toggleRedirect()} color="inherit">Login</Button>
            }
        </Toolbar>
      </AppBar>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(Header)
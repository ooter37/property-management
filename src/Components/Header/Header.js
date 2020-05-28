import './Header.scss'
import React, {useState} from 'react'
import {connect} from 'react-redux'
import { Redirect, withRouter, Link } from 'react-router-dom';
import {AppBar, Toolbar, Typography, useScrollTrigger, Button, IconButton} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import HomeIcon from '@material-ui/icons/Home';
import Zoom from '@material-ui/core/Zoom';

import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Logout from '../Auth/Logout'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  loginLogout: {
    marginRight: 'auto',
  }
}));

function ScrollTop(props) {
  const { children } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

function Header(props) {
    const [redirect, setRedirect] = useState(false)
    const toggleRedirect = () => {
        setRedirect(!redirect)
    }

    // function goBack() {
    //   props.history.goBack()
    // }

  return (
    <React.Fragment>
      <CssBaseline />
      {
      redirect
      &&
      <Redirect to='/' />
      }
      <AppBar className='header-appbar'>
        <Toolbar className='header-toolbar'>
          <Link to='/main'>
            <IconButton edge="start"  color="inherit" aria-label="menu">
              <HomeIcon />
              <Typography variant='h4'>&nbsp; Prop Aid</Typography>
            </IconButton>
          </Link>
          <div className='login-goback-container'>
            <button onClick={() => console.log(props)}>PROP GETTER!!!</button>
            <IconButton onClick={() => props.history.goBack()} edge="start"  color="inherit" aria-label="menu">
              <KeyboardBackspaceIcon  />
              <Typography variant='h6'>&nbsp; Previous Page</Typography>
            </IconButton>
            <div className='login-logout-container' >
              {
              (props.user.data) 
              ?
              <Logout />
              :
              <Button className='header-logout-button' onClick={() => toggleRedirect()} color="inherit">Login</Button>
              }
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <ScrollTop {...props}>
        <Fab className='up-icon' color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}

const mapStateToProps = state => state
export default connect(mapStateToProps, null)(withRouter(Header))
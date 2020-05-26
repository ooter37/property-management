import './Header.scss'
import React, {useState} from 'react'
import {connect} from 'react-redux'
import { Redirect, withRouter, Link } from 'react-router-dom';

// import PropTypes from 'prop-types';
import {AppBar, Toolbar, Typography, useScrollTrigger, Button, IconButton} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Box from '@material-ui/core/Box';
// import Container from '@material-ui/core/Container';
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
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    // target: window ? window() : undefined,
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
      {/* <CssBaseline /> */}
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
              <Typography variant='h5'>&nbsp; Prop Aid</Typography>
            </IconButton>
          </Link>
          <div className='login-goback-container'>
            <IconButton edge="start"  color="inherit" aria-label="menu">
              <KeyboardBackspaceIcon onClick={() => props.history.goBack()} />
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
import React, {useState,useEffect} from 'react';
import './App.scss';
import './reset.css';
import {Route, Switch, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {requestUserData} from './redux/reducers/user'
import useRedirect from './Components/Hooks/useRedirect'
import Main from './Components/Main/Main'
import Auth from './Components/Auth/Auth'

function App(props) {
  // const [redirect, useRedirect] = useState(false)
  const {redirect, toggleRedirect} = useRedirect(false)

  // useEffect(() => {
  //   if (props.user) {
  //     props.requestUserData()
  //   }
  // },[])

  // const toggleRedirect = () => {
  //   useRedirect(!redirect)
  // }

  return (
    <div className="App">
      {
        redirect
        &&
        <Redirect to='/' />
      }
      <div>
        App.js component
        <Switch>
          <Route exact path='/' component={Auth}/>
          <Route path='/main' component={Main}/>
      </Switch>
      </div>
    </div>
  );
}

const mapDispatchToProps = {requestUserData}

const mapStateToProps = state => state

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App))
import React, {useEffect} from 'react';
import './App.scss'
import './reset.css'
import './react-datepicker.min.css'
import {Route, Switch, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {requestUserData} from './redux/reducers/user'
import useRedirect from './Components/Hooks/useRedirect'
import Main from './Components/Main/Main'
import Landing from './Components/Auth/Landing'
import ModuleTasks from './Components/ModuleTasks/ModuleTasks'
import UpdateHouse from './Components/ModuleHouse/UpdateHouse/UpdateHouse'
import AddHouse from './Components/AddHouse/AddHouse'
import Register from './Components/Auth/Register'

function App(props) {
  // console.log(props.user)
  // const [redirect, useRedirect] = useState(false)
  const {redirect} = useRedirect(false)
  const {user, requestUserData} = props

  useEffect(() => {
    if (user) {
      requestUserData()
    }
  },
  // eslint-disable-next-line
  [])

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
        <Switch>
          <Route exact path='/' component={Landing}/>
          <Route path='/register' component={Register} />
          <Route path='/main' component={Main}/>
          <Route path='/add_house' component={AddHouse}/>
          <Route path='/update_house' component={UpdateHouse}/>
          <Route path='/task/:id' component={ModuleTasks} />
      </Switch>
      </div>
    </div>
  );
}

const mapDispatchToProps = {requestUserData}

const mapStateToProps = state => state

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App))
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
import UpdateHouse from './Components/ModuleHouses/UpdateHouse/UpdateHouse'
import AddHouse from './Components/ModuleHouses/AddHouse/AddHouse'
import Register from './Components/Auth/Register'
import ModuleContractors from './Components/ModuleContractors/ModuleContractors'
// import green from '@material-ui/core/colors/green';
// import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

// const theme = createMuiTheme({
//   palette: {
//     primary: green,
//     // secondary: green,
//   },
//   status: {
//     // danger: 'orange',
//   },
//   overrides: {
//     MuiButton: {
//       raisedPrimary: {
//         color: 'white',
//       },
//     },
//   }
// });

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
    // <MuiThemeProvider theme={theme}>
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
          <Route path='/contractors' component={ModuleContractors} />
      </Switch>
      </div>
    </div>
    // </MuiThemeProvider>
  );
}

const mapDispatchToProps = {requestUserData}

const mapStateToProps = state => state

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App))
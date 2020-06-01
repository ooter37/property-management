import React, {useEffect} from 'react';
import './App.scss'
import './reset.css'
import './react-datepicker.min.css'
import {connect} from 'react-redux'
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import {requestUserData} from './redux/reducers/user'
// import {getHouses} from './redux/reducers/houses'
import useRedirect from './Components/Hooks/useRedirect'
import Main from './Components/Main/Main'
import Landing from './Components/Auth/Landing'
import ModuleTasks from './Components/ModuleTasks/ModuleTasks'
import UpdateHouse from './Components/ModuleHouses/UpdateHouse/UpdateHouse'
import AddHouse from './Components/ModuleHouses/AddHouse/AddHouse'
import Register from './Components/Auth/Register'
import ModuleContractors from './Components/ModuleContractors/ModuleContractors'
import Header from './Components/Header/Header'
import ModuleRenters from './Components/ModuleRenters/ModuleRenters'
import ModuleTransactions from './Components/ModuleTransactions/ModuleTransactions'
import { createMuiTheme,MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
        // light: 
        main: '#4caf50',
        // dark:
        contrastText: '#fff'
    }
  },
});

function App(props) {
  // console.log(props.user)
  // const [redirect, useRedirect] = useState(false)
  const {redirect} = useRedirect(false)
  const {requestUserData} = props

  useEffect(() => {
    requestUserData()
  },
  [requestUserData])

  // useEffect(() => {
  //   getHouses()
  // },
  // [getHouses])


  return (
    <MuiThemeProvider theme={theme}>
    <div className="App">
      {
        redirect
        &&
        <Redirect to='/' />
      }
      <div>
        {
          props.location.pathname === '/' || props.location.pathname === '/register'
          ?
          null
          :
          <Header/>
        }
        <Switch>
          <Route exact path='/' component={Landing}/>
          <Route path='/register' component={Register} />
          <Route path='/main' component={Main}/>
          <Route path='/add_house' component={AddHouse}/>
          <Route path='/update_house' component={UpdateHouse}/>
          <Route path='/tasks' component={ModuleTasks} />
          <Route path='/contractors' component={ModuleContractors} />
          <Route path='/renters' component={ModuleRenters} />
          <Route path='/transactions' component={ModuleTransactions} />
          {/* <Route path='/email' component={singleEmail} /> */}
      </Switch>
      </div>
    </div>
    </MuiThemeProvider>
  );
}

const mapDispatchToProps = {requestUserData}

const mapStateToProps = state => state

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App))
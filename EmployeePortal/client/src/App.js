import React, { useEffect, useState } from 'react';
import LoginPage from './components/Login/LoginPage';
import Dashboard from './components/Dashboard/Dashboard';
import {BrowserRouter as Router, Route,Switch,Redirect} from 'react-router-dom';
import MyProfile from './components/Employees/MyProfile';
import AddEmployee from './components/Employees/AddEmployee';
import Navbar from './components/Dashboard/Navbar';
import _ from 'lodash'; 
import {useSelector} from 'react-redux';
import UserContext from './context/UserContext';
import { isTokenValid, getProfile } from './api/index';
 

const App = () =>{
 
  const state = useSelector(state => state);
  const loggedIn = _.get(state,'employees.loggedInStatus','');
  const [employeeData, setEmployeeData] = useState({
     token:'',
     employee:''   
  });
 

  useEffect(() => {
  
    const checkloggedIn = async() =>{
      let token = localStorage.getItem("auth-token");
      if(token === null){
        localStorage.setItem('auth-token', "");
        token = "";
      }
      const tokenRes = await isTokenValid(token);
      //on logout set it to empty
      // if(tokenRes){
      //   const employeeDetail = await getProfile(token);
      //   setEmployeeData({
      //     token,
      //     employee : employeeDetail.data});        
      // }
    }
    checkloggedIn();
  }, []);

  function PrivateRoute({children,...rest}){
    return(
      <Route {...rest} render={() =>{
            return loggedIn && employeeData.employee
            ? children 
            : <Redirect to='/login'/>

      }} />
    )
  }

  return(
    
    <Router>
      <UserContext.Provider value ={{employeeData, setEmployeeData}}>
      { loggedIn && employeeData.employee && <Navbar/>}
    
      <Route  path="/login" component={LoginPage} />
     
      <main>
      
      <Switch>
          <PrivateRoute exact path="/dashboard"  > 
          <Dashboard/>
          </PrivateRoute>

          <PrivateRoute exact path="/profile"  > 
          <MyProfile/>
          </PrivateRoute>

          <PrivateRoute exact path="/addEmployee"  > 
          <AddEmployee/>
          </PrivateRoute>

        </Switch> 
      </main>
       

      </UserContext.Provider>
    </Router>
  )
}


export default App;
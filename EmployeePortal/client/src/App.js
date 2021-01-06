import React, { useEffect, useState } from 'react';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import MyProfile from './components/MyProfile';
import AddEmployee from './components/AddEmployee';
import Navbar from './components/Navbar';
import _ from 'lodash'; 
import {useSelector} from 'react-redux';
import UserContext from './context/UserContext';
import { isTokenValid, getProfile } from './api/index';





const App = () =>{

  const state = useSelector(state => state)
  console.log(state)
  const loggedIn = _.get(state,'employees.loggedInStatus','');
  console.log(loggedIn)
  const [employeeData, setEmployeeData] = useState({
     token:'',
     employee:''   
  })
  
  useEffect(() => {
    const checkloggedIn = async() =>{
      let token = localStorage.getItem("auth-token");
      if(token === null){
        localStorage.setItem('auth-token', "");
        token = "";
      }
      const tokenRes = await isTokenValid(token);
      if(tokenRes){
        const employeeDetail = await getProfile(token);
       
        setEmployeeData({
          token,
          employee : employeeDetail.data});   
        
      }
      console.log(employeeData)
    }
    checkloggedIn();
    
  }, [])
  
  return(
    
    <Router>
      <UserContext.Provider value ={employeeData, setEmployeeData}>
         {loggedIn && <Navbar/>} 
      <main>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/dashboard" component={Dashboard} /> 
          <Route exact path="/profile" component={MyProfile} /> 
          <Route exact path="/addEmployee" component={AddEmployee} /> 
        </Switch>
      </main>
      </UserContext.Provider>
    </Router>
  )
}


export default App;
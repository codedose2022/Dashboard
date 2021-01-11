import * as api from '../api';
import _ from 'lodash';




export const login = (loginData) => async (dispatch) =>{
  try {
    const {data} = await api.login(loginData);
    const loginStatus = _.get(data,'messages.status','');
    dispatch ({type: 'LOGIN', payload: data});
    if(loginStatus === '11'){
      const token  =localStorage.getItem('auth-token')
      dispatch ({type: 'LOGIN_STATUS', payload: 'loggedIn'});
      dispatch(getEmployeesDetails(token));

}
    
 } catch (error) {
    
  console.log(error.message);
 }
}

export const getProfile = (token) => async (dispatch) => {
  try {
      const { data } = await api.getProfile(token);
      console.log(data);
      dispatch({ type: 'GET_PROFILE', payload: data });
    } catch (error) {
      console.log(error.message);
    }
}


export const isTokenValid = (token) => async () => {
 
  try {
   
      const isValid = await api.isTokenValid(token);
      console.log(isValid)
      return isValid;
    
    } catch (error) {
      console.log(error.message);
    }
}

export const getEmployeesDetails = (token) => async (dispatch) =>{
  try {
    const {data} = await api.getEmployees(token);
    dispatch ({type: 'GET_EMPLOYEES', payload: data});

}
    
 catch (error) {
    
  console.log(error.message);
 }
}
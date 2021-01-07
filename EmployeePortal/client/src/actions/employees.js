import * as api from '../api';
import _ from 'lodash';

export const login = (loginData) => async (dispatch) =>{
  try {
    const {data} = await api.login(loginData);
    const loginStatus = _.get(data,'messages.status','');
    dispatch ({type: 'LOGIN', payload: data});
    if(loginStatus === '11'){
      dispatch ({type: 'LOGIN_STATUS', payload: 'loggedIn'});

}
    
 } catch (error) {
    
  
  console.log(error.message);
 }
}

export const getProfile = () => async (dispatch) => {
  try {
      const { data } = await api.getProfile();
      console.log(data);
      dispatch({ type: 'GET_PROFILE', payload: data });
    } catch (error) {
      console.log(error.message);
    }
}


export const isTokenValid = (token) => async () => {
  console.log("inss:")
  try {
    console.log("inss:")
      const isValid = await api.isTokenValid(token);
      console.log(isValid)
      return isValid;
    
    } catch (error) {
      console.log(error.message);
    }
}
import * as api from '../api';
import _ from 'lodash';


export const getEvents = (token,division) => async (dispatch) =>{
  try {
    const {data} = await api.getEvents(token,division);
    dispatch ({type: 'GET_EVENTS', payload: data});
}
 catch (error) {  
  console.log(error.message);
 }
}

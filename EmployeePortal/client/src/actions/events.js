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

export const addEvents = (token,event) => async () =>{
 
  try {
    console.log(event)
    const {data} = await api.addEvent(token,event);
    console.log(data)
   // setServiceError(data.responseData.events);
   // dispatch ({type: 'ADD_EVENTS', payload: data.responseData.events});
}
 catch (error) {  
  console.log(error.message);
  //setServiceError("hi");
 }
}
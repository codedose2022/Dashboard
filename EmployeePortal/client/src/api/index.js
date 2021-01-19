import axios from 'axios';

const employeeDetailsUrl = 'http://localhost:5000/employeeDetails/';
const eventsUrl =  'http://localhost:5000/events/'

export const login = (loginData) => axios.post(`${employeeDetailsUrl}login`,loginData);
export const getProfile = (token) => axios.post(`${employeeDetailsUrl}profile`,null,{headers : {"x-auth-token": token}}); 
export const isTokenValid = (token) => axios.post(`${employeeDetailsUrl}isTokenValid`,null,{headers : {"x-auth-token": token}}); 
export const getEmployees = (token) => axios.post(`${employeeDetailsUrl}getEmployees`,null,{headers : {"x-auth-token": token}}); 
export const createEmployee = (token,employeeData) => axios.post(`${employeeDetailsUrl}createEmployee`,employeeData,{headers : {"x-auth-token": token}}); 
export const editEmployee = (token,employeeData) => axios.post(`${employeeDetailsUrl}editProfile`,employeeData,{headers : {"x-auth-token": token}}); 

export const getEvents = (token,division) => axios.post(`${eventsUrl}getEvents`,null,{headers : {"x-auth-token": token,"division":division}}); 
export const addEvent = (token,event) => axios.post(`${eventsUrl}createEvents`,event,{headers : {"x-auth-token": token}}); 
export const editEvent = (token,event) => axios.post(`${eventsUrl}editEvents`,event,{headers : {"x-auth-token": token}}); 
export const deleteEvent = (token,event) => axios.post(`${eventsUrl}deleteEvents`,event,{headers : {"x-auth-token": token}}); 

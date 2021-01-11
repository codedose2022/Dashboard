import axios from 'axios';

const url = 'http://localhost:5000/employeeDetails/';


export const login = (loginData) => axios.post(`${url}login`,loginData);
export const getProfile = (token) => axios.post(`${url}profile`,null,{headers : {"x-auth-token": token}}); 
export const isTokenValid = (token) => axios.post(`${url}isTokenValid`,null,{headers : {"x-auth-token": token}}); 
export const getEmployees = (token) => axios.post(`${url}getEmployees`,null,{headers : {"x-auth-token": token}}); 



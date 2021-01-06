import axios from 'axios';

const url = 'http://localhost:5000/employeeDetails/';
const id ={"id":"5fec373703ecbb307419a57b"};

export const login = (loginData) => axios.post(`${url}login`,loginData);
export const getProfile = (token) => axios.post(`${url}profile`,null,{headers : {"x-auth-token": token}}); 
export const isTokenValid = (token) => axios.post(`${url}isTokenValid`,null,{headers : {"x-auth-token": token}}); 


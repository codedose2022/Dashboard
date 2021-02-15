import axios from 'axios';

const employeeDetailsUrl = 'http://localhost:5000/employeeDetails/';
const eventsUrl =  'http://localhost:5000/events/';
const likeDislike = 'http://localhost:5000/likesDislikes/'; 
const commentsForEvents = 'http://localhost:5000/comments/'; 
const pollsUrl =  'http://localhost:5000/polls/'

export const login = (loginData) => axios.post(`${employeeDetailsUrl}login`,loginData);
export const getProfile = (token) => axios.post(`${employeeDetailsUrl}profile`,null,{headers : {"x-auth-token": token}}); 
export const isTokenValid = (token) => axios.post(`${employeeDetailsUrl}isTokenValid`,null,{headers : {"x-auth-token": token}}); 
export const getEmployees = (token) => axios.post(`${employeeDetailsUrl}getEmployees`,null,{headers : {"x-auth-token": token}}); 
export const createEmployee = (token,employeeData) => axios.post(`${employeeDetailsUrl}createEmployee`,employeeData,{headers : {"x-auth-token": token}}); 
export const editEmployee = (token,employeeData) => axios.post(`${employeeDetailsUrl}editProfile`,employeeData,{headers : {"x-auth-token": token}}); 
export const changePassword = (changePasswordData) => axios.post(`${employeeDetailsUrl}changePassword`,changePasswordData);
export const getUserData = (token) => axios.post(`${employeeDetailsUrl}getUserData`,null,{headers : {"x-auth-token": token}}); 
export const sendResetLink = (email) => axios.post(`${employeeDetailsUrl}sendResetLink`,email);
export const resetPassword = (pwd) => axios.post(`${employeeDetailsUrl}resetPassword`,pwd);


export const getEvents = (token,division) => axios.post(`${eventsUrl}getEvents`,null,{headers : {"x-auth-token": token,"division":division}}); 
export const addEvent = (token,event) => axios.post(`${eventsUrl}createEvents`,event,{headers : {"x-auth-token": token}}); 
export const editEvent = (token,event) => axios.post(`${eventsUrl}editEvents`,event,{headers : {"x-auth-token": token}}); 
export const deleteEvent = (token,event) => axios.post(`${eventsUrl}deleteEvents`,event,{headers : {"x-auth-token": token}}); 


export const upLike = (token,likeReq) => axios.post(`${likeDislike}upLike`,likeReq,{headers : {"x-auth-token": token}}); 
export const unLike = (token,likeReq) => axios.post(`${likeDislike}unLike`,likeReq,{headers : {"x-auth-token": token}}); 
export const upDisLike = (token,likeReq) => axios.post(`${likeDislike}upDisLike`,likeReq,{headers : {"x-auth-token": token}}); 
export const unDisLike = (token,likeReq) => axios.post(`${likeDislike}unDisLike`,likeReq,{headers : {"x-auth-token": token}}); 


export const addNewComment = (token,comment) => axios.post(`${commentsForEvents}addComments`,comment,{headers : {"x-auth-token": token}}); 

export const createPoll = (token,poll) => axios.post(`${pollsUrl}createPolls`,poll,{headers : {"x-auth-token": token}}); 
export const getPolls = (token) => axios.post(`${pollsUrl}getPolls`,null,{headers : {"x-auth-token": token}}); 
export const deletePoll = (token,poll) => axios.post(`${pollsUrl}deletePolls`,poll,{headers : {"x-auth-token": token}}); 
export const addPoll = (token,poll) => axios.post(`${pollsUrl}addPolls`,poll,{headers : {"x-auth-token": token}}); 

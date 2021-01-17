export default (state = [], action)=> {
    switch(action.type)
    {
        case 'LOGIN_STATUS':
            return {
                ...state,
                loggedInStatus: action.payload
            }
        case 'LOGIN':
         return {
                ...state,
                employee: action.payload,
            };
         case 'GET_PROFILE':
         return {
                ...state,
                profile: action.payload,
               
            };
        case 'GET_EMPLOYEES':
          return {
            ...state,
            employeesData: action.payload
          };
        default:
            return {...state};
    }
}
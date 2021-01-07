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
        default:
            return {...state};
    }
    
}
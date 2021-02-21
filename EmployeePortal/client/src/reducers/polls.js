const polls = (state = [], action)=> {
    switch(action.type)
    {
         case 'GET_POLLS':
         return {
                ...state,
                polls: action.payload,
               
            };
        default:
            return {...state};
    }
}
export default polls;
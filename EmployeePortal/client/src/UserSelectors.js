
import {useSelector} from 'react-redux';


export const GetState = () =>{
    const state = useSelector(state => state)
    console.log(state)
   
    
}

export const GetMessages = () =>{
    return( useSelector(state => state))
}

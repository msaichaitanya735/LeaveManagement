const initialState = {
    counter:1,
    authToken:'',
}

export const Reducer = (state=initialState,action)=>{
    if(action.type==='Switch'){
        return{...state,counter:action.payload}
    }
    if(action.type==='ReSwitch'){
        return{...state,counter:action.payload}
    }
    if(action.type==='AddToken'){
        return {...state,authtoken:action.payload}
    }
    return state    
}
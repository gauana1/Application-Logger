import {createContext, useReducer} from 'react';

export const AppContext = createContext();


export const AppReducer = (state, action) =>{
    switch(action.type){
        case 'SET_APPLICATIONS':
            return{
                apps:action.payload
        }
        case 'CREATE_APPLICATION':
            return{
                apps:[action.payload, ...state.apps]
            }
        case 'DELETE_APP':
            return{
                apps: state.apps.filter((app) => app._id !== action.payload._id)
            }
        case 'UPDATE_LIST':
            return{
                applist:[action.payload],
                state
            }
        default:
            return state
    }
}
export const AppContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(AppReducer,{
        apps:null, applist:null});

    return (
        <AppContext.Provider value ={{...state, dispatch}}>  
            {children}
        </AppContext.Provider>
    )
}


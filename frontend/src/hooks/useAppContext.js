import { AppContext } from "../context/appContext";
import { useContext } from "react";

export const useAppContext =() =>{
    const context = useContext(AppContext);
    if(!context){
        throw Error('Must be used under an appContextProvider')
    }
    return context;
}
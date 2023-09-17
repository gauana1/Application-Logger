import { useAuthContext } from "./useAuthContext";
import { useAppContext } from "./useAppContext";

export const useLogout = () => 
{
    const  {dispatch} = useAuthContext();
    const  {dispatch:appDispatch} = useAppContext();
    const logout = ()  => 
    {
        localStorage.removeItem('user');
        dispatch({type:"LOGOUT"})
        appDispatch({type:"SET_APPLICATIONS", payload:null})

    }
    return {logout};
}
import { useContext } from "react"
import { AuthContext } from "./AuthContext"
import { Outlet } from "react-router-dom";
import Login from "../../pages/Login/Login";

export const RequireAuth = () => {
    const [isLogged, signin, token,signout, rememberToken] = useContext(AuthContext);
    // console.log(isLogged);
    // console.log(localStorage.getItem('myKey'));
   
    console.log(token);

    if(token){
        console.log('remember', rememberToken);
        return  <Outlet/>
    }
   
    return <Login/>


}
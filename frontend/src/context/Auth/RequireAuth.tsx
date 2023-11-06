import { useContext } from "react"
import { AuthContext } from "./AuthContext"
import { Outlet } from "react-router-dom";
import Login from "../../pages/Login/Login";
import { getTokenLogin } from "../../utils/tokenLogin";

export const RequireAuth = () => {
    const [isLogged, signin, token ,signout, rememberToken, setRememberToken] = useContext(AuthContext);
    // console.log(isLogged);
    // console.log(localStorage.getItem('myKey'));
    
    const remember_token =  localStorage.getItem('ID');
    let tokenUser  = getTokenLogin(false); //sessionStorage
    
    
    console.log(remember_token);
    
    //FAZER A FUNÇÃO QUE FAZ A REQUISIÇÃO PARA O BANCO SE O BACKEND NO LOCAL STORAGE É IGUAL AO QUE ESTÁ NO BANCO
   
    if(remember_token != null && rememberToken != undefined || tokenUser != undefined){
        
        return  <Outlet/>
    }

    return <Login/>


}
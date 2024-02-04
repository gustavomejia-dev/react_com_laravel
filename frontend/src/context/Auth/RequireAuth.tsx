import { useContext, useEffect } from "react"
import { AuthContext } from "./AuthContext"
import { Outlet, createBrowserRouter, useParams } from "react-router-dom";
import Login from "../../pages/Login/Login";
import { getTokenLogin } from "../../utils/tokenLogin";
import { getSubdomain, getTenantID } from "../../utils/helpers";
import { PageNotFound } from "../../components/PageNotFound/PageNotFound";
// let router = createBrowserRouter(routes, { basename: "/base" })

export const RequireAuth = () => {
    // console.log('require auth')
    // const params = useParams();
    // console.log(params);
    
    const [isLogged, signin, token ,signout, rememberToken, setRememberToken, tenant] = useContext(AuthContext);
    
    // verifyDomainExist();
    // console.log('carregou auth require');
    // console.log(tenant);

    
    const remember_token =  localStorage.getItem('key');
    let tokenUser  = getTokenLogin(); //sessionStorage
    console.log('token usuario: ' + tokenUser);
    // console.log('rodouuu require');

   
    
    //FAZER A FUNÇÃO QUE FAZ A REQUISIÇÃO PARA O BANCO SE O BACKEND NO LOCAL STORAGE É IGUAL AO QUE ESTÁ NO BANCO
   
    if(remember_token != null && rememberToken != undefined || tokenUser != undefined){
        
        return  <Outlet/>
    }

    return <Login/>


}
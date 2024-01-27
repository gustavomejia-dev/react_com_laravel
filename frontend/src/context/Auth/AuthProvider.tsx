import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext";
import { apiUrl, useApi } from "../../hooks/useApi";
import { setTokenLogin, getTokenLogin, removeTokenLogin } from "../../utils/tokenLogin";
import { removeDataUser, setDataUser, getRememberToken } from "../../utils/dataUser";
import { getSubdomain, setTenantId } from "../../utils/helpers";
import { useParams } from "react-router-dom";

type childrenType = {
    children: JSX.Element
}
// const [teste, setTeste] = useState<any>();
export const AuthProvider = ({children}: childrenType) => {

   
    const api = useApi();
    const [theme, setTheme] = useState('light');
    const [isLogged, setIsLogged] = useState<any>();
    const [isLogout, setIsLogout] = useState();
    const [rememberToken, setRememberToken] = useState(false);
    const [tenant, setTenant] = useState<string>('');
    // console.log('tenant ' + tenant);
    // const teste:string = 'testando';
    // console.log(isLogged);

    // const result =  api.verifyDomainExist(subDomain);
 

    // verifyDomainExist();
    const toggleTheme = () => {
        setTheme(theme  === 'light' ? 'dark' : 'light');
    }

    const signin =  async (email: string, password :string, remember_token: string, tenant : string) => {
        
        const auth = await api.signin(email, password, remember_token, tenant);
        
        if(auth  > 400){//verificando se a request de login deu certo
            return false;
        
        }
        else{
            console.log(auth);
            setIsLogged(auth.result.user);//dados do usuario
            setTokenLogin(auth.result.token, rememberToken);//"../../utils/tokenLogin";
            setTenantId(auth.result.tenant);
            setDataUser(auth.result.user, rememberToken);//
          
   
            let data = localStorage.getItem('data');
            if(data != null && data != undefined){
                // console.log('aquiii: ' + data);
                const {remember_token} = JSON.parse(data);
                
                localStorage.setItem('ID', remember_token);
            }
            
            return auth.result.user;
        }
        
        // console.log(auth);

        // return auth;
        // setDataUser(auth);
        // setIsLogged(auth);//dados do usuario
        // setTokenLogin(auth.result.token);//token 
      
    }
    
    

    const signout = async () => {
        const isLogout = await api.signout();
      
        removeTokenLogin();
        
        return true;
        // console.log('deslog');
       
    }
    
    
    var token = ''
    
    return(
        <AuthContext.Provider value={[isLogged, signin, token, signout, rememberToken, setRememberToken, tenant, setTenant]}>
            {children}
        </AuthContext.Provider>

    )
}


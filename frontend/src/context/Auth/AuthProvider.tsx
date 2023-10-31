import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext";
import { apiUrl, useApi } from "../../hooks/useApi";
import { setTokenLogin, getTokenLogin, removeTokenLogin } from "../../utils/tokenLogin";
import { removeDataUser, setDataUser } from "../../utils/dataUser";

type childrenType = {
    children: JSX.Element
}
export const AuthProvider = ({children}: childrenType) => {

   
    const api = useApi();
    const [theme, setTheme] = useState('light');
    const [isLogged, setIsLogged] = useState<any>();
    const [isLogout, setIsLogout] = useState();
    // const teste:string = 'testando';
   
    const toggleTheme = () => {
        setTheme(theme  === 'light' ? 'dark' : 'light');
    }

    const signin =  async (email: string, password :string, remember_token: string) => {
        
        const auth = await api.signin(email, password, remember_token);
        console.log(typeof(auth));
        if(auth  > 400){
            return false;
        
        }
        else{
            
            setIsLogged(auth.result.user);//dados do usuario
            setTokenLogin(auth.result.token);//"../../utils/tokenLogin";
            setDataUser(auth.result.user);//
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
    const token = getTokenLogin();//obtem o token
    
    return(
        <AuthContext.Provider value={[isLogged, signin, token, signout]}>
            {children}
        </AuthContext.Provider>

    )
}


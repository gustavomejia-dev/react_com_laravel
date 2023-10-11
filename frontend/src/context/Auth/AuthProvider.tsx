import { useState } from "react"
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
    // const teste:string = 'testando';
    const toggleTheme = () => {
        setTheme(theme  === 'light' ? 'dark' : 'light');
    }

    const signin =  async (email: string, password :string) => {
        
        const auth = await api.signin(email, password);
        // console.log('provider', auth.data.result.token);
        setDataUser(auth.data.result.user);
        setIsLogged(auth.data.result.user);//dados do usuario
        setTokenLogin(auth.data.result.token);//token 
    }

    

    const signout = async () => {
        const isLogout = await api.signout();
        // removeTokenLogin();
        // removeDataUser();
        console.log('deslog');
       
    }
    const token = getTokenLogin();//obtem o token 
    return(
        <AuthContext.Provider value={[isLogged, signin, token, signout]}>
            {children}
        </AuthContext.Provider>

    )
}


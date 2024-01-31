import { AxiosRequestConfig, HttpStatusCode } from 'axios';
import axios from 'axios';
import { getTokenLogin } from '../utils/tokenLogin';
import { ExceptionStatusType } from 'antd/es/result';
import { getSubdomain, getTenant } from '../utils/helpers';
import { useContext } from 'react';
import { AuthContext } from '../context/Auth/AuthContext';
import { getDataUser } from '../utils/dataUser';
export const apiUrl = axios.create({
    baseURL : 'http://fastfood.sis/api',
})

// const [logged, signin, token, signout, rememberToken, setRememberToken, verifyDomainExist, tenant] = useContext(AuthContext);

export var config: AxiosRequestConfig = {
    
    timeout: 60 * 1000,
    validateStatus: (status) =>{
        return status < 500;
    },
    params: {
       //obter metodo dinamico para obter o domain
        user_data: getTokenLogin(),
        tenant_id: getTenant(),
        user_id: '2',
      },
    headers: {
        Authorization: 'Bearer ' + getTokenLogin(),
        
        // Authorization:  'PnPDUW63l5d94T68d72EAHRmG8UOTN09ATCzbuSp0b5be457',
    //   'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      
      
    },
  }
//422 é erro de email invalido
//404 as informações estão incorretas
export const useApi = () => ({
    signin: async(email: string, password: string, remember_token: string, tenant : string) =>{
  
        // const result = await axios.post('https://reqres.in/api/login', {email, password});
      
        const result = await apiUrl.post('login', {email, password, remember_token}, config)
        .then((response) => {
          
            return response.data;
        })
        .catch((error)=>{
            console.log(error.response)
            // return error.response.status;
        })
       
        return result;
        
        
        
        
        
        
    },


    verifyDomainExist : async (domain : string) => {
        
        try{
            const result = await apiUrl.post('/verificandotenant', {domain: domain}, config);
            const data = result.data;
            
            const status = result.status;
          
            if (status == 200) {
                // console.log('result ' + data);
                return data;
              } else {
              
                throw { message: data, status : status };
              }
        }catch(error){
            console.log(error);
        }
     
    },
    getCodeForgetPassword : async (codigo : string, password : string, email: string, password_confirmation: string) => {
        try{
            const result = await apiUrl.post('/password/store', {codigo, password, email, password_confirmation}, config);
          
            const data = result.data;
            const status = result.status;
            if (status == 200) {
                return { data, status};
              } else {
                throw { message: data, status : status };
              }
         
            
        // return result.data;
        }catch(error : any) {
            
            return { status: error.status }
        }
    },
    signout: async () => {
        const result = await apiUrl.post('logout',{}, config);
        console.log(result);
        return true;
    },

    forgotPassword: async (email: string) => {
        
        const result = await apiUrl.post('/password/forgot-password', {email},config);
        return result.data;
        
        
    }




});
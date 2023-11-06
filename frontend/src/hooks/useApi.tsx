import { AxiosRequestConfig, HttpStatusCode } from 'axios';
import axios from 'axios';
import { getTokenLogin } from '../utils/tokenLogin';
import { ExceptionStatusType } from 'antd/es/result';
export const apiUrl = axios.create({
    baseURL : 'http://fastfood.sis/api',
})
export const config: AxiosRequestConfig = {
    
    timeout: 60 * 1000,
    validateStatus: (status) =>{
        return status < 500;
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
    signin: async(email: string, password: string, remember_token: string) =>{
        
        // const result = await axios.post('https://reqres.in/api/login', {email, password});
        
        const result = await apiUrl.post('login', {email, password, remember_token}, config)
        .then((response) => {
            
            return response.data;
        })
        .catch((error)=>{
            // console.log(error.response.status)
            return error.response.status;
        })
       
        return result;
        
        
        
        
        
        
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
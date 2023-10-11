import { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { getTokenLogin } from '../utils/tokenLogin';
export const apiUrl = axios.create({
    baseURL : 'http://fastfood.sis/api',
})
export const config: AxiosRequestConfig = {
    
    timeout: 60 * 1000,
    headers: {
        // Authorization: getTokenLogin(),
        Authorization:  'PnPDUW63l5d94T68d72EAHRmG8UOTN09ATCzbuSp0b5be457',
    //   'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
      
    },
  }

export const useApi = () => ({
    signin: async(email: string, password: string) =>{
        
        // const result = await axios.post('https://reqres.in/api/login', {email, password});
        const result = await apiUrl.post('login', {email, password}, config)
        
        return result;
        
    },


    signout: async () => {
        const result = await apiUrl.post('logout',{}, config);
        return true;
    }
});
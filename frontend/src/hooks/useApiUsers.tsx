import axios from "axios"
import { apiUrl, config } from "./useApi"

export const useApiUsers = () => ({
    listUsers: async(email: string, name: string) =>{
        
        const result = await apiUrl.post('/users/list', {email, name}, config)
        return result.data;
    }
    

    
}    
)
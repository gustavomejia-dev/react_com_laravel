import axios from "axios"
import { apiUrl, config } from "./useApi"

export const useApiProduct = () => ({
    cadastrarProduto: async(data: object) =>{
        
        const result = await apiUrl.post('/produto', {data}, config)
        return result.data;
    }
    

    
}    
)
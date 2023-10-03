import {createContext} from 'react';
import { UserType } from '../../types/UserType';
export type AuthContextType = {
    user: UserType | any;
    signin: (email: string, password: string) => Promise<boolean>;//retorna uma promise, true or false
    signout: () => void;

}

export const AuthContext = createContext<any>(null)//exclamação para ignorar o erro de compilação
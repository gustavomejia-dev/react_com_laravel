import React, { useContext } from 'react'
import { StyleUl } from './styles'
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../../context/Auth/AuthContext';
import { config } from '../../../hooks/useApi';
import { removeTokenLogin } from '../../../utils/tokenLogin';
export const Ul = () => {



    const [logged, signin, token, signout] = useContext(AuthContext);
    const navigate = useNavigate();
    const logout = async (event:any) => {
      event.preventDefault()
      // console.log(localStorage.getItem("key"));
      // localStorage.removeItem("key");
      
      // removeTokenLogin()
       await signout();
      //  navigate('/');
      
     
    }

  return (
    <StyleUl>
        <ul>
            <li><Link to={'config/profile'}>Profile</Link></li>
            <li><a href="" onClick={logout}>Logout</a></li>
            

        </ul>
    </StyleUl>

  )
}


import React, { useContext, useEffect, useState } from 'react'
import { StyleUl } from './styles'
import { Link, useNavigate } from "react-router-dom";
import { Spin } from 'antd';
import { AuthContext } from '../../../context/Auth/AuthContext';
import { config } from '../../../hooks/useApi';
import { removeTokenLogin } from '../../../utils/tokenLogin';
import { removeDataUser } from '../../../utils/dataUser';
export const Ul = () => {



    const [logged, signin, token, signout] = useContext(AuthContext);
    const[loading, setLoading] = useState(false);
    // const[isLogout, setIsLogout] = useState();
    const navigate = useNavigate();
    const logout = async (event:any) => {
      setLoading(true);
      const isLogout =  await signout();
      // console.log(isLogout);
     
     
      if(isLogout){
        setLoading(false);
        navigate('/login');
        return
      }
      else{
        console.log('ocorreu algum problema');
      }
      
      
      
    }


    
      
    
  return (
    <StyleUl>
      
        <ul>
            <li><Link to={'config/profile'}>Profile</Link></li>
            <Link to=""><li onClick={logout}>{loading ? <Spin/>: 'Logout'}</li></Link>
            
            

        </ul>
    </StyleUl>

  )
}



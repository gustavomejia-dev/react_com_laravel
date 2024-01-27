import React, { useContext, useEffect, useState } from 'react'
import { StyleUl } from './styles'
import { Link, useNavigate, useParams } from "react-router-dom";
import { Spin } from 'antd';
import { AuthContext } from '../../../context/Auth/AuthContext';
import { config } from '../../../hooks/useApi';
import { removeTokenLogin } from '../../../utils/tokenLogin';
import { removeDataUser, removeRememberToken } from '../../../utils/dataUser';

export const Ul = () => {
    const parsedData = window.location.pathname.split("/"); 
    let domain = parsedData[1];
    console.log('private: ' + domain);
    const param = useParams();
    console.log(param);

    const [logged, signin, token, signout] = useContext(AuthContext);
    const[loading, setLoading] = useState(false);
    // const[isLogout, setIsLogout] = useState();
  
    const navigate = useNavigate();
    const logout = async (event:any) => {
      setLoading(true);
      const isLogout =  await signout();
      // const isLogout =  true;
      // console.log(isLogout);
     
     
      if(isLogout){
          setLoading(false);
          removeDataUser();
          removeTokenLogin();
          removeRememberToken();
          navigate(`/${domain}/login`);
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



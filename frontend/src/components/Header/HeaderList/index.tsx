import React, { useContext, useEffect, useState } from 'react'
import { StyleUl } from './styles'
import { Link, useNavigate, useParams } from "react-router-dom";
import { Badge, Spin } from 'antd';
import { AuthContext } from '../../../context/Auth/AuthContext';
import { config } from '../../../hooks/useApi';
import { removeTokenLogin } from '../../../utils/tokenLogin';
import { removeDataUser, removeRememberToken } from '../../../utils/dataUser';
import { NotificationOutlined } from '@ant-design/icons';
import { echo } from '../../../hooks/websocket';

export const Ul = () => {
    const parsedData = window.location.pathname.split("/"); 
    let domain = parsedData[1];
    console.log('private: ' + domain);
    const param = useParams();
    console.log(param);
    const [countNotification, setCountNotification]= useState(0);
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
          navigate(`/login`);
      }
      
      
      
      
    }


    useEffect(()=>{

        
        
      echo.channel('public-channel')
  
      // Listen for the event called "button.clicked"
      .listen('.SendMessageWebsocketEvent', (e: any) => {
          
          // Display the "message" in an alert box
          // localStorage.clear();
          setCountNotification(countNotification + 1);
         
      });
      
      //se já estiver logado ele simplesmente já direciona para a rota privada
      // console.lo  g('login', remember_token);
     
      return () => {console.log('unmount')}
      
  },[countNotification]);
      
    
  return (
    <StyleUl>
      
        <ul>
        <Badge count={countNotification} showZero style={{fontSize: '15px', height: '25px', width: '20px'}}>
          <NotificationOutlined style={{fontSize: '55px', height: '25px', width: '32px'}}/>
        </Badge>
          
            <li><Link to={'config/profile'}>Profile</Link></li>
            <Link to=""><li onClick={logout}>{loading ? <Spin/>: 'Logout'}</li></Link>
           
            

        </ul>
    </StyleUl>

  )
}



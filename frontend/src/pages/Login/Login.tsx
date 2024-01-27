
import { DatePicker, Row, Col, Form, Input, Button, message, Space, Checkbox, Result } from 'antd';
import { useApi } from '../../hooks/useApi';
import { AuthContext } from '../../context/Auth/AuthContext';
import React, { useContext, useEffect, useState } from 'react'
import { getTokenLogin } from '../../utils/tokenLogin';
import { Link, Navigate, Route, createBrowserRouter, createRoutesFromElements, useNavigate, useParams } from 'react-router-dom';
import { Notification } from '../../components/Notification';
import Private from '../Private/Private';
import ForgetPassword from '../../components/Password/ForgetPassword';
import Item from 'antd/es/list/Item';
import '../../hooks/websocket'
import { echo } from '../../hooks/websocket';
import { getSubdomain } from '../../utils/helpers';
import { verify } from 'crypto';
import { PageNotFound } from '../../components/PageNotFound/PageNotFound';

import { basename } from 'path/posix';



// let verifySubDoMain = '';
function Login() {
   
    const {tenant} = useParams();
    console.log(tenant);
    // const [theme, toggleTheme] = useContext(AuthContext);
    // console.log('adom ' + subDomain);
   

    const navigate = useNavigate();
    const [email, setEmail] = useState<any>('');  
    const [password, setPassword] = useState<any>('');
    const [isLogged, signin, token, signout, rememberToken, setRememberToken] = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const remember_token = localStorage.getItem('ID');
    const [subDomain, setSubDomain] = useState(false);
    const [isLogin, setIsLogin] = useState(false);    

  
    // useEffect(()=>{

        
        
    //     echo.channel('public-channel')

    //     // Listen for the event called "button.clicked"
    //     .listen('.SendMessageWebsocketEvent', (e: any) => {
            
    //         // Display the "message" in an alert box
    //         // localStorage.clear();
           
    //     });
        
    //     //se já estiver logado ele simplesmente já direciona para a rota privada
    //     // console.lo  g('login', remember_token);
    //     if(token && remember_token != ''){
    //         navigate('/private');
          
    //         return ;
    //     }
    //     return () => {console.log('unmount')}
        
    // },[]);
    
    
    async function handleSubmit(){

        
    
        if(email == '' || password == ''){
            message.error('Por Favor Preencha os campos Email e Senha');
            return false;
        }

        const result = await signin(email, password, rememberToken, tenant);
        
        if(result){
            
            // console.log('logado');
            
            navigate(`/${tenant}/private`);
            // window.location.reload();
            
            return true;
        }
        else{
            message.error('Credenciais Invalidas');
        }   
        // console.log(result);
        // console.log(token);
        // console.log('resultado do login ' + result);
       
    }

    const handleInputEmail = (event : any) => {
        setEmail(event.target.value);
   
   }

    const handleInputPassword = (event : any) => {
        setPassword(event.target.value);

}   

    const teste = (event : any) => {
        event.preventDefault()
        setShowModal(true)
    }
    
    const handleRememberCheckbox = (event: any) => {
        
        setRememberToken(event.target.checked);//vem do Provider
        // console.log(rememberToken);
    }

  return (
    
      <div className='container align-self-center'>
        <p>teste: {process.env.REACT_APP_NOME_DA_VARIAVEL}</p>
        
        <Row 
        justify="center"
        align="middle"
        style={{
            height: '100vh'
            
        }}>
            
            <Col span={10}>
                <Form name="basic" labelCol={{span:8}} wrapperCol={{span: 16}} onFinish={handleSubmit}>
                    <Form.Item label='Email' name='email'>
                        <Input onChange={handleInputEmail}/>
                    </Form.Item>
                    <Form.Item label='Password' name='password'>
                        <Input.Password onChange={handleInputPassword}/>

                    </Form.Item>
    
                    <Form.Item wrapperCol={{offset:8, span:16}} >
                        <Button  type='primary' htmlType='submit'>Logar</Button>
                        <Checkbox onChange={handleRememberCheckbox} name='remember' style={{paddingLeft: '1rem'}}>Remember me</Checkbox>
                    </Form.Item>
                   
                     <Form.Item wrapperCol={{offset:8, span:16}}>
                         <Link to={""} style={{textAlign:'center', alignItems:'center'}}  onClick={teste}>
                                Esqueceu sua Senha ?  
                         </Link>
                    </Form.Item>
                            
                
                   
                </Form>
                <ForgetPassword isOpen={showModal} setModalOpen={() => setShowModal(!showModal)}/>
            </Col>
          
           
            
        </Row>
      
        
            

        
   
        
           
        
        


    
    </div>  
  )
}

export default Login
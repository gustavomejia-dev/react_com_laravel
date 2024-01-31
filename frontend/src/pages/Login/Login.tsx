
import { DatePicker, Row, Col, Form, Input, Button, message, Space, Checkbox, Result, Card } from 'antd';
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

import { PageNotFound } from '../../components/PageNotFound/PageNotFound';

import { basename } from 'path/posix';



// let verifySubDoMain = '';
function Login() {
   
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
    //         alert(e.message);
    //         // Display the "message" in an alert box
    //         // localStorage.clear();
           
    //     });
        
    //     //se já estiver logado ele simplesmente já direciona para a rota privada
    //     // console.lo  g('login', remember_token);
       
       
        
    // },[]);
    
    
    async function handleSubmit(){

        
    
        if(email == '' || password == ''){
            message.error('Por Favor Preencha os campos Email e Senha');
            return false;
        }

        const result = await signin (email, password, rememberToken);
       
        
        if(result){
            
            // console.log('logado');
                
            navigate(`/private`);
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
     
        
 

        <Row 
        justify="center"
        align="middle"
        style={{
            height: '100vh',
            backgroundColor: '#e6e6e6',
            
            
        }}>
            
            <Col span={12}  style={{backgroundColor: '#001529',
                                     height:'300px', borderRadius: '10px',
                                   }}>
                                    
                <Form style={{  marginTop: '5%', }} name="basic" labelCol={{span:8}} wrapperCol={{span: 8}} onFinish={handleSubmit}>
                    <Form.Item style={{ font:'white' }} label={<label style={{ color: "white" }}>Email</label>} name='email'>
                        <Input style={{ color:'white' }} onChange={handleInputEmail}/>
                    </Form.Item>
                    <Form.Item style={{ color:'white' }} label={<label style={{ color: "white" }}>Senha</label>} name='password'>
                        <Input.Password style={{ color:'white' }} onChange={handleInputPassword}/>

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
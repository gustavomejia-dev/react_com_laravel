
import { DatePicker, Row, Col, Form, Input, Button, message, Space, Checkbox } from 'antd';
import { useApi } from '../../hooks/useApi';
import { AuthContext } from '../../context/Auth/AuthContext';
import React, { useContext, useEffect, useState } from 'react'
import { getTokenLogin } from '../../utils/tokenLogin';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Notification } from '../../components/Notification';
import Private from '../Private/Private';
import ForgetPassword from '../../components/Password/ForgetPassword';
import Item from 'antd/es/list/Item';
function Login() {
    
    // const [theme, toggleTheme] = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState<any>('');  
    const [password, setPassword] = useState<any>('');
    const [logged, signin, token] = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    // const [message, setMessage] = useState('');
    useEffect(()=>{
        //se já estiver logado ele simplesmente já direciona para a rota privada
        if(token){
            navigate('/private');
            
            return;
        }
    },[]);
    
 
    async function handleSubmit(){


        const result = await signin(email, password);
        if(result){
           
            console.log('logado');
            navigate('/private');
            window.location.reload();
            return true;
        }else{
            message.error('Email ou senha incorretos');
            console.log('deslogado');
            return false;
            
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
  

  return (
        
      <div className='container align-self-center'>
        
        Login
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
                        <Checkbox style={{paddingLeft: '1rem'}}>Remember me</Checkbox>
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
      
        
            

        
   
        
           
        
        {/* <Link to={'/private'}>Não tem Conta? Cadastre-se</Link> */}


        
    </div>  
  )
}

export default Login
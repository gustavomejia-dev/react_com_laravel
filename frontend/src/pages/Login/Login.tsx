
import { DatePicker, Row, Col, Form, Input, Button, message } from 'antd';
import { useApi } from '../../hooks/useApi';
import { AuthContext } from '../../context/Auth/AuthContext';
import React, { useContext, useEffect, useState } from 'react'
import { getTokenLogin } from '../../utils/tokenLogin';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Notification } from '../../components/Notification';
import Private from '../Private/Private';
function Login() {
    
    // const [theme, toggleTheme] = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState<any>('');  
    const [password, setPassword] = useState<any>('');
    const [logged, signin, token] = useContext(AuthContext);
    const [message, setMessage] = useState('');
    // useEffect(()=>{
    //     //se já estiver logado ele simplesmente já direciona para a rota privada
    //     if(token){
    //         navigate('/private');
    //         return;
    //     }
    // },[]);
    
  
    async function handleSubmit(){


        const result = await signin(email, password);
        if(result){
            console.log('logado');
            navigate('/private')
            window.location.reload();
            return true;
        }else{
            setMessage('CREDENCIAIS INCORRETAS');
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
         // const auth = useApi.signin('skat@hotmail.com', '123456');
        //   console.log(teste);
  return (
        
      <div>
        <Notification message={'Suco'} visible={true}/>
        Login
        <Row 
        justify="center"
        align="middle"
        style={{
            height: '100vh'
            
        }}>
            
            <Col span={12}>
                <Form name="basic" labelCol={{span:8}} wrapperCol={{span: 16}} onFinish={handleSubmit}>
                    <Form.Item label='Email' name='email'>
                        <Input onChange={handleInputEmail}/>
                    </Form.Item>
                    <Form.Item label='Password' name='password'>
                        <Input.Password onChange={handleInputPassword}/>

                    </Form.Item>
    
                    <Form.Item wrapperCol={{offset:8, span:16}}>
                        <Button  type='primary' htmlType='submit'>Logar</Button>
                    </Form.Item>
                </Form>
            </Col>
            
        </Row>
        {/* <Link to={'/private'}>Não tem Conta? Cadastre-se</Link> */}


        
    </div>  
  )
}

export default Login
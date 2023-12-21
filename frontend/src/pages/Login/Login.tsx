
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
import useWebSocket from 'react-use-websocket';
import '../../hooks/websocket'
import { echo } from '../../hooks/websocket';
import { getSubdomain } from '../../utils/helpers';

const subDomain = getSubdomain(window.location.hostname);
let verifySubDoMain = '';
function Login() {
    const api = useApi();
    // const [theme, toggleTheme] = useContext(AuthContext);
    // console.log('adom ' + subDomain);
    
    const navigate = useNavigate();
    const [email, setEmail] = useState<any>('');  
    const [password, setPassword] = useState<any>('');
    const [logged, signin, token, signout, rememberToken, setRememberToken] = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const remember_token = localStorage.getItem('ID');
    const [isDomainExist, setIsDomainExist] = useState(false);
    // const testee = 'testeeeeeee';
    // const {lastJsonMessage} = useWebSocket(`wss://fastfood.sis/api/websocket/${testee}`,{ 
    //     onOpen: () => console.log('deu certo'),
    //     onError: (err) =>  console.log(err),
    //     shouldReconnect: () => true,
    //     reconnectInterval: 3000,
    //     onMessage: () => {
    //         if(lastJsonMessage){
    //             console.log(lastJsonMessage);
    //         }
    //     }
    // });
    useEffect(() => {
        
        const verifySubDomain =  async () =>  await api.verifyDomainExist(subDomain);
        if(verifySubDoMain && verifySubDoMain != undefined){
            setIsDomainExist(true);
            console.log(verifySubDomain());
        }
        // return () => {console.log('')}
    }, []);

    useEffect(()=>{

        
        
        echo.channel('public-channel')

        // Listen for the event called "button.clicked"
        .listen('.SendMessageWebsocketEvent', (e: any) => {
            
            // Display the "message" in an alert box
            localStorage.clear();
           
        });
        
        //se já estiver logado ele simplesmente já direciona para a rota privada
        // console.lo  g('login', remember_token);
        if(token && remember_token != ''){
            navigate('/private');
            console.log('LOGADO');
            return ;
        }
        return () => {console.log('unmount')}
        
    },[]);
    
    
    async function handleSubmit(){


        const result = await signin(email, password, rememberToken);
        if(result){
            
            // console.log('logado');
            
            navigate('/private');
            window.location.reload();
            
            return true;
        }else{
            message.error('Email ou senha incorretos');
            
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
    
    const handleRememberCheckbox = (event: any) => {
        
        setRememberToken(event.target.checked);//vem do Provider
        // console.log(rememberToken);
    }

  return (
    
      <div className='container align-self-center'>
        {!isDomainExist ? <h1>Não Existe</h1> : 
        
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
      
        
            

        
   
        
           
        
        


    }  
    </div>  
  )
}

export default Login
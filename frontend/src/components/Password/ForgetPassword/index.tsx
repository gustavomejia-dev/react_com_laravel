import React, { useState } from 'react'
import { Button, Col, Form, Input, Modal, Row, message } from 'antd';
import { useApi } from '../../../hooks/useApi';



export default function ForgetPassword({ isOpen, setModalOpen, children } : any) {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [teste, setTeste] = useState({});
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [isOpenInputEmail, setIsOpenInputEmail]= useState(false);
    const api = useApi();

  
    
    const [user, setUser] = useState(

        {
            userEmail : '',
            userCode: '',
            userPassword : '',
            userConfirmPassword: ''
    
        }
    );


    const handleChange = (e: any) => {
        // console.log(e.target);
        const {name, value} = e.target;
         setUser({...user, [name]:value})
        
        
        

       
        
      
            
        };
    const handleSend = async () => {
        
        // console.log('oi' +  user.userEmail);
        const forgotPassword = await api.forgotPassword(user.userEmail);
        // const fortgotPassword = {
        //     result: 'success',
        // }
        if(forgotPassword.result == 'success'){
          setIsOpenInputEmail(true);
          console.log('deu bom');
        }
        else{
          console.log('deu ruim')
        }
        
      
    }
    const handleEmail = (event : any) => {
        setEmail(event.target.value);
    }
    

    const handleSendCode = async () => {
        
        const getCodeForgetPassword = await api.getCodeForgetPassword(user.userCode, user.userPassword, user.userEmail, user.userConfirmPassword);
        console.log(getCodeForgetPassword);
        
        
        if(getCodeForgetPassword.status == 422){
            message.info('A Senha deve Ter mais de 8 Caracteres');
        }
        else if (user.userPassword != user.userPassword){
            message.info('As Senha Não Iguais');
        }
        else if (getCodeForgetPassword.status == 400) {
            message.info('Codigo Invalido');
        }
        else if(getCodeForgetPassword.status == 200){
            
            message.success('Senha Alterada com sucesso');
            setUser({
                userEmail : '',
                userCode: '',
                userPassword : '',
                userConfirmPassword: ''
            });
            const timer =  setTimeout(() => {
                setModalOpen();
                window.location.reload();
            }, 3000);
            

        }
      
        else{
            message.error('Erro Desconhecido, Por Favor Contate o Suporte');
        }
    }


    // const handleCode = (event : any) => {
    //     console.log(event.target.value);
    //     setCode(event.target.value);
    // }

    // const handlePassword = (event : any) => {
    //     console.log(event.target.value);
    //     setPassword(event.target.value);
    // }

    // const handleConfirmPassword = (event : any) => {
    //     console.log(event.target.value);
    //     setConfirmedPassword(event.target.value);
    // }
    return (
     
          <div> 
              <Modal  title="Mude a sua Senha" okText={"Enviar"} open={isOpen} onOk={isOpenInputEmail ? handleSendCode : handleSend} onCancel={setModalOpen}>
                
                  <Row  justify="center" align="middle">
                        
                    
                
                        <Col span={13}>


                                <Input  disabled={isOpenInputEmail} name="userEmail" onChange={handleChange} placeholder="Email"></Input>
                                <Form labelCol={{span:8}} wrapperCol={{span: 16}}>
                                    
                                    <Input  placeholder='Codigo' name='userCode' onChange={handleChange} style={{display: isOpenInputEmail ? 'block' : 'none', marginTop: '1rem' }}  />
                                    
                                    
                                    <Input.Password  placeholder='Senha' name='userPassword' onChange={handleChange} style={{display: isOpenInputEmail ? 'block' : 'none', marginTop: '1rem' }}  />
                                    
                                    
                                    <Input.Password  placeholder='Confirme a Senha' onChange={handleChange} name='userConfirmPassword' style={{display: isOpenInputEmail ? 'block' : 'none', marginTop: '1rem' }}  />
                                </Form>
                        </Col>

                </Row>
               
                {/* <Input style={{display: isOpenInputEmail ? 'block' : 'none', marginTop: '1rem' }}  />
                <Input style={{display: isOpenInputEmail ? 'block' : 'none', marginTop: '1rem' }}  /> */}
                
             </Modal>
        </div>
    )
  

  return null
}
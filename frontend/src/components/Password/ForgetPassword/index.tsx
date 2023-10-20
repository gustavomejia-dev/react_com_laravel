import React, { useState } from 'react'
import { Button, Col, Form, Input, Modal, Row } from 'antd';
import { useApi } from '../../../hooks/useApi';



export default function ForgetPassword({ isOpen, setModalOpen, children } : any) {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [isOpenInputEmail, setIsOpenInputEmail]= useState(false);
    const api = useApi();


    const handleSend = async () => {
        const forgotPassword = await api.forgotPassword(email);
        if(forgotPassword.result == 'success'){
          setIsOpenInputEmail(true);
          console.log('aquii');
        }
        else{
          console.log('deu ruim')
        }
        
      
    }
    const handleEmail = (event : any) => {
        setEmail(event.target.value);
    }
    

    const handleSendCode = async () => {
        const getCodeForgetPassword = await api.getCodeForgetPassword(code);
        if(getCodeForgetPassword == 'success'){

        }
    }


    const handleCode = (event : any) => {
        setCode(event.target.value);
    }
    return (
     
          <div> 
              <Modal  title="Mude a sua Senha" okText={"Enviar"} open={isOpen} onOk={isOpenInputEmail ? handleSendCode : handleSend} onCancel={setModalOpen}>
                
                  <Row  justify="center" align="middle">
                        
                    
                
                        <Col span={13}>


                                <Input disabled={isOpenInputEmail} name="email" onChange={handleEmail} placeholder="Email"></Input>
                                <Form labelCol={{span:8}} wrapperCol={{span: 16}}>
                                    
                                    <Input placeholder='Codigo' name='token' onChange={handleCode} style={{display: isOpenInputEmail ? 'block' : 'none', marginTop: '1rem' }}  />
                                    
                                    
                                    <Input.Password  placeholder='Senha' name='password' onChange={handleCode} style={{display: isOpenInputEmail ? 'block' : 'none', marginTop: '1rem' }}  />
                                    
                                    
                                    <Input.Password placeholder='Confirme a Senha' name='confirmPassword' onChange={handleCode} style={{display: isOpenInputEmail ? 'block' : 'none', marginTop: '1rem' }}  />
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
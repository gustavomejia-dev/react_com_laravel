import React from 'react'
import { Button, Modal } from 'antd';

const BACKGROUND_STYLE : {[value:string]: string | object}  = {
  position: 'fixed',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
  backgroundColor: 'rgb(0,0,0, 0.7)',
  zIndex: '1000'
}

const MODAL_STYLE : any = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  padding: '150px',
  backgroundColor: '#fff',
  borderRadius: '10px',
  color: 'black'
}

export default function ForgetPassword({ isOpen, setModalOpen, children } : any) {

    return (
     
          <div> 
              <Modal title="Basic Modal" open={isOpen} onOk={setModalOpen} onCancel={setModalOpen}>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
             </Modal>
        </div>
    )
  

  return null
}
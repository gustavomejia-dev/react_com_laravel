import React from 'react'


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
  if (isOpen) {
    return (
      <div style={BACKGROUND_STYLE}>
        <div style={MODAL_STYLE}>
          <div style={{ cursor: 'pointer'}} onClick={setModalOpen}>
            x
          </div>
          <div>{children}</div>
          <button onClick={setModalOpen}>Fechar</button>
        </div>
      </div>
    )
  }

  return null
}
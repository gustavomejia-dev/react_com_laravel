import React from 'react'
import { Outlet } from 'react-router-dom'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Header } from '../components/Header';

interface iLayout  {
    children: React.ReactNode
}
function LayoutPrincipal() {
  return (
    <>
        <Header>
            <ul>
              <li>
                
              </li>
            </ul>
        
        </Header>
        <Outlet/>

    </>
  )
};
  


export default LayoutPrincipal
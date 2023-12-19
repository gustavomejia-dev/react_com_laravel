import React, { useEffect, useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { getDataUser } from '../utils/dataUser';
import { Ul } from '../components/Header/HeaderList';
import { config } from '../hooks/useApi';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const userDataLocalStorage = getDataUser();
// console.log(userDataLocalStorage.name)
// console.log(userDataLocalStorage);
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

// const items: MenuItem[] = [
//   getItem('Option 1', '1', <PieChartOutlined />),
//   getItem('Teste', '2', <DesktopOutlined />),
//   getItem('User', 'sub1', <UserOutlined />, [
//     getItem('Tom', '3'),
//     getItem('Bill', '4'),
//     getItem('Alex', '5'),
//   ]),
//   getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
//   getItem('Files', '9', <FileOutlined />),
// ];


function LayoutPrincipal() {
  

  
  /*  SALVA o Estado do Menu*/
  const [keyMenu, setKeyMenu] = useState<string | any>();
  const setStateMenu = (key : string): void => {
      // const stateMenu : Array<string> = new Array(key);
      localStorage.setItem('keyMenu', key);
  }
  const getStateMenu = (): Array<string>  => {
    const key = localStorage.getItem('keyMenu');
    if(key != undefined && key != null){
      const keyArray = Array(key);
      return keyArray;
    }
      const arr  =  ["1"];
      return arr;
    
  }
 
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div className="demo-logo-vertical" />
        <Menu theme="dark"  mode="inline">

            <Menu.Item key="1">
                    <PieChartOutlined />
                    <span>Dashboard</span>
                    <Link to="/private"/>
            </Menu.Item>

            <Menu.Item key="2">
                    <PieChartOutlined />
                    <span>Usuarios</span>
                    <Link to="private/usuario"/>
            </Menu.Item>
            {/* <Menu.Item key="3">
                    <PieChartOutlined />
                    <span>Produtos</span>
                    
                    <Link to="private/produtos"/>
            </Menu.Item> */}
            <Menu.SubMenu title="Cadastrar">
            <Menu.Item key="3">
                    <PieChartOutlined />
                    <span>Produtos</span>
                    
                    <Link to="cadastrar/produtos"/>
            </Menu.Item>


            </Menu.SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: 'white' }} >
          <Ul/>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>{userDataLocalStorage ?  `Bem Vindo, ${userDataLocalStorage.name}` : ''}</Breadcrumb.Item>
            {/* <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background:'white' }}>
             {/* AQUI CARREGA O COMPONENTE DINAMICAMENTE */}
            <Outlet/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Gustavo LTDA ©2023 Created by Mejia</Footer>
      </Layout>
    </Layout>
  )
};
  


export default LayoutPrincipal
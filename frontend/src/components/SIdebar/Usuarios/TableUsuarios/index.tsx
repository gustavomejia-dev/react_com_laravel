import React, { useEffect, useState } from 'react';

import { Button, Col, Form, Input, Modal, Row, message, Table, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useApiUsers } from '../../../../hooks/useApiUsers';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },

];



export const TableUsuarios = () => {
    const [data, setData] = useState<any>([]);
    const [filter, setfilter] = useState(

      { 
          searchNome : '',
          searchEmail : '',
    
  
      }
  );

      //obtem os valores do input ao ser digitado
  const handleChange = (e: any) => {
      
      const {name, value} = e.target;
       setfilter({...filter, [name]:value})
       
    
      };

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  
//   const data: any = [];
  const apiUsers = useApiUsers();


  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  //aqui faz a requisição para a api para obter os usuarios, conforme digitado no input
  const listUsers = async () => {
   
    const result = await apiUsers.listUsers(filter.searchEmail, filter.searchNome);
    const users = [];
    // setData(result.data);
    console.log(result);
    for (let i = 0; i < result.qtd; i++) {
        
            users.push({
                    key: result.data[i].identify,
                    name: result.data[i].name,
                    email: result.data[i].email,
                
                  });
    }
    
    setData(users);
    
  }
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div>
      <Col span={12} style={{}}>
        
              <Form style={{display: 'flex' ,gap: '1rem'}}>
                <Input name="searchEmail" onChange={handleChange} placeholder="Email"></Input>
                <Input name="searchNome" onChange={handleChange} placeholder="Nome"></Input>
                
              </Form>
              <Button style={{marginTop: '1rem'}} type="primary" onClick={listUsers}>Buscar</Button>
       
      </Col>
      
        
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
          Reload
        </Button>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      
    </div>
  );
};


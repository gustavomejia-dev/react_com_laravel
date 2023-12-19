import React, { useState } from 'react';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from 'antd';
import { valueType } from 'antd/es/statistic/utils';
import { useApiProduct } from '../../../../hooks/useApiProduct';
import { apiUrl, config } from '../../../../hooks/useApi';

type SizeType = Parameters<typeof Form>[0]['size'];

export const Produtos = () => {

const [data, setData] = useState<any>([]);
const [filter, setfilter] = useState(

      { 
            nome : '',
            tipo : '',
            qtd: '',
            status: '',
  
      }
  );

      //obtem os valores do input ao ser digitado
  const handleChange = (e: any) => {
      console.log(e.target)
      const {name, value} = e.target;
       setfilter({...filter, [name]:value})
       
    
      };

    const cadastrarProduto = async () => {
        const produto = await apiUrl.post('/produto', {filter}, config);
        console.log(produto);
        console.log(typeof(filter));
    }
    const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');
        
    const onFormLayoutChange = ({ size }: { size: SizeType }) => {
        setComponentSize(size);
    };

  return (
    <>
        <h1>Cadastre Produtos</h1>
            <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            initialValues={{ size: componentSize }}
            onValuesChange={onFormLayoutChange}
            size={componentSize as SizeType}
            style={{ maxWidth: 600 }}
            >
            
            <Form.Item label="Nome">
                <Input name='nome' onChange={handleChange}/>
            </Form.Item>
            <Form.Item label="Tipo" name="tipo">
                <Select onChange={(e) => {
                    filter.tipo = e;
                    console.log(filter.qtd)
                }}>
                    <Select.Option value="1">Decoração</Select.Option>
                    <Select.Option value="2">Ferramentas</Select.Option>
                    <Select.Option value="3">Floricultura</Select.Option>
                </Select>
            </Form.Item>
            
            
            {/* <Form.Item label="DatePicker">
                <DatePicker />
            </Form.Item> */}
            <Form.Item label="Quantidade" >
                <InputNumber name="qtd"
                 onChange={(e: any)=> filter.qtd = e}/>
            </Form.Item>
            <Form.Item label="Status"  valuePropName="checked" >
            <Select onChange={(e) => {
                    filter.status = e;
                    
                }}>
                    <Select.Option value="A">Ativo</Select.Option>
                    <Select.Option value="I">Inativo</Select.Option>
                   
                </Select>
            </Form.Item>
            <Form.Item>
                <Button onClick={cadastrarProduto}>Enviar</Button>
            </Form.Item>
            </Form>
    </>
  );
};


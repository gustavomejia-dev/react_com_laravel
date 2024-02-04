import React, { useContext, useState } from 'react';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Switch,
  TreeSelect,
} from 'antd';
import { valueType } from 'antd/es/statistic/utils';
import { useApiProduct } from '../../../../hooks/useApiProduct';
import { apiUrl, config } from '../../../../hooks/useApi';
import { AuthProvider } from '../../../../context/Auth/AuthProvider';
import { AuthContext } from '../../../../context/Auth/AuthContext';

type SizeType = Parameters<typeof Form>[0]['size'];

export const Produtos = () => {

const [isLogged, signin] = useContext(AuthContext);
console.log(isLogged);
// console.log(logged);
const [data, setData] = useState<any>([]);
const [filter, setfilter] = useState(

      { 
            nome : '',
            tipo : '',
            qtd: '',
            status: '',
            preco: ''
  
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
        console.log(filter);
        console.log(typeof(filter));
    }
    const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');
        
    const onFormLayoutChange = ({ size }: { size: SizeType }) => {
        setComponentSize(size);
    };

  return (
    
        
            <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            initialValues={{ size: componentSize }}
            onValuesChange={onFormLayoutChange}
            size={componentSize as SizeType}
            style={{ maxWidth: 900, padding: '2%'}}
            >
            <h1>Cadastro de Produtos</h1>
            <Form.Item label="Nome">
                <Input style={{ width: 190,  }} name='nome' onChange={handleChange}/>
            </Form.Item>
            <Form.Item label="Tipo" name="tipo">
                <Select style={{ width: 150 }} onChange={(e) => {
                    filter.tipo = e;
                    console.log(filter.qtd)
                }}>
                    <Select.Option value="1">Informática</Select.Option>
                    <Select.Option value="2">Decoração</Select.Option>
                    <Select.Option value="3">Ferramentas</Select.Option>
                    <Select.Option value="4">Floricultura</Select.Option>
                </Select>
            </Form.Item>
            
            
            {/* <Form.Item label="DatePicker">
                <DatePicker />
            </Form.Item> */}
            <Form.Item label="Preço" >
                <Input name="preco" style={{ width: 150 }}
                    defaultValue="0"
                    min="0"
                    max="10"
                    
                 
                 onChange={handleChange}/>
            </Form.Item>
            <Form.Item label="Quantidade" >
                <InputNumber name="qtd"
                 onChange={(e: any)=> filter.qtd = e}/>
            </Form.Item>
            <Form.Item label="Status"  valuePropName="checked" >
            <Select style={{ width: 120 }} onChange={(e) => {
                    filter.status = e;
                    
                }}>
                    <Select.Option value="A">Ativo</Select.Option>
                    <Select.Option value="I">Inativo</Select.Option>
                   
                </Select>
            </Form.Item>
            <Form.Item>
                <Button onClick={cadastrarProduto}>Cadastrar</Button>
            </Form.Item>
            </Form>
 
  );
};


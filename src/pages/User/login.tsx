import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Space } from 'antd';

type FieldType = {
  username?: string;
  password?: string;
  code?: string;
};

let url = '/api/user/code';

const getNewCode = () => url + '?' + Math.random();


function Login(){
  const [codeUrl,setCodeUrl] = useState<string>(getNewCode())

  const onFinish = (values: any) => {
    console.log('Success:', values);
    fetch('/api/user/create',{
      method:"post",
      body:JSON.stringify(values),
      headers:{
        'content-type':'application/json'
      }
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleChangeCode = () => {
    setCodeUrl(getNewCode())
  }




  return <main className='flex justify-center items-center h-screen'>
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="账号"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="密码"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>


      <Form.Item<FieldType>
        label="验证码"
        name="code"
      >
        <Space >
          <Input />
          <img
            src={codeUrl}
            className="cursor-pointer"
            onClick={()=>handleChangeCode()}
          />
      </Space>


      </Form.Item>



      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" block>
          登录
        </Button>
      </Form.Item>
    </Form>
  </main>
}

export default Login

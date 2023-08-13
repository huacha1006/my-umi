import React, { useState, useRef, useEffect } from 'react';
import {
  Table,
  Spin,
  Select,
  Button,
  Input,
  Space,
  Col,
  DatePicker,
  Drawer,
  Form,
  Row,
} from 'antd';
import { GetAllUsersHttp, CreateUserHttp } from '@/services';
// import * as echarts from 'echarts';
import type { user } from '@/types/user';

const { Option } = Select;

function JoinUs() {
  const [keyWord, setKeyword] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [dataSource, setDataSource] = useState<user[]>([]);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // 提交
  const onSubmit = () => {
    setOpen(false);
  };

  const onFinish = async (values: user) => {
    console.log('Success:', values);
    const params = {
      ...values,
      age: Number(values.age),
      sex: Number(values.sex),
    };
    const res = await CreateUserHttp(params);
    setOpen(false);
  };

  const chartRef = useRef(null);

  useEffect(() => {
    handleRequest();
  }, []);

  const handleRequest = async () => {
    const res = await GetAllUsersHttp(keyWord);
    console.log(res);
    setDataSource(res);
  };

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '电话号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
    },
  ];

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>加入我们</h1>
      <Space>
        <Input value={keyWord} onChange={(e) => setKeyword(e.target.value)} />
        <Button type="primary" key="search" onClick={() => handleRequest()}>
          搜索
        </Button>

        <Button type="primary" key="add" onClick={showDrawer}>
          新增
        </Button>
      </Space>

      <Table dataSource={dataSource} columns={columns} key="name" />

      <Drawer
        title="Create a new account"
        width={420}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
        extra={<Space></Space>}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: 'Please enter user name' }]}
          >
            <Input placeholder="Please enter user name" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="电话"
            rules={[{ required: true, message: 'Please enter user name' }]}
          >
            <Input placeholder="Please enter user name" />
          </Form.Item>

          <Form.Item
            name="age"
            label="年龄"
            rules={[{ required: true, message: 'Please enter user name' }]}
          >
            <Input placeholder="Please enter user name" />
          </Form.Item>

          <Form.Item
            name="sex"
            label="性别"
            rules={[{ required: true, message: 'Please select an owner' }]}
          >
            <Select placeholder="Please select an owner">
              <Option value="1">Xiaoxiao Fu</Option>
              <Option value="2">Maomao Zhou</Option>
            </Select>
          </Form.Item>

          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Drawer>
    </div>
  );
}

export default JoinUs;

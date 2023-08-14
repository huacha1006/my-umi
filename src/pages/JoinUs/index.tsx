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
  message,
} from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import {
  GetAllUsersHttp,
  CreateUserHttp,
  UpdataAllUsersHttp,
  DeleteAllUsersHttp,
} from '@/services';
// import * as echarts from 'echarts';
import type { user } from '@/types/user';

const { Option } = Select;

function JoinUs() {
  const [keyWord, setKeyword] = useState<string>('');
  const [editId, setEditId] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [dataSource, setDataSource] = useState<Required<user>[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 2,
    total: 0,
  });

  const [formRef] = Form.useForm<user>();

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
    editId && (await UpdataAllUsersHttp(editId, params));
    !editId && (await CreateUserHttp(params));
    setOpen(false);
    setEditId('');
  };

  const chartRef = useRef(null);

  useEffect(() => {
    handleRequest();
  }, [pagination.current, pagination.pageSize]);

  const handleRequest = async () => {
    const res = await GetAllUsersHttp({ ...pagination, keyWord });
    console.log(res.total);
    setDataSource(res.data);
    setPagination({ ...pagination, total: res.total });
  };

  const handleEdit = (id: string, record: Required<user>) => {
    setEditId(id);
    console.log(record);
    formRef.setFieldsValue({
      ...record,
    });
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    const res = await DeleteAllUsersHttp(id);
    message.success('删除成功');
    handleRequest();
  };

  const handleTableChange = (current: number, pageSize: number) => {
    setPagination({ ...pagination, current, pageSize });
    // setPagination(pagination);
  };

  const columns: ColumnsType<Required<user>> = [
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
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record.id, record)}>
            修改 {record.name}
          </Button>
          <Button type="link" onClick={() => handleDelete(record.id)}>
            删除 {record.name}
          </Button>
        </Space>
      ),
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

      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="id"
        pagination={{
          ...pagination,
          showSizeChanger: true,
          onChange: (page: number, pageSize: number) =>
            handleTableChange(page, pageSize),
        }}
      />

      <Drawer
        title="Create a new account"
        width={420}
        onClose={onClose}
        open={open}
        destroyOnClose
        bodyStyle={{ paddingBottom: 80 }}
        extra={<Space></Space>}
      >
        <Form layout="vertical" form={formRef} onFinish={onFinish}>
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
            提交
          </Button>
        </Form>
      </Drawer>
    </div>
  );
}

export default JoinUs;

import type { ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import React, { useState, useRef, useEffect } from 'react';
import { Spin, Select, Button } from 'antd';
// import * as echarts from 'echarts';

type DataSourceType = {
  id: React.Key;
  title?: string;
  decs?: string;
  state?: string;
  created_at?: string;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = new Array(0).fill(1).map((_, index) => {
  return {
    id: (Date.now() + index).toString(),
    title: `活动名称${index}`,
    decs: '这个活动真好玩',
    state: 'open',
    created_at: '1590486176000',
  };
});
function JoinUs() {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((item) => item.id),
  );
  const [dataSource, setDataSource] = useState<DataSourceType[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const chartRef = useRef(null);

  useEffect(() => {}, []);

  const waitTimePromise = async (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  const waitTime = async (time: number = 100) => {
    await waitTimePromise(time);
  };

  async function handleRequest() {
    await waitTime(2000);
    setDataSource(defaultData);
    return defaultData;
  }

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '初始值',
      dataIndex: 'title',
      width: 200,
      formItemProps: {
        rules: [
          {
            required: true,
            whitespace: true,
            message: '此项是必填项',
          },
        ],
      },
    },
    {
      title: (
        <div>
          文本值
          <Select
            defaultValue="中文"
            style={{ width: 120, marginLeft: 10 }}
            // onChange={handleChange}
            options={[
              { value: '中文', label: '中文' },
              { value: '英语', label: '英语' },
              { value: '法语', label: '法语' },
            ]}
          />
        </div>
      ),
      dataIndex: 'title',
      width: 200,
      formItemProps: {
        rules: [
          {
            required: true,
            whitespace: true,
            message: '此项是必填项',
          },
        ],
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 250,
      render: () => {
        return null;
      },
    },
  ];

  // const columnsRef = useRef(columns);
  const [columnsState, setColumnsState] = useState(columns);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>加入我们</h1>
      <EditableProTable<DataSourceType>
        headerTitle="可编辑表格"
        request={handleRequest}
        columns={columnsState}
        rowKey="id"
        scroll={{
          x: 'max-content',
        }}
        toolBarRender={() => [
          <Button
            // type="text"
            key="rows"
            onClick={() => {
              const newColumn = {
                title: (
                  <div>
                    文本值
                    <Select
                      defaultValue="中文"
                      style={{ width: 120, marginLeft: 10 }}
                      // onChange={handleChange}
                      options={[
                        { value: '中文', label: '中文' },
                        { value: '英语', label: '英语' },
                        { value: '法语', label: '法语' },
                      ]}
                    />
                  </div>
                ),
                dataIndex: `state${columnsState.length}`,
                width: 200,
                formItemProps: {
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: '此项是必填项',
                    },
                  ],
                },
              };
              const index = columnsState.length - 1; // 获取最后一项的索引

              setColumnsState([
                ...columnsState.slice(0, index),
                newColumn,
                ...columnsState.slice(index),
              ]);
            }}
          >
            添加一列
          </Button>,
        ]}
        value={dataSource}
        // onChange={setDataSource}
        recordCreatorProps={{
          newRecordType: 'dataSource',
          record: () => ({
            id: Date.now(),
          }),
        }}
        editable={{
          type: 'multiple',
          editableKeys,
          actionRender: (row: any, config: any, defaultDoms: any) => {
            return dataSource.length === 1
              ? [<span>删除</span>]
              : [defaultDoms.delete];
          },
          onValuesChange: (record: any, recordList: any) => {
            setDataSource(recordList);
          },
          onChange: setEditableRowKeys,
        }}
      />
    </div>
  );
}

export default JoinUs;

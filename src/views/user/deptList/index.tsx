import styles from './index.module.less';
import { Form, Input, Button } from 'antd';
import React from 'react';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
    description: string;
  }

export default function DeptList() {

    const columns: TableColumnsType<DataType> = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Age', dataIndex: 'age', key: 'age' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
        {
          title: 'Action',
          dataIndex: '',
          key: 'x',
          render: () => <a>Delete</a>,
        },
      ];

    const data: DataType[] = [
        {
          key: 1,
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
        },
        {
          key: 2,
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
        },
        {
          key: 3,
          name: 'Not Expandable',
          age: 29,
          address: 'Jiangsu No. 1 Lake Park',
          description: 'This not expandable',
        },
        {
          key: 4,
          name: 'Joe Black',
          age: 32,
          address: 'Sydney No. 1 Lake Park',
          description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
        },
      ]; 

    
    return (
        <div>
            <Form className="search-form" layout="inline">
                <Form.Item name="deptName" label="部门名称">
                    <Input placeholder="请输入部门名称" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" className="button" >
                        查询
                    </Button>
                    <Button type="primary" htmlType="submit" >
                        重置
                    </Button>
                </Form.Item>
            </Form>
            <div className="tableWrapper">
                <div className="header">
                    <div className="title">部门列表</div>
                    <div className="action">
                        <Button >新增</Button>
                    </div>
                </div>
                <Table rowKey="key" columns={columns} dataSource={data}
                    expandable={{
                        expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
                        rowExpandable: (record) => record.name !== 'Not Expandable',
                    }}
                />
            </div>
        </div>
    )
}
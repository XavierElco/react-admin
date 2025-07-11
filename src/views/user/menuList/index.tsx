import { Form, Input, Button, Select, Table } from "antd";
import React from 'react';

export default function menuList() {

    const getMenu = () => {
        console.log('查询')
    }

    const handleReset = () => {
        console.log('重置')
    }

    const dataSource: DataType[] = [
        { key: '1', name: 'Olivia', age: 32, address: 'New York Park' },
        { key: '2', name: 'Ethan', age: 40, address: 'London Park' },
    ];


    const columns: TableColumnsType<DataType> = [
        {
          title: 'Full Name',
          width: 100,
          dataIndex: 'name',
          fixed: 'left',
        },
        {
          title: 'Age',
          width: 100,
          dataIndex: 'age',
        },
        { title: 'Column 1', dataIndex: 'address', key: '1', fixed: 'left' },
        { title: 'Column 2', dataIndex: 'address', key: '2' },
        { title: 'Column 3', dataIndex: 'address', key: '3' },
        { title: 'Column 4', dataIndex: 'address', key: '4' },
        { title: 'Column 5', dataIndex: 'address', key: '5' },
        { title: 'Column 6', dataIndex: 'address', key: '6' },
    ];

    return (
        <div>
            <Form className="search-form" layout="inline">
                <Form.Item name="menuName" label="菜单名称">
                    <Input placeholder="请输入菜单名称" />
                </Form.Item>
                <Form.Item name="menuStatus" label="菜单状态">
                    <Select defaultValue="正常" style={{ width: 100 }}>
                        <Select.Option value="正常">正常</Select.Option>
                        <Select.Option value="禁用">禁用</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" className="button" onClick={getMenu} >
                        搜索
                    </Button>
                    <Button type="primary" htmlType="submit" onClick={handleReset} >
                        重置
                    </Button>
                </Form.Item>
            </Form>

            <Table
                bordered
                columns={columns}
                dataSource={dataSource}
                scroll={{ x: 'max-content' }}
                pagination={false}
            />

        </div>
    )
}
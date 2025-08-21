import { Form, Button, Input, Select, Table } from "antd";
import { useAntdTable } from "ahooks";
import type { IUserList } from "../../../types";
import type { TableColumnsType, TableProps } from 'antd';

export default function UserList() {
    const [form] = Form.useForm();

    const handleCreate = () => {
        console.log('新增')
    }

    const handleBatchDelete = () => {
        console.log('批量删除')
    }

    const handleEdit = (record: IUserList) => {
        console.log('编辑', record)
    }

    const handleDelete = (id: string) => {
        console.log('删除', id)
    }

    const columns = [

        {
            title: '用户ID',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: '用户名称',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: '用户邮箱',
            dataIndex: 'userEmail',
            key: 'userEmail',
        },
        {
            title: '用户角色',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: '用户状态',
            dataIndex: 'state',
            key: 'state',
        },
        {
            title: '注册时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (text: string, record: IUserList) => {
                return (
                    <>
                        <Button type="link" onClick={() => handleEdit(record)}>编辑</Button>
                        <Button type="link" onClick={() => handleDelete(record._id)}>删除</Button>
                    </>
                )
            }
        },
    ]
    const rowSelection: TableProps<IUserList>['rowSelection'] = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: IUserList[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record: IUserList) => ({
            name: record._id,
        }),
    };


    return (
        <>
            <Form className="search-form" layout="inline">
                <Form.Item label="用户ID">
                    <Input placeholder="请输入用户ID" />
                </Form.Item>
                <Form.Item label="用户名">
                    <Input placeholder="请输入用户名" />
                </Form.Item>
                <Form.Item label="状态">
                    <Select
                        placeholder="请选择状态"
                        defaultValue="在职"
                        style={{ width: 100 }}
                        options={[
                            {
                                value: '所有',
                                label: '所有'
                            },
                            {
                                value: '在职',
                                label: '在职'
                            },
                            {
                                value: '离职',
                                label: '离职'
                            },
                            {
                                value: '试用期',
                                label: '试用期'
                            }
                        ]}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" className="button" >
                        查询
                    </Button>
                    <Button type="default" htmlType="submit" >
                        重置
                    </Button>
                </Form.Item>
            </Form>
            <Form className="tableWrapper">
                <div className="header">
                    <div className="title">用户列表</div>
                    <div className="action">
                        <Button type="primary" onClick={handleCreate} style={{ marginRight: "10px" }}>新增</Button>
                        <Button variant="solid" color="danger" onClick={handleBatchDelete}>批量删除</Button>
                    </div>
                </div>
                <Table rowSelection={{ type: 'checkbox', ...rowSelection }} columns={columns} />
            </Form>
        </>
    )
}
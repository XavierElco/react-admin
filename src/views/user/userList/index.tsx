import { Form, Button, Input, Select, Table, Modal, message, Space } from "antd";
import { useAntdTable } from "ahooks";
import type { IUserList, IUserSearchParams } from "../../../types";
import type { TableProps } from 'antd';
import api from "../../../api/index";
import { useRef, useState } from "react";
import CreateUser from "./CreateUser";

export default function UserList() {
    const [form] = Form.useForm();
    const [userIds, setUserIds] = useState<number[]>([]);

    const createRef = useRef<{
        showModal: (type: string, data?: IUserList) => void;
    }>(null);

    const handleCreate = () => {
        createRef.current?.showModal('create')
    }

    const handleBatchDelete = () => {
        if (userIds.length === 0) {
            message.error('请选择要删除的用户');
            return;
        }
        Modal.confirm({
            title: '删除确认',
            content: <span>确认删除该批用户吗？</span>,
            onOk: () => {
                handleUserDelSubmit(userIds);
            },
        });
    }

    const handleEdit = (record: IUserList) => {
        createRef.current?.showModal('edit', record)
    }

    const handleDelete = (userId: number) => {
        Modal.confirm({
            title: '确定删除该用户吗？',
            onOk: () => {
                handleUserDelSubmit([userId])
            }
        })
    }

    // 公共删除用户接口
    const handleUserDelSubmit = async (ids: number[]) => {
        await api.delUser({
            userIds: ids,
        });
        message.success('删除成功');
        setUserIds([]);
        search.reset();
    };



    const getUserTable = ({ current, pageSize }: { current: number, pageSize: number },
        formData: IUserSearchParams) => {
        return api.getUserList({
            ...formData,
            pageNum: current,
            pageSize: pageSize,
        }).then((data) => {
            return {
                list: data.list,
                total: data.page.total,
            }
        })
    }

    const { tableProps, search } = useAntdTable(getUserTable, {
        form: form,
        defaultCurrent: 1,
        defaultPageSize: 5,
    })

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
            render(role: number) {
                return {
                    0: '超级管理员',
                    1: '管理员',
                    2: '体验管理员',
                    3: '普通用户',
                }[role];
            },
        },
        {
            title: '用户状态',
            dataIndex: 'state',
            key: 'state',
            render(state: number) {
                return {
                    1: '在职',
                    2: '离职',
                    3: '试用期',
                }[state];
            },
        },
        {
            title: '注册时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title: '操作',
            key: 'address',
            render(record: IUserList) {
                return (
                    <Space>
                        <Button type="text" onClick={() => handleEdit(record)}>编辑</Button>
                        <Button type="text" danger onClick={() => handleDelete(record.userId)}>删除</Button>
                    </Space>
                );
            }
        },
    ]
    const rowSelection: TableProps<IUserList>['rowSelection'] = {
        onChange: (selectedRowKeys: React.Key[]) => {
            setUserIds(selectedRowKeys as number[]);
        },
        getCheckboxProps: (record: IUserList) => ({
            name: record._id,
        }),
    };


    return (
        <>
            <Form className="search-form" layout="inline"
                form={form}
                onFinish={search.submit}
                onReset={search.reset}
            >
                <Form.Item name="userId" label="用户ID">
                    <Input placeholder="请输入用户ID" />
                </Form.Item>
                <Form.Item name="userName" label="用户名">
                    <Input placeholder="请输入用户名" />
                </Form.Item>
                <Form.Item name="state" label="状态" initialValue={1}>
                    <Select
                        placeholder="请选择状态"
                        style={{ width: 100 }}
                    >
                        <Select.Option value={0}>所有</Select.Option>
                        <Select.Option value={1}>在职</Select.Option>
                        <Select.Option value={2}>离职</Select.Option>
                        <Select.Option value={3}>试用期</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" className="button" >
                        查询
                    </Button>
                    <Button type="default" htmlType="reset" onClick={search.reset} >
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
                <Table
                    rowKey="userId"
                    rowSelection={{
                        type: 'checkbox',
                        selectedRowKeys: userIds,
                        ...rowSelection
                    }}
                    columns={columns}
                    {...tableProps}
                />
            </Form>
            <CreateUser
                mref={createRef}
                update={() => { }}
            />
        </>
    )
}
import { Form, Input, Button, Modal, message } from 'antd';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import api from '../../../api';
import { useEffect, useState, useRef } from 'react';
import type { IDeptList } from '../../../types/index';
import { formatDateToChinese } from '../../../utils';
import CreateDept from './CreateDept';
import { Flex, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function DeptList() {

    const [loading, setLoading] = useState(false)

    const [deptList, setDeptList] = useState<IDeptList[]>([])

    const [form] = Form.useForm()

    const deptRef = useRef<{ showModal: (type: string, data?: IDeptList | { parentId: string }) => void }>(null)

    useEffect(() => {
        setLoading(true)
        getDept()
    }, [])

    // 获取部门列表
    const getDept = async () => {
        const data = await api.getDeptList(form.getFieldsValue());
        setLoading(false)
        setDeptList(data)
    }

    const columns: TableColumnsType<IDeptList> = [
        {
            title: '部门名称',
            dataIndex: 'deptName',
            key: 'deptName',
            width: '200',
        },
        {
            title: '部门负责人',
            dataIndex: 'userName',
            key: 'userName',
            width: '200',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width: '200',
            render: (text: string) => {
                return formatDateToChinese(text)
            }
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
            width: '200',
            render: (text: string) => {
                return formatDateToChinese(text)
            }
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            width: '200',
            render: (_, record: IDeptList) => {
                return (
                    <>
                        <Button
                            variant="outlined"
                            className="button"
                            color="primary"
                            onClick={() => handleSubCreate(record._id)}
                        >新增</Button>
                        <Button
                            variant="outlined"
                            className="button"
                            color="primary"
                            onClick={() => handleEdit(record)}
                        >编辑</Button>
                        <Button
                            variant="outlined"
                            className="button"
                            color="danger"
                            onClick={() => handleDelete(record._id)}
                        >删除</Button>
                    </>
                )
            }
        }
    ]


    const handleSubCreate = (id: string) => {
        deptRef.current?.showModal('create', { parentId: id })
    }

    const handleEdit = (record: IDeptList) => {
        deptRef.current?.showModal('edit', record)
    }

    const handleDelete = (deptId: string) => {
        Modal.confirm({
            title: '删除部门',
            content: '确定要删除该部门吗？',
            onOk: () => handleDeleteOk(deptId),
        })

    }

    const handleDeleteOk = async (id: string) => {
        await api.deleteDept(id);
        message.success('删除部门成功'),
            getDept();
    }

    const handleReset = () => {
        form.resetFields()
        getDept()
    }

    const handleCreate = () => {
        deptRef.current?.showModal('create');
    }

    return (
        <div>
            <Form className="search-form" layout="inline" form={form}>
                <Form.Item name="deptName" label="部门名称">
                    <Input placeholder="请输入部门名称" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" className="button" onClick={getDept} >
                        查询
                    </Button>
                    <Button type="primary" htmlType="submit" onClick={handleReset} >
                        重置
                    </Button>
                </Form.Item>
            </Form>
            {loading ? <Flex align="center" gap="middle" style={{ justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 250px)' }}>
                <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
            </Flex> : <>
                <div className="tableWrapper">
                    <div className="header">
                        <div className="title">部门列表</div>
                        <div className="action">
                            <Button onClick={handleCreate}>新增</Button>
                        </div>
                    </div>
                    <Table rowKey="_id" columns={columns} dataSource={deptList} />
                </div>
                <CreateDept mref={deptRef} update={getDept} />
            </>
            }
        </div>
    );
}


import { Form, Input, Button } from 'antd';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import api from '../../../api';
import { useEffect, useState } from 'react';
import type { IDeptList } from '../../../types/index';
import { formatDateToChinese } from '../../../utils';

export default function DeptList() {

    const [deptList, setDeptList] = useState<IDeptList[]>([])

    useEffect(() => {
        getDept()
    }, [])  

    // 获取部门列表
    const getDept = async() => {
        const data = await api.getDeptList();
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
            render: (record: IDeptList) => {
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
                            onClick={() => handleEdit(record._id)}
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
        console.log(id)
    }

    const handleEdit = (id: string) => {
        console.log(id)
    }

    const handleDelete = (id: string) => {
        console.log(id)
    }

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
                <Table rowKey="_id" columns={columns} dataSource={deptList}/>
            </div>
        </div>
    );
}

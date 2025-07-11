import { Form, Input, Button, Select, Table } from "antd";
import { useEffect, useState, useRef } from "react";
import type { IMenuList } from "../../../types";
import type { TableColumnsType } from 'antd';
import api from "../../../api";
import { formatDateToChinese } from "../../../utils";
import { ConfigProvider, Flex, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import CreateMenu from "./CreateMenu";


export default function menuList() {

    const [loading, setLoading] = useState(false)

    const [form] = Form.useForm()

    const [menuList, setMenuList] = useState<IMenuList[]>([])

    const menuRef = useRef<{ showModel: (type: string, data?: IMenuList) => void }>(null)

    const getMenu = () => {
        getMenuList()
    }

    const handleReset = () => {
        form.resetFields()
        getMenuList()
    }

    useEffect(() => {
        setLoading(true)
        getMenuList()
    }, [])

    const getMenuList = async () => {
        const data = await api.getMenuList(form.getFieldsValue())
        setLoading(false)
        setMenuList(data)
    }

    const columns: TableColumnsType<IMenuList> = [
        {
            title: '菜单名称',
            width: 150,
            dataIndex: 'menuName',
            fixed: 'left',
            key: 'menuName',
        },
        {
            title: '菜单图标',
            width: 100,
            dataIndex: 'icon',
            key: 'icon',
        },
        {
            title: '菜单类型',
            dataIndex: 'menuType',
            key: 'menuType',
            render: (text: string) => {
                return {
                    1: '菜单',
                    2: '按钮',
                    3: '页面',
                }[text]
            }
        },
        {
            title: '权限标识',
            dataIndex: 'menuCode',
            key: 'menuCode',
        },
        {
            title: '路由地址',
            dataIndex: 'path',
            key: 'path',
        },
        {
            title: '组件名称',
            dataIndex: 'component',
            key: 'component',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            render: (text: string) => formatDateToChinese(text)
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
            render: (text: string) => {
                return formatDateToChinese(text)
            }
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (_, record: IMenuList) => {
                return <div>
                    <Button
                        className="button"
                        variant="outlined"
                        color="primary"
                        onClick={() => handleEdit(record)}
                    >编辑</Button>
                    <Button
                        className="button"
                        variant="outlined"
                        color="danger"
                        onClick={() => handleDelete(record)}
                    >删除</Button>
                </div>
            }
        },
    ];

    const handleEdit = (record: IMenuList) => {
        console.log(record)
    }

    const handleDelete = (record: IMenuList) => {
        console.log(record)
    }

    const handleCreate = () => {
        menuRef.current?.showModel('create')
    }

    return (
        <div>
            <Form className="search-form" layout="inline" form={form}>
                <Form.Item name="menuName" label="菜单名称">
                    <Input placeholder="请输入菜单名称" />
                </Form.Item>
                <Form.Item name="menuStatus" label="菜单状态" initialValue="正常">
                    <Select style={{ width: 100 }}>
                        <Select.Option value="正常">正常</Select.Option>
                        <Select.Option value="禁用">禁用</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" className="button" onClick={getMenu} >
                        搜索
                    </Button>
                    <Button variant="outlined" htmlType="submit" onClick={handleReset} >
                        重置
                    </Button>
                </Form.Item>
            </Form>

            {loading ?
                <Flex align="center" gap="middle" style={{ justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 250px)' }}>
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
                </Flex>
                :
                <>
                    <div className="tableWrapper">
                        <div className="header">
                            <div className="title">菜单列表</div>
                            <div className="action">
                                <Button type="primary" onClick={handleCreate}>新增</Button>
                            </div>
                        </div>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Table: {
                                        headerBorderRadius: 0, // 设置表格头部圆角，单位是px
                                    },
                                },
                            }}
                        >
                            <Table
                                rowKey="_id"
                                bordered
                                columns={columns}
                                dataSource={menuList}
                                scroll={{ x: 'max-content' }}
                                pagination={false}
                            />
                        </ConfigProvider>
                    </div>
                </>
            }


        </div>
    )
}
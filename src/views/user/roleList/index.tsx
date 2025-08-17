import { Form, Input, Button, Table, ConfigProvider, Spin, Flex, message, Modal } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { useState, useRef } from "react"
import type { IRole } from "../../../types"
import api from "../../../api/roleApi"
import { formatDateToChinese } from "../../../utils/index"
import { useAntdTable } from "ahooks"
import type { IRoleSearchParams } from "../../../types"
import type { TableColumnsType } from "antd"
import CreateRole from "./CreateRole"




export default function RoleList() {

    const roleRef = useRef<{
        showModal: (type: string, data?: IRole | { parentId: string }) => void
    }>(null)

    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm()

    
    const getRoleList = ({ current, pageSize }: { current: number; pageSize: number }, formData: IRoleSearchParams) => {
        return api.getRoleList({ ...formData, pageNum: current, pageSize: pageSize }).then((data) => {
            console.log(data);
            setLoading(false);
            return {
                list: data.list,
                total: data.page.total,
            };
        });
    };

    const { tableProps, search } = useAntdTable(getRoleList, {
        form,
        defaultCurrent: 1,
        defaultPageSize: 5,
    })

    const columns: TableColumnsType<IRole> = [
        {
            title: '角色名称',
            dataIndex: 'roleName',
            key: 'roleName',
        },
        {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            render: (text) => {
                return formatDateToChinese(text);
            }
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
            render: (text) => {
                return formatDateToChinese(text);
            },
        },
        {
            title:'操作',
            key: 'action',
            render: (text, record) => {
                return (
                    <>
                        <Button variant="link" color="default" onClick={() => handleEdit(record)}>编辑</Button>
                        <Button variant="link" color="default" onClick={() => handleSetPermission(record)}>设置权限</Button>
                        <Button variant="link" color="danger" onClick={() => handleDelete(record._id)}>删除</Button>
                    </>
                )
            }

        }
    ];
    

    const handleCreate = () => {
        roleRef.current?.showModal('create');
    }

    const handleEdit = (record: IRole) => {
        roleRef.current?.showModal('edit', record);
    }

    const handleDelete = (id: string) => {
        Modal.confirm({
            title: '确定删除该角色吗？',
            onOk: () => {
                api.deleteRole({ _id: id }).then(() => {
                    message.success('删除成功');
                    search.submit();
                })
            }
        })
    }

    const handleSetPermission = (record: IRole) => {
        console.log(record);
    }


    return (
        <>
            <Form className="search-form" layout="inline" form={form}>
                <Form.Item name="roleName" label="角色名称">
                    <Input placeholder="请输入角色名称" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" className="button" onClick={search.submit}>
                        查询
                    </Button>
                    <Button type="primary" htmlType="submit" onClick={search.reset}>
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
                        <Table bordered rowKey="_id" columns={columns} {...tableProps} />
                        </ConfigProvider>
                    </div>
                    {/* 创建角色 */}
                    <CreateRole mref={roleRef} update={search.submit} />
                </>
            }
        </>
    )
}
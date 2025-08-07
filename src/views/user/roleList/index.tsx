import { Form, Input, Button, Table, ConfigProvider, Spin, Flex, message, Modal, TableColumnsType } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { useState, useEffect } from "react"
import type { IRole } from "../../../types"
import api from "../../../api"
import { formatDateToChinese } from "../../../utils/index"

export default function RoleList() {

    const [loading, setLoading] = useState(false);
    const [roleList, setRoleList] = useState<IRole[]>([]);

    // useEffect(() => {
    //     getRoleList();
    //     setLoading(false);
    // }, [])

    // const getRoleList = async () => {
    //     try {
    //         setLoading(true);
    //         const data = await api.getRoleList(form.getFieldsValue());
    //         setRoleList(data);
    //     } catch (error) {
    //         message.error('获取角色列表失败');
    //     }
    // }

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
      ];
      

    const [form] = Form.useForm()
    return (
        <>
            <Form className="search-form" layout="inline" form={form}>
                <Form.Item name="roleName" label="角色名称">
                    <Input placeholder="请输入角色名称" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" className="button">
                        查询
                    </Button>
                    <Button type="primary" htmlType="submit">
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
                                <Button type="primary" >新增</Button>
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
                                dataSource={roleList}
                                scroll={{ x: 'max-content' }}
                                pagination={false}
                            />
                        </ConfigProvider>
                    </div>
                    {/* <CreateRole mref={roleRef} update={getRoleList} /> */}
                </>
            }
        </>
    )
}
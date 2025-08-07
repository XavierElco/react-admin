import { Form, Input, Button, Table, ConfigProvider, Spin, Flex } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { useState } from "react"
import type { IRole } from "../../../types"
import api from "../../../api/roleApi"
import { formatDateToChinese } from "../../../utils/index"
import { useAntdTable } from "ahooks"
import type { IRoleSearchParams } from "../../../types"
import type { TableColumnsType } from "antd"

export default function RoleList() {

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
      ];
      
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
                        <Table bordered rowKey="_id" columns={columns} {...tableProps} />
                        </ConfigProvider>
                    </div>
                    {/* <CreateRole mref={roleRef} update={getRoleList} /> */}
                </>
            }
        </>
    )
}
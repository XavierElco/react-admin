import { Form, Modal, Input, Select, Radio, message } from "antd"
import type { IMenuList } from "../../../types"
import { useEffect, useImperativeHandle, useState } from "react"
import api from "../../../api"
import { TreeSelect } from "antd"

interface IProps {
    mref: React.RefObject<{
        showModel: (type: string, data?: IMenuList | { parentId: string }) => void
    }>;
    update: () => void
}

export default function CreateMenu(props: IProps) {

    const [action, setAction] = useState<string>('create')
    const [menuList, setMenuList] = useState<IMenuList[]>()
    const [open, setOpen] = useState(false)
    const [form] = Form.useForm()
    const [confirmLoading, setConfirmLoading] = useState(false)

    useEffect(() => {
        getMenuList();
    }, [])

    const getMenuList = async () => {
        const data = await api.getMenuList()
        setMenuList(data)
    }

    const showModel = (type: string, data?: IMenuList | { parentId: string }) => {
        setAction(type)
        setOpen(true)
        getMenuList()
        if (data) {
            form.setFieldsValue(data)
        }
    }

    useImperativeHandle(
        props.mref,
        () => ({
            showModel,
        })
    )

    const handleOk = async () => {
        const valid = await form.validateFields();
        if (!valid) {
            return;
        }

        const params = form.getFieldsValue();

        try {
            if (action === 'create') {
                await api.createMenu(params);
                message.success('创建菜单成功')
            } else if (action === 'edit') {
                await api.editMenu(params);
                message.success('编辑菜单成功')
            }

            props.update();

            setConfirmLoading(true);
            setTimeout(() => {
                handleCancel();
                setConfirmLoading(false);
            }, 2000);

        } catch (error) {
            console.error('API 请求失败:', error);
            message.error('操作失败');
            setConfirmLoading(false);
        }
    }

    const handleCancel = () => {
        setOpen(false)
        form.resetFields()
    }

    return (
        <>
            <div>
                <Modal
                    title={action === 'create' ? '创建菜单' : '编辑菜单'}
                    open={open}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okText="提交"
                    cancelText="取消"
                    confirmLoading={confirmLoading}
                >
                    <Form form={form} layout="horizontal" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                        <Form.Item name="parentId" label="上级菜单" rules={[{ message: '请选择上级菜单' }]}>
                            <TreeSelect
                                placeholder="请选择上级菜单"
                                allowClear
                                treeDefaultExpandAll
                                treeData={menuList}
                                fieldNames={{ label: 'menuName', value: '_id' }}
                            />
                        </Form.Item>
                        <Form.Item name="menuType" label="菜单类型" rules={[{ message: '请选择菜单类型' }]}>
                            <Radio.Group>
                                <Radio value="1">菜单</Radio>
                                <Radio value="2">按钮</Radio>
                                <Radio value="3">页面</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item name="menuName" label="菜单名称" rules={[{ required: true, message: '请输入菜单名称' }]}>
                            <Input placeholder="请输入菜单名称" />
                        </Form.Item>
                        <Form.Item name="icon" label="菜单图标" >
                            <Input placeholder="请输入菜单图标" />
                        </Form.Item>
                        <Form.Item name="path" label="路由地址" >
                            <Input placeholder="请输入路由地址" />
                        </Form.Item>
                        <Form.Item name="component" label="组件名称" >
                            <Input placeholder="请输入组件名称" />
                        </Form.Item>
                        <Form.Item name="orderBy" label="排序" initialValue={3}>
                            <Input placeholder="请输入排序" style={{ width: 100 }} />
                        </Form.Item>
                        <Form.Item name="menuState" label="菜单状态" >
                            <Radio.Group>
                                <Radio value="1">正常</Radio>
                                <Radio value="0">禁用</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </>
    )
}
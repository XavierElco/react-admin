import { Form, Modal } from "antd"
import { Input } from "antd"
import type { IMenuList } from "../../../types"
import { useEffect, useImperativeHandle, useState } from "react"
import api from "../../../api"

interface IProps {
    mref: React.RefObject<{
        showModel: (type: string, data?: IMenuList) => void
    }>
}

export default function CreateMenu(props: IProps) {

    const [action, setAction] = useState<string>('create')
    const [menuList, setMenuList] = useState<IMenuList[]>()
    const [open, setOpen] = useState(false)
    const [form] = Form.useForm()

    useEffect(() => {
        getMenuList();
    })

    const getMenuList = async () => {
        const data = await api.getMenuList()
        setMenuList(data)
    }

    const showModel = (type: string, data?: IMenuList) => {
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
            showModel
        })
    )

    const handleOk = () => {
        console.log('提交')
    }

    const handleCancel = () => {
        setOpen(false)
    }

    return (
        <>
            <div>
                <Modal
                    title={action === 'create' ? '新增菜单' : '编辑菜单'}
                    open={open}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okText="提交"
                    cancelText="取消"
                >
                    <Form form={form} layout="horizontal" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                        <Form.Item name="menuName" label="菜单名称" rules={[{ required: true, message: '请输入菜单名称' }]}>
                            <Input placeholder="请输入菜单名称" />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </>
    )
}
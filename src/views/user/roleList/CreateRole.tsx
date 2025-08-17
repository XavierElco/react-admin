import { Modal, Form, Input } from "antd";
import { useImperativeHandle, useState } from "react";
import api from "../../../api/roleApi";
import type { IRole } from "../../../types";
import {  message } from "antd";


interface IProps {
    mref: React.RefObject<{ showModal: (type: string, data?: IRole | { parentId: string }) => void }>;
    update: () => void;
}


export default function CreateRole(props: IProps) {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [action, setAction] = useState<string>('create');
    const [form] = Form.useForm();





    useImperativeHandle(props.mref, () => ({
        showModal
    }));

    const showModal = (type: string, data?: IRole | { parentId: string }) => {
        setAction(type);
        setOpen(true);
        if (data) {
            form.setFieldsValue(data);
        }
    };

    const handleOk = async () => {

        const valid = await form.validateFields();
        console.log('表单验证结果:', valid)
        if (!valid) {
            return;
        }

        const params = form.getFieldsValue();

        try {
            if (action === 'create') {
                await api.createRole(params);
                message.success('创建角色成功')
            } else if (action === 'edit') {
                console.log('开始编辑角色');
                await api.updateRole(params);
                message.success('编辑角色成功')
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
    };

    const handleCancel = () => {
        setOpen(false);
        form.resetFields();
    };

    return (
        <>
            <div>
                <Modal
                    title={action === 'create' ? '创建角色' : '编辑角色'}
                    open={open}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    okText="提交"
                    cancelText="取消"
                >

                    <Form
                        form={form}
                        layout="horizontal"
                        labelCol={{ span: 6 }}      // 标签占6列
                        wrapperCol={{ span: 18 }}   // 输入框占18列
                    >
                        <Form.Item name="roleName" label="角色名称" rules={[{ required: true, message: '请输入角色名称' }]}>
                            <Input placeholder="请输入角色名称" />
                        </Form.Item>
                        <Form.Item name="remark" label="备注">
                            <Input placeholder="请输入备注" />
                        </Form.Item>
                    </Form>

                </Modal>
            </div >
        </>
    );
}

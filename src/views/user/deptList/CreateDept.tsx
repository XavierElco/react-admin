import { Modal, Form, Input, Select } from "antd";
import { useEffect, useImperativeHandle, useState } from "react";
import api from "../../../api";
import type { IDeptList, IUserList } from "../../../types";
import { TreeSelect, message } from "antd";


interface IProps {
    mref: React.RefObject<{ showModal: (type: string, data?: IDeptList | { parentId: string }) => void }>;
    update: () => void;
}

export default function CreateDept(props: IProps) {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [deptList, setDeptList] = useState<IDeptList[]>();
    const [userList, setUserList] = useState<IUserList[]>();
    const [action, setAction] = useState<string>('create');
    const [form] = Form.useForm();

    // 在组件加载时获取用户列表
    useEffect(() => {
        getAllUserList();
    }, []);

    const getDeptList = async () => {
        const data = await api.getDeptList();
        setDeptList(data);
    }

    const getAllUserList = async () => {
        const data = await api.getAllUserList();
        setUserList(data);
    }

    useImperativeHandle(props.mref, () => ({
        showModal
    }));

    const showModal = (type: string, data?: IDeptList | { parentId: string }) => {
        setAction(type);
        setOpen(true);
        getDeptList();
        if (data) {
            form.setFieldsValue(data);
        }
    };

    const handleOk = async () => {
        const valid = form.validateFields();
        if (!valid) {
            return;
        }
        const params = form.getFieldsValue();
        if (action === 'create') {
            await api.createDept(params);
            message.success('创建部门成功')
        } else if (action === 'edit') {
            await api.updateDept(params);
            message.success('编辑部门成功')
        }
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log("Clicked cancel button");
        setOpen(false);
    };

    return (
        <>
            <div>
                <Modal
                    title={action === 'create' ? '创建部门' : '编辑部门'}
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
                        <Form.Item name="parentId" label="上级部门">
                            <TreeSelect
                                placeholder="请选择上级部门"
                                allowClear
                                treeDefaultExpandAll
                                treeData={deptList}
                                fieldNames={{ label: 'deptName', value: '_id' }}
                            ></TreeSelect>
                        </Form.Item>

                        <Form.Item name="deptName" label="部门名称" rules={[{ required: true, message: '请输入部门名称' }]}>
                            <Input placeholder="请输入部门名称" />
                        </Form.Item>

                        <Form.Item name="manager" label="负责人" rules={[{ required: true, message: '请选择负责人' }]}>
                            <Select>
                                {userList?.map((item) => (
                                    <Select.Option value={item.userName} key={item._id}>
                                        {item.userName}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Form>

                </Modal>
            </div >
        </>
    );
}

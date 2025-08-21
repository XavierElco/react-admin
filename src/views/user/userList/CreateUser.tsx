import { Form, Modal, Input, TreeSelect, Select, Upload, message } from "antd"
import { useImperativeHandle, useState, useEffect } from "react"
import type { IUserList } from "../../../types"
import api from "../../../api"
import roleApi from "../../../api/roleApi"
import type { IDeptList, IRole } from "../../../types"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import type { RcFile, UploadProps, UploadChangeParam, UploadFile } from "antd/es/upload"

interface IProps {
    mref: React.RefObject<{ showModal: (type: string, data?: IUserList) => void }>
    update: () => void;
}

export default function CreateUser(props: IProps) {

    const [action, setAction] = useState<string>('');
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [deptList, setDeptList] = useState<IDeptList[]>([]);
    const [roleList, setRoleList] = useState<IRole[]>([]);
    const [img, setImg] = useState<string>('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDeptList();
        getRoleList();
    }, [])

    const getDeptList = () => {
        api.getDeptList().then(res => {
            setDeptList(res);
        })
    }

    const getRoleList = () => {
        roleApi.getAllRoleList().then(res => {
            setRoleList(res);
        })
    }
    useImperativeHandle(props.mref, () => {
        return {
            showModal,
        };
    });

    const showModal = (type: string, data?: IUserList) => {
        setAction(type);
        setOpen(true);
        if (type === 'edit' && data) {
            form.setFieldsValue(data);
        }
    }

    const handleCancel = () => {
        setOpen(false);
        setImg('');
        form.resetFields();
    }

    const handleOk = async () => {
        const valid = await form.validateFields();
        console.log(valid);

        if (valid) {
            const params = {
                ...form.getFieldsValue(),
                userImg: img,
            }

            if (action === 'create') {
                await api.createUser(params);
                message.success('创建成功');
            } else {
                await api.editUser(params);
                message.success('编辑成功');
            }
            handleCancel();
            props.update();
        }
    }

    // 上传前接口处理
    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('上传头像仅支持jpg或png文件');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('上传头像的尺寸不能超过2MB');
        }
        return isJpgOrPng && isLt2M;
    }

    // 上传成功后图片处理
    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
        }
        if (info.file.status === 'done') {
            setLoading(false);
            const { code, data, msg } = info.file.response;
            if (code === 0) {
                setImg(data.file);
            } else {
                message.error(msg);
            }
        } else if (info.file.status === 'error') {
            setLoading(false);
            message.error('上传失败');
        }
    }

    return (
        <Modal
            title={action === 'create' ? '新增用户' : '编辑用户'}
            width={800}
            open={open}
            onCancel={handleCancel}
            onOk={handleOk}
        >
            <Form form={form} onFinish={handleOk} labelCol={{ span: 4 }} labelAlign="right">
                <Form.Item
                    name="userName"
                    label="用户名称"
                    rules={[
                        { required: true, message: '请输入用户名称' },
                        { min: 5, max: 12, message: '用户名称最小5个字符，最大12个字符' },
                    ]}
                >
                    <Input placeholder="请输入用户名称" required />
                </Form.Item>
                <Form.Item
                    name="userEmail"
                    label="用户邮箱"
                    rules={[{ required: true, message: '请输入用户邮箱' },
                    { type: 'email', message: '请输入正确的邮箱' },
                    {
                        pattern: /^\w+@gmail.com$/,
                        message: '邮箱必须以@gmail.com结尾',
                    },
                    ]}
                >
                    <Input placeholder="请输入用户邮箱" required />
                </Form.Item>
                <Form.Item
                    label="手机号"
                    name="mobile"
                    rules={[
                        { len: 11, message: '请输入11位手机号' },
                        { pattern: /1[1-9]\d{9}/, message: '请输入1开头的11位手机号' },
                    ]}
                >
                    <Input type="number" placeholder="请输入手机号"></Input>
                </Form.Item>
                <Form.Item
                    label="部门"
                    name="deptId"
                    rules={[
                        {
                            required: true,
                            message: '请选择部门',
                        },
                    ]}
                >
                    <TreeSelect
                        placeholder="请选择部门"
                        allowClear
                        treeDefaultExpandAll
                        showCheckedStrategy={TreeSelect.SHOW_ALL}
                        fieldNames={{ label: 'deptName', value: '_id' }}
                        treeData={deptList}
                    />
                </Form.Item>
                <Form.Item label="岗位" name="job">
                    <Input placeholder="请输入岗位"></Input>
                </Form.Item>
                <Form.Item label="状态" name="state">
                    <Select>
                        <Select.Option value={1}>在职</Select.Option>
                        <Select.Option value={2}>离职</Select.Option>
                        <Select.Option value={3}>试用期</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="系统角色" name="roleList">
                    <Select placeholder="请选择角色">
                        {roleList.map((item) => {
                            return (
                                <Select.Option value={item._id} key={item._id}>
                                    {item.roleName}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Form.Item>
                <Form.Item label="头像">
                    <Upload
                        name="file"
                        listType="picture-circle"
                        showUploadList={false}
                        action="/api/upload/upload"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {img ? (
                            <img src={img} style={{ width: '100%', borderRadius: '100%' }} />
                        ) : (
                            <div>
                                {loading ? <LoadingOutlined rev={undefined} /> : <PlusOutlined />}
                                <div style={{ marginTop: 5 }}>上传头像</div>
                            </div>
                        )}
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>

    )
}   
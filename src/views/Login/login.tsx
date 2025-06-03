import { Button, Form, Input, message } from "antd";
import styles from "./index.module.less";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Flex, Checkbox } from "antd";
import storage from "../../utils/storage";
import type { ILoginParams } from "../../types/index";
import api from "../../api/index";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const onFinish= async (values: ILoginParams) => {
    setIsLogin(true);
    try {
      if (values.userName !== 'admin' || values.userPwd !== '123456') {
        message.error('用户名或密码错误!');
        setIsLogin(false);
        return;
      }
      const res = await api.login(values);
      console.log("登陆成功: ", res);
      storage.set("token", res);
      navigate("/welcome");
    } catch (error) {
      console.log("登陆失败: ", error);
      message.error('登陆失败');
    } finally {
      setIsLogin(false);
    }
  };


  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <div className={styles.loginTitle}>系统登录</div>
        <Form
          name="login"
          initialValues={{ 
            remember: true,
            userName: 'admin',
            userPwd: '123456'
          }}
          onFinish={onFinish}
          className={styles.loginForm}
        >
          <Form.Item
            name="userName"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="userPwd"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住我</Checkbox>
              </Form.Item>
            </Flex>
          </Form.Item>

          <Form.Item>
            {
              !isLogin ? (
                <Button block type="primary" htmlType="submit">
                  登录
                </Button>
              ) : (
                <Button block type="primary" loading iconPosition="end" htmlType="submit">
                  登录中...
                </Button>
              )
            }
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

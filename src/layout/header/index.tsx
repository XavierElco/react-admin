import styles from "./index.module.less";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Dropdown} from "antd";
import type { MenuProps } from "antd";
import storage from '../../utils/storage';
import { useNavigate, useState } from 'react-router-dom';

export default function navHeader() {
    const navigate = useNavigate();
const items: MenuProps["items"] = [
    {
         key: "emial",
         label: "邮箱: 1234567890@gmail.com"
    },
    {
        key: "logout",
        label: "退出" 
    }
];

const onClick = ({key}: {key: string}) => {
    if(key === 'logout'){
        storage.remove('token');
        navigate('/login');
    }
}

return (
    <div className={styles.navHeader}>
        <div className={styles.left}>
            <div>
                <MenuUnfoldOutlined />
            </div>
        </div>
        <div className={styles.right}>
            <Dropdown menu={{ items, onClick}} trigger={['click']}>
                <span className={styles.nickName}>Jeff</span>
            </Dropdown>
        </div>
    </div>
);
}

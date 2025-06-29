import styles from "./index.module.less";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Dropdown, Button} from "antd";
import type { MenuProps } from "antd";
import storage from '../../utils/storage';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/index';


export default function navHeader() {
    const {collapsed, updateCollapsed} = useStore();
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

    const toggleCollapsed = () => {
        updateCollapsed();
    }

    return (
        <div className={styles.navHeader}>
            <div className={styles.left} >
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={toggleCollapsed}
                    style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                }}
                />
            </div>
            <div className={styles.right}>
                <Dropdown menu={{ items, onClick}} trigger={['click']}>
                    <span className={styles.nickName}>Jeff</span>
                </Dropdown>
            </div>
        </div>
    );
}

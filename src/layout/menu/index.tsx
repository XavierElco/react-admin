import styles from './index.module.less';
import { Menu } from 'antd';
import { 
    HomeOutlined, 
    UserOutlined, 
    SettingOutlined, 
    UsergroupAddOutlined,
    MailOutlined,
    SolutionOutlined,
    LaptopOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import { useStore } from '../../store/index';
import type { GetProp, MenuProps } from 'antd';
type MenuItem = GetProp<MenuProps, 'items'>[number];
import { useNavigate } from 'react-router-dom';


export default function menu() {
    const {collapsed} = useStore();
    const items: MenuItem[] = [
        {
            key: 'welcome',
            icon: <HomeOutlined />,
            label: '欢迎页面',
        },
        {
            key: 'dashboard',
            icon: <PieChartOutlined />,
            label: 'Dashboard',
        },
        {
            key: 'user',
            icon: <UsergroupAddOutlined />,
            label: '用户模块',
            children: [
                { key: '/user/userList', label: '用户列表', icon: <UserOutlined /> },
                { key: '/user/menuList', label: '菜单管理', icon: <MailOutlined /> },
                { key: '/user/roleList', label: '角色管理', icon: <SolutionOutlined /> },
                { key: '/user/deptList', label: '部门管理', icon: <LaptopOutlined />,},
            ]
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: '系统设置',
        }
      ];

      const navigate = useNavigate();

      const menuClick = ({key}: {key: string}) => {
        navigate(key);
      }
      return (
        
        <div className={styles.menuContainer}>
            <div className={styles.logo}>
                <img src = '/imgs/logo.png' className={styles.img}/>
                {collapsed ? '' : 'Admin System'}
            </div>
            <Menu
                onClick={menuClick}
                theme="light"  // 设置为浅色主题
                mode="inline"
                inlineCollapsed={collapsed}
                defaultSelectedKeys={['welcome']}
                items={items}
                style={{ 
                    borderRight: 0,
                    background: 'transparent'  
                }}
            />
        </div>
    );
}
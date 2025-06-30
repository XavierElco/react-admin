import React from 'react';
import { Layout} from 'antd';
import { Outlet } from 'react-router-dom';
const { Sider } = Layout;
import styles from './index.module.less';
import NavHeader from './header/index';
import TheFooter from './footer/index';
import Menu from './menu/index';
import { useStore } from '../store/index';

export default function layoutContent() {
    const {collapsed} = useStore();

    return (
        <Layout style={{minHeight: '100vh'}}>  
            <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
                <Menu/>
            </Sider>
            <Layout className={styles.contentLayout}>
                <NavHeader/>
                <div className={styles.contentContainer}>
                    <div className={styles.content}>
                        <Outlet/>
                    </div>
                    <TheFooter/>
                </div>
            </Layout>
        </Layout>
  
    )
}
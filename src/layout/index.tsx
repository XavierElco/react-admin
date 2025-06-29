import React from 'react';
import { Layout} from 'antd';
import { Outlet } from 'react-router-dom';
const { Header, Footer, Sider, Content } = Layout;
import styles from './index.module.less';
import NavHeader from './header/index';
import TheFooter from './footer/index';

export default function layoutContent() {
    return (
    <Layout style={{minHeight: '100vh'}}>
        <Sider>Sider</Sider>
        <Layout>
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
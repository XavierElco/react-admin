// 环境配置封装
const env = (import.meta.env.MODE || 'dev') as 'dev' | 'stg' | 'prd';
const config = {
dev: {
    baseApi: '/api',
    uploadApi: 'http://127.0.0.1:2021',
    cdn: 'http://xxx.aliyun.com',
    mock: true,
    mockApi: 'https://m1.apifoxmock.com/m1/5503761-5179910-default'
    },
    stg: {
    baseApi: '/api',
    uploadApi: 'http://api-driver-stg.marsview.cc',
    cdn: 'http://xxx.aliyun.com',
    mock: false,
    mockApi: 'https://m1.apifoxmock.com/m1/5503761-5179910-default'
    },
    prd: {
    baseApi: '/api',
    uploadApi: 'http://api-driver.marsview.cc',
    cdn: 'http://xxx.aliyun.com',
    mock: false,
    mockApi: 'https://m1.apifoxmock.com/m1/5503761-5179910-default'
    }
};

export default {
    env,
    ...config[env]
};
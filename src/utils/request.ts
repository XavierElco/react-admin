import axios from 'axios';
import { message } from 'antd';
import { AxiosError } from 'axios';
import env from '../config'

const baseURL = import.meta.env.VITE_BASE_URL // /api

// 创建请求的实例对象
const instance = axios.create({
    baseURL: baseURL, // 设置基础 URL，所有请求都会以 /api 为前缀
    timeout: 10000, // 设置请求超时时间
    timeoutErrorMessage: '请求超时',
    withCredentials: true, // 允许携带凭证
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
})

// 请求拦截器 - 在发送请求前执行
instance.interceptors.request.use(
    config => {
        // 从本地存储获取 token
        const token = localStorage.getItem('token')
        if(token) {
            config.headers.Authorization = token
        }

        if (import.meta.env.VITE_MOCK === 'true') {
            config.baseURL = env.mockApi
        } else {
            config.baseURL = env.baseApi
        }
        // 返回修改后的配置对象
        return {
            ...config,
        }
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    }
)

// 响应拦截器
instance.interceptors.response.use(
    response => {
        // 获取响应数据
        const data = response.data
        // 如果 code 为 50001，表示 token 过期，清除 token 并重定向到登录页
        if (data.code === 40001) {
            localStorage.removeItem('token')
            location.href = '/login'
        } else if (data.code !== 200) {
            // 如果 code 不为 200，显示错误信息
            return message.error(data.message)
        }
        // 返回实际的业务数据（去掉外层包装）
        return data.data
    },
    (error: AxiosError) => {
        // 处理响应错误
        return Promise.reject(error)
    }
)

// 导出封装好的请求方法
export default {
    get<T>(url: string, params?:object): Promise<T> {
        return instance.get(url, { params })
    },
    post<T>(url: string, params?:object): Promise<T> {
        return instance.post(url, params )
    },
    put<T>(url: string, params?:object): Promise<T> {
        return instance.put(url, params )
    },
    delete<T>(url: string, params?:object): Promise<T> {
        return instance.post(url, { params })
    }
}
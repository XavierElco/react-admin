import type { ILoginParams, IDeptList, IDeptSearch, IUserList } from "../types/index";
import request from "../utils/request";

export default {
    // 登录
    login: (params: ILoginParams) => {
        return request.post('/users/login', params)
    },

    //  获取部门列表信息 
    getDeptList: (params?: IDeptSearch) => {
        return request.get<IDeptList[]>('/dept/list', params)
    },

    // 获取用户列表信息
    getUserList: () => {
        return request.get<IUserList[]>('/users/list')
    },

    // 获取所有用户信息
    getAllUserList: () => {
        return request.get<IUserList[]>('/users/all/list')
    },

    // 创建部门
    createDept: (params: IDeptList) => {
        return request.post('/dept/create', params)
    },

    // 编辑部门
    updateDept: (params: IDeptList) => {
        return request.post('/dept/edit', params)
    },

    // 删除部门
    deleteDept: (id: string) => {
        return request.post(`/dept/delete`, {_id: id})
    }
} 
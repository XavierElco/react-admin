import type { 
    ILoginParams, 
    IDeptList, 
    IDeptSearch, 
    IUserList, 
    IMenuList, 
    IEditMenu, 
    ICreateMenu, 
    IMenuSearch,
    IRoleSearchParams,
} from "../types/index";
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
    },

    // 获取菜单列表
    getMenuList: (params?: IMenuSearch) => {
        return request.get<IMenuList[]>('/menu/list', params)
    },

    // 创建菜单
    createMenu: (params: ICreateMenu) => {
        return request.post('/menu/create', params)
    },

    // 编辑菜单
    editMenu: (params: IEditMenu) => {
        return request.post('/menu/edit', params)
    },

    // 删除菜单
    deleteMenu: (id: string) => {
        return request.post(`/menu/delete`, {_id: id})
    },

    // 获取角色
    getRoleList: (params?: IRoleSearchParams) => {
        return request.get('/roles/list', params);
    },
} 
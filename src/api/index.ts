import type { ILoginParams, IDeptList, IDeptSearch } from "../types/index";
import request from "../utils/request";

export default {
    // 登录
    login: (params: ILoginParams) => {
        return request.post('/users/login', params)
    },

    //获取部门列表信息 
    getDeptList: (params?: IDeptSearch) => {
        return request.get<IDeptList[]>('/dept/list', params)
    }
} 
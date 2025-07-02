// 登录模块
export interface ILoginParams {
    userName: string;
    userPwd: string;
}

// 部门列表模块
export interface IDeptList {
    _id: string;
    deptName: string;
    userName: string;
    parentId: string;
    createId: number;
    updateTime: string;
    createTime: string;
    children: IDeptList[];
}
// 部门列表模块
export interface IDeptSearch {
    deptName: string;
}
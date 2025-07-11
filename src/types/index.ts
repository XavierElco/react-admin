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

// 用户列表模块
export interface IUserList {
    _id: string;
    userId: number;
    userName: string;
    userEmail: string;
    deptId: string;
    state: number;
    mobile: string;
    job: string;
    role: number;
    roleList: string;
    createId: number;
    deptName: string;
    userImg: string;
}

export interface IMenuList {
    _id: string;
    menuType: number;
    menuName: string;
    path: string;
    icon: string;
    orderBy: number;
    menuState: number;
    parentId: string;
    createId: number;
    createTime: string;
    updateTime: string;
    __v: number;
}
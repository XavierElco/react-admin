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

export interface IMenuList extends ICreateMenu {
    _id: string;
    children?: IMenuList[];
    createTime: string;
    updateTime: string;
    buttons?: IMenuList[];
}

// 编辑菜单
export interface IEditMenu extends ICreateMenu {
    _id: string;
}

// 菜单搜索
export interface IMenuSearch {
    menuName: string;
    menuState: number;
}

// 创建菜单
export interface ICreateMenu {
    menuName: string; // 菜单名称
    path: string; // 菜单路径
    menuState: number;
    parentId: string;
    orderBy: number;
    menuType: number; // 菜单类型 1.菜单 2.按钮 3.页面
    menuCode: string; // 菜单权限表示
    component: string; // 组件名称
    icon?: string; // 菜单图标

}

// 更新菜单
export interface IUpdateMenu {
    _id: string;
    menuName: string;
    path: string;
}
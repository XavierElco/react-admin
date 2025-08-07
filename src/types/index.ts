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

// 菜单列表获取
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

// 分页设置
export interface IPageParams {
    pageNum: number;
    pageSize: number;
}

// 角色模块
export interface IRole {
    _id: string;
    roleName: string;
    remark: string;
    permissionList: {
        checkedKeys: string[];
        halfCheckedKeys: string[];
    };
    createTime: string;
    updateTime: string;
}

// 角色搜索参数
export interface IRoleSearchParams extends IPageParams {
    roleName?: string;
}

// 角色创建参数
export interface IRoleCreateParams {
    roleName: string;
    remark: string;
}

// 角色编辑参数
export interface IRoleEditParams extends IRoleCreateParams {
    _id: string;
}

// 权限模块
export interface IPermission {
    _id: string;
    permissionList: {
        checkedKeys: string[];
        halfCheckedKeys: string[];
    };
}

export interface ResultData<T> {
    list: T[];
    page: {
        total: number | 0;
        pageNum: number;
        pageSize: number;
    };
}

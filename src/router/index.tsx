import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from '../views/Login/login';
import Welcome from '../views/Welcome/welcome';
import Error404 from '../views/Error/NotFound404';
import Error403 from '../views/Error/NoRight403';
import Layout from '../layout/index';
import Dashboard from '../views/dashboard/index';
import UserList from '../views/user/userList/index';
import DeptList from '../views/user/deptList/index';
import MenuList from '../views/user/menuList/index';
import RoleList from '../views/user/roleList/index';
import User from '../views/user/index';



const router = [
    {
        element: <Layout/>,
        children: [
            {
                path: 'welcome',
                element:<Welcome/>,
                errorElement:<Error404/>
            },
            {
                path: 'dashboard',
                element:<Dashboard/>,
                errorElement:<Error404/> 
            },
            {
                path: 'user',
                element:<UserList/>,
                errorElement:<Error404/>,
            },
            {
                path: 'user/userList',
                element:<UserList/>,
                errorElement:<Error404/>
            },
            {
                path: 'user/deptList',
                element:<DeptList/>,
                errorElement:<Error404/>
            },
            {
                path: 'user/menuList',
                element:<MenuList/>,
                errorElement:<Error404/>
            },
            {
                path: 'user/roleList',
                element:<RoleList/>,
                errorElement:<Error404/>
            },
             
            
        ]
    },
    {
        path: '/',
        element: <Navigate to="/login" replace />,
        errorElement:<Error404/>
    },
    {
        path: '/login',
        element:<Login/>,
        errorElement:<Error404/>
    },
    {
        path: '/welcome',
        element:<Welcome/>,
        errorElement:<Error404/>
    },
    {
        path: '*',
        element: <Navigate to='/404'/>
    },
    {
        path: '/404',
        element: <Error404/>
    },
    {
        path: '/403',
        element: <Error403/>
    },
]

export default createBrowserRouter(router);
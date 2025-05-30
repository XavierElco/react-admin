import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from '../views/Login/login';
import Welcome from '../views/Welcome/welcome';
import Error404 from '../views/Error/NotFound404';
import Error403 from '../views/Error/NoRight403';


const router = [
    {
        path: '/',
        element:<Login/>,
        errorElement:<Error404/>
    },
    {
        path: '/login',
        element:<Welcome/>,
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
    }
]

export default createBrowserRouter(router);
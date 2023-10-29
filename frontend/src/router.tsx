import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import LayoutPrincipal from "./layout/LayoutPrincipal";
import Home from "./pages/Home/Home";
import { RequireAuth } from "./context/Auth/RequireAuth";
import Private from "./pages/Private/Private";
import { TableUsuarios } from "./components/SIdebar/Usuarios/TableUsuarios";
// import { Users } from "./components/Sidebar/Users";


const router = createBrowserRouter (
    [
        {
            path: '/',
            element: <Navigate to = "/login"/>
        },

        {
            
           

                  
                    element: <RequireAuth/>,
                    children:[
                                    {
                                    path:'/login', 
                                    element:<Login/>
                                    },
                                    {
                                    path: '/private',
                                    element: <LayoutPrincipal/>,
                                    children: [
                                            {
                                                path:'private/usuario', 
                                                element:<TableUsuarios/>
                                            },
                                            {
                                                path:'private/teste', 
                                                element:<h1>teste</h1>
                                            },    

                                            {
                                                path:'private/produtos', 
                                                element:<h1>produtos</h1>
                                            },    
                                    ]
                                    }
                                    
                    
                
            ],
            
        },



    ]
);
export default router;
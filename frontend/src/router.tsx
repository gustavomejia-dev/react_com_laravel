import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import LayoutPrincipal from "./layout/LayoutPrincipal";
import Home from "./pages/Home/Home";
import { RequireAuth } from "./context/Auth/RequireAuth";
import Private from "./pages/Private/Private";


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
                                                element:<h1>Usuarios</h1>,
                                            },
                                            {
                                                path:'private/teste', 
                                                element:<h1>teste</h1>
                                            },    
                                    ]
                                    }
                                    
                    
                
            ],
            
        },



    ]
);
export default router;
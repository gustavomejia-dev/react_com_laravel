import { Navigate, createBrowserRouter, useParams } from "react-router-dom";
import Login from "./pages/Login/Login";
import LayoutPrincipal from "./layout/LayoutPrincipal";
import Home from "./pages/Home/Home";
import { RequireAuth } from "./context/Auth/RequireAuth";
import Private from "./pages/Private/Private";
import { TableUsuarios } from "./components/Sidebar/Usuarios/TableUsuarios";
import { Produtos } from "./components/Sidebar/Cadastrar/Produtos";
import { PageNotFound } from "./components/PageNotFound/PageNotFound";
import { getTenant } from "./utils/helpers";
import { DashboardPrincipal } from "./components/Dashboard/Principal";

// import { Users } from "./components/Sidebar/Users";


const tenant = getTenant();

const router = createBrowserRouter (
    
    [
            
        {
            path: '/',
            element: <Navigate to = "/login"/>
            
        },
        {
            path:'/login', 
            element:<Login/>
        },
        {
            
           

                  
                    element: <RequireAuth/>,
                    
                    
                    children:[
                                   
                                    {
                                    element: <LayoutPrincipal/>,
                                    path: `/private`,
                                    
                                    children: [
                                            {
                                                path:`/private`, 
                                                element:<DashboardPrincipal/>
                                            },
                                            {
                                                path:`usuario`, 
                                                element:<TableUsuarios/>
                                            },
                                            {
                                                path:`teste`, 
                                                element:<h1>teste</h1>
                                            },    

                                            {
                                                path:'cadastrar/produtos', 
                                                element:<Produtos/>
                                            },    
                                    ]
                                    }
                                    
                    
                
            ],
            
        },

        {
            path: '*',
            element: <PageNotFound messageDefault={false}/>
        },

    ],  {basename : `/${tenant}`}
);
export default router;
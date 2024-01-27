import { Navigate, createBrowserRouter, useParams } from "react-router-dom";
import Login from "./pages/Login/Login";
import LayoutPrincipal from "./layout/LayoutPrincipal";
import Home from "./pages/Home/Home";
import { RequireAuth } from "./context/Auth/RequireAuth";
import Private from "./pages/Private/Private";
import { TableUsuarios } from "./components/Sidebar/Usuarios/TableUsuarios";
import { Produtos } from "./components/Sidebar/Cadastrar/Produtos";
import { PageNotFound } from "./components/PageNotFound/PageNotFound";

// import { Users } from "./components/Sidebar/Users";

const parsedData = window.location.pathname.split("/"); 
let domain = parsedData[1];
console.log('dominio' + domain);

const router = createBrowserRouter (
    
    [
            
        {
            path: '/:tenant/',
            element: <Navigate to = "/:tenant/login"/>
            
        },
        {
            path:'/:tenant/login', 
            element:<Login/>
        },
        {
            
           

                  
                    element: <RequireAuth/>,
                    
                    
                    children:[
                                   
                                    {
                                    element: <LayoutPrincipal/>,
                                    path: `${domain}/private`,
                                    
                                    children: [
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

    ]
);
export default router;
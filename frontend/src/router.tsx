import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import LayoutPrincipal from "./layout/LayoutPrincipal";
import Home from "./pages/Home/Home";
import { RequireAuth } from "./context/Auth/RequireAuth";
import Private from "./pages/Private/Private";


const router = createBrowserRouter (
    [
     
        {
            
            path: '/',
            element: <LayoutPrincipal/>,
            children:[
                {
                    path:'/home',
                    element:<Home/>
                },

                    {   
                        element: <RequireAuth/>,
                        children:[
                                        {
                                        path:'/login', 
                                        element:<Login/>
                                        },
                                        

                                        {
                                            path:'/private',
                                            element: <Private/>
                                        }
                                        ]
                        
                    }

            ],
            
        },



    ]
);
export default router;
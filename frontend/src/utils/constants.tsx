import { Router } from "react-router-dom";
import Login from "../pages/Login/Login";
import router from "../router";
import { AuthProvider } from "../context/Auth/AuthProvider";

export const APPS = [
    {
        subDomain: "www",
        app: AuthProvider,
        main: true,
        

    },
    {
        subdomain: "admin",
        app: 'AdminRouter',
        main: false,

    }
]
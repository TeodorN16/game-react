import { createContext } from "react";
import { logout } from "../api/auth-api";

const AuthContext = createContext({
    accessToken:'', 
    user:{},
    isAuthenticated:false,
    register(){},
    login(){},
    logout(){},
});

export default AuthContext;
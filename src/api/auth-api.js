import { authRequest } from "../utills/request"

export const register = async({email,password})=>{
    return authRequest('/signup',"POST",{email,password})
}
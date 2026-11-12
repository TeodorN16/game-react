import request from "../utills/request"

export const getAll=(accessToken)=>{
    return request("/games?order=created_at.desc","GET",null,{
        headers:{
            ...getAuthHeader
        }
    })
}
export const create = (data,accessToken)=>{
    return request("/games", "POST", data, {
        headers:{

            ...getAuthHeader(accessToken)
        }
    })
}
export const remove = async(gameId,accessToken)=>{
    await request(`/games?id=eq.${gameId}`, "DELETE",null,{
        headers: {
           ...getAuthHeader(accessToken)
        }
    });
}
function getAuthHeader(accessToken){
    return {
        
            ...(accessToken ? {Authorization:`Bearer ${accessToken}`}:{})
        
    }
}

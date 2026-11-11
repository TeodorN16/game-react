
const restUrl = 'https://ljitxmnujzhqmcvdmnej.supabase.co/rest/v1'
const authUrl = 'https://ljitxmnujzhqmcvdmnej.supabase.co/auth/v1'
const apiKey = import.meta.env.VITE_API_KEY

async function baseRequest(url,path='/',method="GET",data=null,opts={}){
    const options = {
        ...opts,
        headers:{
            ...opts.headers,
            apiKey,
            
        },
    };

    if(method!=="GET"){
        options.method=method;
    }
    if(data){
        options.headers['Content-Type']='application/json';
        options.body = JSON.stringify(data);
    }
    const response = await fetch(`${url}${path}`,options)

    if(!response.ok){
        throw new Error("something wrong with response")

    }
    if([204,201].includes(response.status)){
        return null;
    }
    
    return response.json()

}
export default async function request(path="/",method="GET",data=null,opts={}){
   return baseRequest(restUrl,path,method,data,opts)
}
export const authRequest=baseRequest.bind(null,authUrl);
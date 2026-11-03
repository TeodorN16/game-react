const url = 'https://ljitxmnujzhqmcvdmnej.supabase.co/rest/v1'
const apiKey = import.meta.env.VITE_API_KEY

export default async function request(path="/",method="GET",data=null,opts={}){
    const options = {
        headers:{
            apiKey,
        },
        ...opts
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
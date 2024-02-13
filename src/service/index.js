import axios from "axios"


async function GetApiRequest(payload){
    try {
        let _result = await axios.get(payload?.url)
        return {
            status:true,
            response:_result.data
        }
    } catch (error) {
        return{ 
            status:false,
            error
        }
    }
}

async function PostApiRequest(payload){
    console.log("PostApiRequest",payload)
    try {
        let _result = await axios.post(payload?.url,payload?.body)
        return {
            status:true,
            response:_result.data
        }
    } catch (error) {
        return{ 
            status:false,
            error
        }
    }
}

export default {
    GetApiRequest,
    PostApiRequest
}
import { serverMutation } from "../server";

export const subscription=async(data)=>{
    const res=await serverMutation(`/api/subscription`,'POST',data)
    return res;
}
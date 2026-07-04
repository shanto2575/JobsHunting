import { serverMutation } from "@/lib/server"

export const BookMark=async(bookmark)=>{
    const res=await serverMutation(`/api/bookmark`,'POST',bookmark)
    return res;
}
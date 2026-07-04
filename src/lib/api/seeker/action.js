import { serverMutation } from "@/lib/server"

export const BookMark=async(bookmark)=>{
    const res=await serverMutation(`/api/bookmark`,'POST',bookmark)
    return res;
}

export const Report=async(report)=>{
    const res=await serverMutation(`/api/report-jobs`,'POST',report)
    return res;
}
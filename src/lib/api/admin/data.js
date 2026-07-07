import { serverFetch } from "@/lib/server"

export const UserData=async()=>{
    const res=await serverFetch(`/api/manage-user`);
    return res;
}

export const BlockData=async()=>{
    const res=await serverFetch(`/api/black-user`);
    return res;
}

export const AllJobs=async()=>{
    const res=await serverFetch(`/api/manage-jobs`)
    return res;
}
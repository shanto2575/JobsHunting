import { serverFetch } from "@/lib/server"

export const UserData=async()=>{
    const res=await serverFetch(`/api/manage-user`);
    return res;
}
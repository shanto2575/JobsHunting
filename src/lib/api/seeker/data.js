import { serverFetch } from "@/lib/server"

export const AllJobs=async()=>{
    const res=await serverFetch(`/api/alljobs`)
    return res;
}


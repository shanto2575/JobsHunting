import { serverFetch } from "@/lib/server"

export const AllJobs=async()=>{
    const res=await serverFetch(`/api/alljobs`)
    return res;
}

export const GetSingleJob = async (id) => {
    const res = await serverFetch(`/api/alljobs/${id}`);
    return res.result;
};
import { serverFetch } from "@/lib/server"

export const EmployerPostedJobs=async(email)=>{
    const res=await serverFetch(`/api/employer/postedjobs/${email}`)
    return res;
}
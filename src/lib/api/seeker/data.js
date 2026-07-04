import { serverFetch } from "@/lib/server"

export const AllJobs=async()=>{
    const res=await serverFetch(`/api/alljobs`)
    return res;
}

export const AppliedJobs=async(email)=>{
    console.log(email,'email applied')
    const data=await serverFetch(`/api/seeker/applied-jobs/${email}`)
    console.log(data,'data applied')
    return data;
    
}

export const GetBookmarks = async (userId) => {
    return await serverFetch(`/api/bookmark/${userId}`);
};

export const GetReports = async (userId) => {
    return await serverFetch(`/api/report-jobs/${userId}`);
};
import { serverFetch } from "@/lib/server"

export async function AdminProfile() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/profile`,
        {
            cache: "no-store",
        }
    );

    return res.json();
}

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

export const AdminAnalytics = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/analytics`,
        {
            cache: "no-store",
        }
    );

    const data = await res.json();

    return data.analytics;
};
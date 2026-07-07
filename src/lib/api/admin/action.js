import { baseUrl } from "@/lib/baseUrl";
import { serverMutation } from "@/lib/server";

export const DeleteUser = async (id) => {
    const res = await fetch(`${baseUrl}/api/user-account/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json()
    return data;
}

export const BlockAccount = async (id, newStatus) => {
    const res = await fetch(
        `${baseUrl}/api/manage-user/block/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status: newStatus,
            }),
        }
    );
    const data = await res.json();
    return data;
}

export const ManageJobs = async (id, status) => {
    const res = await fetch(
        `${baseUrl}/api/admin/jobs/status/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status }),
        }
    );

    const data = await res.json();
    return data;
}

export const DeleteJobs=async(id)=>{
    const res=await fetch(`${baseUrl}/api/admin/jobs/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        }
    })
    const data=await res.json()
    return data;
}
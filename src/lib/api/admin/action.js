'use server'
import { auth } from "@/lib/auth";
import { baseUrl } from "@/lib/baseUrl";
import { headers } from "next/headers";

export const DeleteUser = async (id) => {
    const { token } = await auth.api.getToken({
        headers: await headers()
    })
    const res = await fetch(`${baseUrl}/api/user-account/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        }
    })
    const data = await res.json()
    return data;
}

export const BlockAccount = async (id, newStatus) => {
    const { token } = await auth.api.getToken({
        headers: await headers()
    })
    const res = await fetch(
        `${baseUrl}/api/manage-user/block/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
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
    const { token } = await auth.api.getToken({
        headers: await headers()
    })
    const res = await fetch(
        `${baseUrl}/api/admin/jobs/status/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ status }),
        }
    );

    const data = await res.json();
    return data;
}

export const DeleteJobs = async (id) => {
    const { token } = await auth.api.getToken({
        headers: await headers()
    })
    const res = await fetch(`${baseUrl}/api/admin/jobs/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        }
    })
    const data = await res.json()
    return data;
}
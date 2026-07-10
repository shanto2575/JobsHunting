// 'use client'
// import { authClient } from "@/lib/auth-client";
'use server'
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { baseUrl } from "@/lib/baseUrl";
import { serverFetch } from "@/lib/server"

export const EmployProfile = async (id) => {
    const res = await serverFetch(`/api/profile/${id}`)
    return res;

}

export const EmployerPostedJobs = async (email) => {
    const res = await serverFetch(`/api/employer/postedjobs/${email}`)
    return res;
}

export const employerApplicants = async (id) => {
    const res = await fetch(
        `${baseUrl}/api/employer/applicants/${id}`,
        {
            cache: "no-store",
        }
    );

    return res.json();
};

export const DeleteEmployerPostedJobs = async (id) => {
    const { token } = await auth.api.getToken({
        headers: await headers()
    })

    // const tokenData = await authClient.token();

    // const token = tokenData?.data?.token;

    const res = await fetch(`${baseUrl}/api/employer/postedjob/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        }
    })
    const result = res.json()
    return result
}

export async function EmployerAnalytics(email) {

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/employer/analytics/${email}`,
        {
            cache: "no-store",
        }
    );

    return res.json();

}
'use server'
import { auth } from "@/lib/auth";
import { serverMutation } from "@/lib/server";
import { headers } from "next/headers";

export const AddJobs = async (jobs) => {
    const { token } = await auth.api.getToken({
        headers: await headers()
    })
    const res = await serverMutation('/api/employer/postsjob', 'POST', jobs, token);
    return res;
}

export const UpdatedJobs = async (data, id) => {

    const { token } = await auth.api.getToken({
        headers: await headers()
    })
    const res = await serverMutation(`/api/employer/postedjob/${id}`, 'PATCH', data, token);
    return res;
}

export const EmployerApplicantsStatus = async (userId, status, jobId) => {
    const { token } = await auth.api.getToken({
        headers: await headers()
    })
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/employer/applicants/status`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                jobId,
                userId,
                status,
            }),
        }
    );
    const result = await res.json();
    return result;
}


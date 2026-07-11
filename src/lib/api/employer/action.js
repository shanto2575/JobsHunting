'use server'
import { auth } from "@/lib/auth";
import { baseUrl } from "@/lib/baseUrl";
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
    const res = await fetch(
        `${baseUrl}/api/employer/applicants/status`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
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



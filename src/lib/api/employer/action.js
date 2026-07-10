'use server'
import { auth } from "@/lib/auth";
import { serverMutation } from "@/lib/server";
import { headers } from "next/headers";

export const AddJobs = async (jobs) => {
    const { token } = await auth.api.getToken({
        headers: await headers()
    })
    const res = await serverMutation('/api/employer/postsjob', 'POST', jobs,token);
    return res;
}

export const UpdatedJobs = async (data, id) => {

    const { token } = await auth.api.getToken({
        headers: await headers()
    })
    const res = await serverMutation(`/api/employer/postedjob/${id}`, 'PATCH', data, token);
    return res;
}


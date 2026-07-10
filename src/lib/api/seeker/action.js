'use server'
import { auth } from "@/lib/auth"
import { serverMutation } from "@/lib/server"
import { headers } from "next/headers"

export const BookMark = async (bookmark) => {
    const { token } = await auth.api.getToken({
        headers: await headers()
    })
    const res = await serverMutation(`/api/bookmark`, 'POST', bookmark, token)
    return res;
}

export const Report = async (report) => {
    const { token } = await auth.api.getToken({
        headers: await headers()
    })
    const res = await serverMutation(`/api/report-jobs`, 'POST', report, token)
    return res;
}

export const EditsProfiles = async (id, data) => {
    const res = await serverMutation(`/api/Edits-Profile/${id}`, 'PATCH', data)
    return res;
}
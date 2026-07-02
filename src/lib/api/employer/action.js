import { serverMutation } from "@/lib/server";

export const AddJobs = async (jobs) => {
    const res = await serverMutation('/api/employer/postsjob', 'POST', jobs);
    return res;
}

export const UpdatedJobs = async (data, id) => {
    const res = await serverMutation(`/api/employer/postedjob/${id}`, 'PATCH', data);
    return res;
}


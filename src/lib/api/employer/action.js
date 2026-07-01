import { serverMutation } from "@/lib/server";

export const AddJobs = async (jobs) => {
    const res = await serverMutation('/api/employer/postsjob', 'POST', jobs);
    return res;
}
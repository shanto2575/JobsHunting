import { baseUrl } from "@/lib/baseUrl";
import { serverFetch } from "@/lib/server"

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
    const res = await fetch(`${baseUrl}/api/employer/postedjob/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const result = res.json()
    return result
}
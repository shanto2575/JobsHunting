import { baseUrl } from "@/lib/baseUrl";

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

export const BlockAccount = async (id,newStatus) => {
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
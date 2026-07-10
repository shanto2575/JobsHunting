import { baseUrl } from "./baseUrl"

export const serverMutation = async (path, method, data, token) => {
    const res = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    const result = await res.json();

    if (!res.ok) {
        return result;
    }

    return result;
}


export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`, {
        cache: "no-store"
    });
    return res.json();
}
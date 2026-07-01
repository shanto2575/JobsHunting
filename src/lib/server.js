import { baseUrl } from "./baseUrl"

export const serverMutation = async (path, method, data) => {
    const res = await fetch(`${baseUrl}${path}`, {
        method:method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (!res.ok) {
        throw new Error("Failed to fetch");
    }

    return res.json()
}
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export const getUser = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    return session?.user;
};

export const roleValidator = async (role) => {
    const user = await getUser();

    if (!user || user.role !== role) {
        redirect("/unauthorized");
    }

    return user;
};
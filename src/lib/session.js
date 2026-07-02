import { headers } from "next/headers";
import { auth } from "./auth";

export const getUser = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    return session?.user;
}

// export const roleValidator = async (role) => {
//     const user = await getUser();
//     // console.log(role, user?.role);

//     if (!user || user.role !== role) {
//         redirect('/unauthorized');
//     }
// };

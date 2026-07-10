import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: request.headers,
    });
    // console.log(session, ' proxy')

    if (!session?.user) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (session.user.status === "blocked") {
        await auth.api.signOut({
            headers: request.headers,
        });

        return NextResponse.redirect(new URL("/blocked", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/jobs/:path',]
}
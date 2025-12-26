import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("strapi_jwt")?.value;
    const { pathname } = req.nextUrl;

    if (token && (pathname === "/login" || pathname === "/register")) {
        const url = req.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = { matcher: ["/login", "/register"] };

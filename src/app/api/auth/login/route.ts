import { NextResponse } from "next/server";

const STRAPI_URL = process.env.STRAPI_URL!;

export async function POST(req: Request) {
    const body = await req.json().catch(() => ({}));
    const identifier = String(body.identifier ?? body.email ?? "").trim(); // email hoặc username
    const password = String(body.password ?? "");

    if (!identifier || !password) {
        return NextResponse.json({ ok: false, message: "Thiếu thông tin" }, { status: 400 });
    }

    const r = await fetch(`${STRAPI_URL}/api/auth/local`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
        cache: "no-store",
    });

    const data = await r.json().catch(() => null);

    if (!r.ok || !data?.jwt) {
        return NextResponse.json(
            { ok: false, message: data?.error?.message ?? "Sai tài khoản hoặc mật khẩu", data },
            { status: r.status || 401 }
        );
    }

    const res = NextResponse.json({ ok: true, user: data.user });
    res.cookies.set("strapi_jwt", data.jwt, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    });
    return res;
}

import { NextResponse } from "next/server";

const STRAPI_URL = process.env.STRAPI_URL!;

export async function POST(req: Request) {
    const body = await req.json().catch(() => ({}));
    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");
    const username = String(body.username ?? email.split("@")[0] ?? "").trim();

    if (!email || !email.includes("@")) {
        return NextResponse.json({ ok: false, message: "Email không hợp lệ" }, { status: 400 });
    }
    if (password.length < 6) {
        return NextResponse.json({ ok: false, message: "Password tối thiểu 6 ký tự" }, { status: 400 });
    }

    const r = await fetch(`${STRAPI_URL}/api/auth/local/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
        cache: "no-store",
    });

    const data = await r.json().catch(() => null);

    if (!r.ok || !data?.jwt) {
        return NextResponse.json(
            { ok: false, message: data?.error?.message ?? "Register failed", data },
            { status: r.status || 400 }
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

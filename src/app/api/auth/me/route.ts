import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const STRAPI_URL = process.env.STRAPI_URL!;

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get("strapi_jwt")?.value;

    if (!token) return NextResponse.json({ ok: false }, { status: 401 });

    const r = await fetch(`${STRAPI_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
    });

    const data = await r.json().catch(() => null);
    if (!r.ok) return NextResponse.json({ ok: false, data }, { status: r.status });

    return NextResponse.json({ ok: true, user: data });
}

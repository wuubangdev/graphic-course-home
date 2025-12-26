"use client";

import { useRouter } from "next/navigation";
import { Button } from "antd";
import { useState } from "react";

export default function LogoutButton() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    return (
        <Button
            loading={loading}
            onClick={async () => {
                setLoading(true);
                await fetch("/api/auth/logout", { method: "POST" });
                setLoading(false);
                router.push("/login");
                router.refresh();
            }}
        >
            Logout
        </Button>
    );
}

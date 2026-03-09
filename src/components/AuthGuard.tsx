"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // Allow access to login, register, and admin pages without auth
        if (pathname === "/login" || pathname === "/register" || pathname.startsWith("/admin")) {
            setAuthorized(true);
            return;
        }

        // Attempt to recover user from localStorage if context is empty
        const storedUser = localStorage.getItem("ac_course_user");

        if (!user && !storedUser) {
            // Redirect to login if no user found
            router.push("/login");
        } else {
            setAuthorized(true);
        }
    }, [user, pathname, router]);

    // Show nothing while checking auth status to prevent flash of content
    if (!authorized) {
        return null;
    }

    return <>{children}</>;
}

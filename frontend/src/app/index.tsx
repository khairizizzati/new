"use client"; // If using the app directory

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Or next/router for pages router

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/signup"); // Redirects to signup
  }, [router]);

  return <div>Redirecting to Signup...</div>;
}

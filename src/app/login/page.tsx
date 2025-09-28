"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoginForm } from "@/components/login-form";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession(); 

  useEffect(() => {
    if (!isPending && session?.user) {
      router.push("/"); 
    }
  }, [session, isPending, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
      <LoginForm />
    </div>
  );
}


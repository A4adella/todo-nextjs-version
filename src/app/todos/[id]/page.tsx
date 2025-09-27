"use client";

import loadable from "next/dynamic";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const TodoDetail = loadable(() => import("@/components/TodoDetail"), {
  loading: () => <div className="text-center mt-10">Loading...</div>,
  ssr: false,
});

export default function TodoDetailPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div className="text-center mt-10">Checking session...</div>;
  }

  if (!session) {
    // either show message:
    // return <div className="text-red-500 text-center mt-10">Please log in to view this page.</div>;

    // OR redirect to signup/login:
    router.push("/signup");
    return null;
  }

  return <TodoDetail />;
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";


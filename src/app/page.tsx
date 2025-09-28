

"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import dynamic from "next/dynamic";
import { useEffect } from "react"; 

const TodoList = dynamic(() => import("@/components/todolist"), {
  loading: () => <div className="text-center mt-10">Loading...</div>,
});

export default function HomePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  // Use useEffect to handle the side effect of navigation
  useEffect(() => {
    // Only redirect if the session is not pending and no session data exists
    if (!isPending && !session) {
      router.push("/signup");
    }
  }, [isPending, session, router]); // Dependency array to re-run effect on changes

  if (isPending) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!session) {
    // Return null or a loading state while the redirect is happening
    return null;
  }

  return <TodoList />; // Render for authenticated users
}


"use client";

import loadable from "next/dynamic";

const TodoDetail = loadable(() => import("@/components/TodoDetail"), {
  loading: () => <div className="text-center mt-10">Loading...</div>,
  ssr: false,
});

export default function TodoDetailPage() {
  return <TodoDetail />;
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";



"use client";

import dynamic from "next/dynamic";

const TodoDetail = dynamic(() => import("@/pages/TodoDetail"), {
  loading: () => <div className="text-center mt-10">Loading...</div>,
});

export default function TodoDetailPage() {
  return <TodoDetail />;
}

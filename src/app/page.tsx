"use client";

import dynamic from "next/dynamic";

const TodoList = dynamic(() => import("../components/todolist"), {
  loading: () => <div className="text-center mt-10">Loading...</div>,
});

export default function HomePage() {
  return <TodoList />;
}


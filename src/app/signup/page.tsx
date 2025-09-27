"use client";

import SignupForm from "@/components/signup-form";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
         <header className="mb-8 text-center mt-10">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">TodoMaster</h1>
        <p className="text-gray-600">Create Todos, Create balance.</p>
      </header>
      <SignupForm />
    </div>
  );
}

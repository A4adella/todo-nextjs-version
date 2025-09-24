"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="text-center mt-10">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Try again
      </button>
    </div>
  );
}


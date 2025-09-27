"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import {
  CheckCircle,
  XCircle,
  ArrowLeft,
  ClipboardList,
} from "lucide-react";

const fetchTodo = async (id) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
  return response.data;
};

export default function TodoDetail() {
   const params = useParams(); 
  const id = params?.id as string;

  const {
    data: todo,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todo", id],
    queryFn: () => fetchTodo(id),
    enabled: !!id, // don’t run query if id is undefined
  });

  if (isLoading) {
    return (
      <Card className="p-6 max-w-xl mx-auto mt-10 border-gray-300">
        <Skeleton className="h-6 w-2/3 mb-4" />
        <Skeleton className="h-4 w-1/3 mb-2" />
        <Skeleton className="h-10 w-24" />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6 max-w-xl mx-auto mt-10 text-red-500 border-gray-300">
        <XCircle className="w-6 h-6 inline mr-2" />
        Error fetching todo.
      </Card>
    );
  }

  return (
    <Card className="p-6 max-w-xl mx-auto mt-10 space-y-6 w-1/2 border-gray-300" >
      <div className="flex items-center gap-3 text-indigo-700 ">
        <ClipboardList className="w-7 h-7" />
        <h2 className="text-2xl font-bold">Todo Details</h2>
      </div>

      <div className="space-y-3">
        <h3 className="font-bold font-inter text-lg">Title:</h3>
        <p className="text-lg font-semibold text-gray-800">{todo.title}</p>
        <div className="flex items-center gap-2">
          {todo.completed ? (
            <CheckCircle className="text-green-600 w-5 h-5" />
          ) : (
            <XCircle className="text-red-600 w-5 h-5" />
          )}
          <Badge
          variant="outline"
            className={`text-xs ${
              todo.completed
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {todo.completed ? "Completed" : "Incomplete"}
          </Badge>
        </div>
      </div>

      <Button size="default" asChild variant="outline" className="flex items-center gap-2 h-8 border-gray-300">
        <Link href="/">
          <ArrowLeft className="w-4 h-4" />
          Back to List
        </Link>
      </Button>
    </Card>
  );
}

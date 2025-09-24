import React, { useState } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Search, Trash2, CheckCircle } from "lucide-react";
import { Pen } from "lucide-react";
import Link from "next/link";
import { Input } from "./ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import EditTodoModal from "./EditTodoModal";
import AddTodo from "./addtodo";


const TODOS_PER_PAGE = 10;
// -----------------------------
// Safe fetch with cache handling
// -----------------------------
const fetchTodos = async () => {
  // ✅ Guard against SSR
  if (typeof window !== "undefined") {
    const cachedTodos = localStorage.getItem("cachedTodos");

    if (cachedTodos) {
      try {
        console.log("Loaded from localStorage");
        return JSON.parse(cachedTodos);
      } catch (err) {
        console.error("❌ Failed to parse cache:", err);
        localStorage.removeItem("cachedTodos");
      }
    }
  }

  // Always fetch fresh from API
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos"
  );
  const todos = response.data;

  // ✅ Cache only if client-side
  if (typeof window !== "undefined") {
    localStorage.setItem("cachedTodos", JSON.stringify(todos));
    console.log("Fetched from API and cached");
  }

  return todos;
};


// -----------------------------
// Search Input component
// -----------------------------
interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchQuery,
  setSearchQuery,
}) => (
  <div className="relative w-full">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
    <Input
      type="text"
      placeholder="Search todos..."
      className="border rounded py-2 pl-10 pr-3 border-gray-300 w-full"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>
);

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// -----------------------------
// TodoList main component
// -----------------------------
function TodoList() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
    const [hasCache, setHasCache] = useState(() => {
    if (typeof window !== "undefined") {
      return Boolean(localStorage.getItem("cachedTodos"));
    }
    return false;
  });

  const closeEditModal = () => setEditingTodo(null);

  const {
    data: todos = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    staleTime: 1000 * 60 * 5,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const deleteTodo = useMutation({
    mutationFn: (id: number) =>
      axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this todo?")) {
      deleteTodo.mutate(id);
    }
  };

  // -----------------------------
  // Safe filtering + pagination
  // -----------------------------
  const safeTodos = Array.isArray(todos) ? todos : [];
  const filteredTodos = safeTodos.filter(
    (todo: { title: string; completed: boolean }) => {
      const matchesSearch = todo.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesFilter =
        filterStatus === "all"
          ? true
          : filterStatus === "complete"
          ? todo.completed
          : !todo.completed;

      return matchesSearch && matchesFilter;
    }
  );

  const totalPages = Math.max(1, Math.ceil(filteredTodos.length / TODOS_PER_PAGE));
  const startIndex = (currentPage - 1) * TODOS_PER_PAGE;
  const currentTodos = filteredTodos.slice(
    startIndex,
    startIndex + TODOS_PER_PAGE
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  // -----------------------------
  // Loading state
  // -----------------------------
  if (isLoading) {
    return (
      <Card className="p-6 max-w-3xl mx-auto border-gray-300">
        <Skeleton className="h-6 w-1/2 mb-4" />
        {[...Array(10)].map((_, i) => (
          <Skeleton key={i} className="h-4 w-full mb-2" />
        ))}
      </Card>
    );
  }

  // -----------------------------
  // Error state
  // -----------------------------
  if (error) {
    return (
      <Card className="p-6 max-w-3xl mx-auto text-center space-y-4 border-gray-300">
        <AddTodo />
        <p className="text-red-500 font-bold">Failed to fetch todos.</p>
        <Button
          onClick={() =>
            queryClient.invalidateQueries({ queryKey: ["todos"] })
          }
          variant="outline"
          className=""
          size="default"
        >
          Retry
        </Button>
      </Card>
    );
  }

  // -----------------------------
  // Main UI
  // -----------------------------
 return (
    <>
      <header className="mb-8 text-center mt-10">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">TodoMaster</h1>
        <p className="text-gray-600">Create Todos, Create balance.</p>
      </header>

  <AddTodo />


         <Card className="p-6 max-w-3xl mx-auto bg-white shadow ml-10px border-gray-300">
        <h1 className="text-2xl font-bold text-center text-indigo-600 mb-4">
          Todo List
        </h1>

        {/* Filter and Search */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6 border-grey-300 cursor-pointer">
          <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          <Select
            name="filter-status"
            value={filterStatus}
            onValueChange={setFilterStatus}
          >
            <SelectTrigger className="border cursor-pointer bg-white/30 border-grey-300 rounded w-full md:w-[180px] lg:w-[200px] px-3 py-2  border-gray-300">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent className="border border-gray-300 z-10 bg-white">
              <SelectItem value="all" className="hover:cursor-pointer hover:bg-blue-300" >All</SelectItem>
              <SelectItem value="complete" className="hover:cursor-pointer hover:bg-blue-300">Completed</SelectItem>
              <SelectItem value="incomplete" className="hover:cursor-pointer hover:bg-blue-300" >Incomplete</SelectItem>
            </SelectContent>
          </Select>
        </div>
    

        {/* Todo List */}
        <ul className="space-y-4 border-gray-300">
          {currentTodos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center p-4 border rounded-xl group hover:shadow transition-shadow border-gray-300"
            >
              <Link
                href={`/todos/${todo.id}`}
                className="flex items-center space-x-2"
              >
                <CheckCircle
                  className={`h-5 w-5 ${
                    todo.completed ? "text-green-500" : "text-gray-400"
                  }`}
                />
                <span
                  className={todo.completed ? "line-through text-gray-500" : ""}
                >
                  {todo.title}
                </span>
              </Link>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingTodo(todo)}
                  aria-label="Edit todo"
                  className="hover:bg-grey-800 cursor-pointer border-white-300"
                >
                  <Pen />
                </Button>

                <Badge
                  className={`${todo.completed
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"}`} variant={undefined}                >
                  {todo.completed ? "Complete" : "Incomplete"}
                </Badge>

                <Button
                  variant="destructive"
                  size="icon"
                  aria-label="Delete Todo"
                  className="ml-2 hover: cursor-pointer bg-indigo-500"
                  onClick={() => handleDelete(todo.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>

        {/* No match message */}
        {currentTodos.length === 0 && (
          <div className="text-center mt-6">
            <Search className="mx-auto h-10 w-10 text-gray-400" />
            <p className="text-gray-500">
              No todos found matching your criteria.
            </p>
          </div>
        )}

        <EditTodoModal editingTodo={editingTodo} onClose={closeEditModal} />

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <Button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            variant="outline"
            className="hover:text-gray-500 cursor-pointer bg-indigo-600 text-white" size={undefined}          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            variant="outline"
            className="hover:text-gray-500 cursor-pointer bg-indigo-600 text-white" size={undefined}          >
            Next
          </Button>
        </div>
      </Card>
      <footer>{hasCache && (
    <div className="flex justify-center mb-4">
    <Button
            onClick={() => {
              setHasCache(false);
              localStorage.removeItem("cachedTodos");
              queryClient.invalidateQueries({ queryKey: ["todos"] });
            } }
            variant="outline"
            className="text-sm"
            aria-label="Refresh Todos" size={undefined}    >
    Refresh Todos 
    </Button>
  </div>
)} 
</footer>
    </>
  );
}

export default TodoList;



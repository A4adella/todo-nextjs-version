import { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Todo ={
  id: number,
  title: string,
  completed: boolean,
  userId: number
}

function EditTodoModal({ editingTodo, onClose }: { editingTodo: Todo | null; onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setCompleted(editingTodo.completed);
      setError(""); // Reset any previous error
    }
  }, [editingTodo]);

  const updateTodo = useMutation({
    mutationFn: (updatedTodo: Todo) =>
      axios.put(`https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`, updatedTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      onClose();
    },
  });

  const handleUpdate = () => {
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    if (editingTodo) {
      updateTodo.mutate({
        ...editingTodo,
        title,
        completed,
      });
    }
  };

  return (
   <Dialog open={!!editingTodo} onOpenChange={onClose}>
  <DialogContent
    className="
      bg-white 
      max-w-md w-full 
      p-6 
      rounded-xl 
      shadow-xl 
      border border-gray-200 
      data-[state=open]:animate-in 
      data-[state=closed]:animate-out 
      data-[state=open]:fade-in-0 
      data-[state=closed]:fade-out-0
    "
  >
    <DialogHeader className="header">
      <DialogTitle className="text-lg font-semibold text-gray-900">
        Edit Todo
      </DialogTitle>
      <DialogDescription className="text-sm text-gray-500">
        Change Todo details
      </DialogDescription>
    </DialogHeader>

    <div className="space-y-4 mt-4">
      {/* Title Input */}
      <div>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Edit title"
          aria-invalid={!!error}
          className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
        />
        {error && (
          <p className="text-sm text-red-500 mt-1" role="alert">
            {error}
          </p>
        )}
      </div>

      {/* Checkbox */}
      <div className="flex items-center gap-2">
        <Checkbox
          checked={completed}
          onCheckedChange={(val) => setCompleted(Boolean(val))}
          id="completed"
          className="border-gray-300 rounded focus:ring-indigo-500"
        />
        <label htmlFor="completed" className="text-sm text-gray-700">
          Mark as completed
        </label>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <Button
          size="sm"
          variant="outline"
          onClick={onClose}
          className="px-4 py-2 text-gray-700 border-gray-300 hover:bg-gray-50"
        >
          Cancel
        </Button>
        <Button
        variant="outline"
          size="sm"
          onClick={handleUpdate}
          disabled={updateTodo.isPending}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-sm disabled:opacity-50"
        >
          {updateTodo.isPending ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  </DialogContent>
</Dialog>

  );
}

export default EditTodoModal;


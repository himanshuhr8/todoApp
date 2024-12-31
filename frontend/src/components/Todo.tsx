import React, { useState } from "react";
import delete_icon from "../assets/delete";
import tick from "../assets/tick";
import edit from "../assets/edit";
import axios from "axios";

interface TodoProps {
  title: string;
  description: string;
  completed: boolean;
  id: Number;
  onRefresh: () => void;
}

const Todo: React.FC<TodoProps> = ({
  title,
  description,
  completed,
  id,
  onRefresh,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editCompleted, setEditCompleted] = useState(completed);
  const [error, setError] = useState<string | null>(null);

  const validateInput = () => {
    if (editTitle.trim().length < 3) {
      setError("Title must be at least 3 characters long.");
      return false;
    }
    setError(null); // Clear error if validation passes
    return true;
  };

  const updateTodo = async () => {
    try {
      await axios.put(
        "http://localhost:3000/api/v1/todo/update",
        {
          todoId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Todo updated successfully!");
      onRefresh();
    } catch (e) {
      alert("Internal server error");
    }
  };

  const deleteTodo = async () => {
    try {
      await axios.put(
        "http://localhost:3000/api/v1/todo/delete",
        {
          todoId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Todo deleted successfully!");
      onRefresh();
    } catch (e) {
      alert("Internal server error");
    }
  };

  const editTodo = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh
    if (!validateInput()) {
      return; // Do not proceed if validation fails
    }
    try {
      await axios.put(
        `http://localhost:3000/api/v1/todo/edit`,
        {
          todoId: id,
          title: editTitle,
          description: editDescription,
          completed: editCompleted,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Todo updated successfully!");
      setIsEditing(false); // Close the form
      onRefresh(); // Refresh todos
    } catch (error) {
      alert("Internal server error");
    }
  };

  return (
    <div
      className={`relative max-w-sm rounded overflow-hidden shadow-lg p-4 bg-slate-50 hover:bg-slate-100 flex flex-col justify-between ${
        completed ? "opacity-50" : ""
      }`}
    >
      {isEditing ? (
        // Editing Form
        <form onSubmit={editTodo} className="flex flex-col space-y-2">
          <label className="font-bold text-lg">Edit Todo</label>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="p-2 border rounded"
            placeholder="Title"
          />
          {error && (
            <span className="text-red-500 text-sm">{error}</span> // Error message
          )}
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="p-2 border rounded"
            placeholder="Description"
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={editCompleted}
              onChange={(e) => setEditCompleted(e.target.checked)}
            />
            <label>Completed</label>
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-green-400 text-white rounded"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-red-400 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="absolute right-1 top-1">
            <button onClick={() => setIsEditing(true)}>{edit}</button>
          </div>
          <div
            className={`font-bold text-xl mb-2 ${
              completed ? "line-through" : ""
            }`}
          >
            {title}
          </div>
          <p
            className={`text-gray-700 text-base ${
              completed ? "line-through" : ""
            }`}
          >
            {description}
          </p>
          <div className="mt-4 flex flex-row justify-around">
            <button onClick={updateTodo}>{tick}</button>
            <button onClick={deleteTodo}>{delete_icon}</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Todo;

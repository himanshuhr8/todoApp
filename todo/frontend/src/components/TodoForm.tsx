import React, { useState } from "react";
import axios from "axios";

interface ProfileProps {
  onUpdate: (message: string) => void;
  onCancel: () => void;
}

const TodoForm: React.FC<ProfileProps> = ({ onUpdate, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState("");
  const handleSubmit = async () => {
    if (title.length < 1) {
      setTitleError("Title must not be empty");
      return;
    }
    setTitleError("");

    try {
      const response = await axios.post<{ message: string }>(
        "http://localhost:3000/api/v1/todo/add",
        {
          title: title,
          description: description,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      onUpdate(response.data.message);
    } catch (e) {
      alert("Internal server error");
      onCancel();
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Add Todo</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          placeholder="Enter title"
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-2 py-1"
        />
        {titleError && (
          <p className="text-red-500 text-sm mt-1">{titleError}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          placeholder="Enter description"
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <div className="flex justify-around">
        <button
          onClick={handleSubmit}
          className="bg-blue-400 text-white px-4 py-2 rounded"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="bg-red-400 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TodoForm;

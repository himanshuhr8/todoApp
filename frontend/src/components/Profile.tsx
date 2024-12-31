import React, { useState } from "react";
import axios from "axios";

interface User {
  email: string;
  firstName: string;
  lastName: string;
}

interface ProfileProps {
  user: User;
  onUpdate: (message: string) => void;
  onCancel: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate, onCancel }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async () => {
    // Password validation check
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }

    setPasswordError(""); // Clear any previous error

    try {
      const response = await axios.put<{ message: string }>(
        "http://localhost:3000/api/v1/user/update",
        {
          firstName: firstName,
          lastName: lastName,
          password: password,
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
      <h2 className="text-lg font-bold mb-4">Profile</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={user.email}
          disabled
          className="w-full border rounded px-2 py-1 bg-white"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded px-2 py-1"
          placeholder="Enter new password"
        />
        {passwordError && (
          <p className="text-red-500 text-sm mt-1">{passwordError}</p>
        )}
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

export default Profile;

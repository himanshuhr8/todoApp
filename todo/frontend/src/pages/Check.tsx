import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  email: String;
  firstName: string;
  lastName: string;
}

export default function Check() {
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const response = await axios.get<{
          user: User;
        }>("http://localhost:3000/api/v1/user/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.user.email) {
          navigate("/dashboard");
        } else {
          navigate("/signup");
        }
      } catch (err) {
        navigate("/signup");
      }
    };
    checkAuthorization();
  }, [navigate]);

  return null; // No UI is rendered for this component
}

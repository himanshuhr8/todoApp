import { useEffect, useState } from "react";
import Todo from "../components/Todo";
import axios from "axios";
import Appbar from "../components/Appbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import plus from "../assets/plus";
import TodoForm from "../components/TodoForm";
// Define types
interface TodoType {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}
interface UserType {
  email: string;
  firstName: string;
  lastName: string;
}

export default function Dashboard() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [isAddTodo, setIsAddTodo] = useState(false);
  const [user, setUser] = useState<UserType>({
    email: "",
    firstName: "",
    lastName: "",
  });
  const navigate = useNavigate();

  // Fetch Todos
  const fetchTodos = async () => {
    try {
      const response = await axios.get<{ todos: []; message: string }>(
        "http://localhost:3000/api/v1/todo/todos",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.data.message === "Unauthorized") navigate("/");
      setTodos(response.data.todos);
    } catch (e) {
      // Handle error
    }
  };

  // Fetch User Profile
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get<{ user: UserType; message: string }>(
        "http://localhost:3000/api/v1/user/profile",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.data.message === "Unauthorized") navigate("/");
      setUser(response.data.user);
    } catch (e) {
      navigate("/");
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchTodos();
  }, []);

  // Handle Add Todo action
  const handleAddTodo = () => {
    setIsAddTodo(true);
  };

  return (
    <div className="h-screen flex flex-col">
      <Appbar user={user} />
      <div className="bg-slate-300 h-screen">
        <div className="grid grid-cols-4 gap-5 p-4">
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              title={todo.title}
              description={todo.description}
              completed={todo.completed}
              id={todo.id}
              onRefresh={fetchTodos}
            />
          ))}
        </div>
      </div>
      <button
        onClick={handleAddTodo}
        className="fixed bottom-24 right-10 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600"
      >
        {plus}
      </button>
      {isAddTodo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-slate-200 p-6 rounded shadow-md w-96">
            <TodoForm
              onUpdate={(message) => {
                setIsAddTodo(false);
                alert(message);
                navigate("/");
              }}
              onCancel={() => setIsAddTodo(false)}
            />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

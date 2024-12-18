import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import Check from "./pages/Check";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Check />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

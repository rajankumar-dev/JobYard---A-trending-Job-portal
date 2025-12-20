import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Login from "./pages/Login.jsx";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

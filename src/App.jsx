import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import MainContent from "./components/MainContent";
import { UserProvider } from "./components/UserContext";
import "./App.css";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={<MainContent />} />
      </Routes>
    </UserProvider>
  );
}

export default App;

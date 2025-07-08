import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import HomePage from "./Homepage";
import Editarperfil from "./editarperfil";

function App() {
  return (
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/editarperfil" element={<Editarperfil />} />
      
      </Routes>
  );
}

export default App;


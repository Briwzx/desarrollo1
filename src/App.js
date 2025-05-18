import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import HomePage from "./Homepage"; // Asegúrate de que el nombre del archivo sea correcto

function App() {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} /> {/* Nueva ruta */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
     
    </Routes>
  );
}

export default App;


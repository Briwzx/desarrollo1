import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import HomePage from "./Homepage";
import Editarperfil from "./editarperfil";
import Soporte from "./soporte";
import Adminpanel from "./Adminpanel";

function App() {
  return (
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/editarperfil" element={<Editarperfil />} />
        <Route path="/soporte" element={<Soporte />} />
        <Route path="/admin" element={<Adminpanel />} />

      </Routes>
  );
}

export default App;


import { useState } from "react";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");

  const handleCaptchaChange = (token) => {
  setCaptchaToken(token);
};
  
 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !password || !captchaToken) {
    setError("Por favor completa todos los campos. Y verifica el CAPTCHA.");
    return;
  }

  try {
    const response = await fetch("http://localhost:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, captchaToken }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Inicio de sesión exitoso");
      window.open("/home", "_blank");
    } else {
      setError(data.error || "Error al iniciar sesión");
    }
  } catch (err) {
    setError("Error de red o del servidor.");
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-extrabold text-center text-blue-700 mb-2">
          Mega Empleos
        </h1>
        <p className="text-center text-gray-600 mb-6 font-medium">
          Inicia sesión para continuar
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <ReCAPTCHA sitekey="6Lfhy1QrAAAAALJjTFLesR9JN89qkad5mf4mX_aU" onChange={handleCaptchaChange}/>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-md transition"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="mt-4 text-sm text-center text-gray-600 space-y-2">
          <p className="hover:underline cursor-pointer font-medium">
            ¿Olvidaste tu contraseña?
          </p>
          <p className="font-medium">
            ¿No tienes cuenta?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}


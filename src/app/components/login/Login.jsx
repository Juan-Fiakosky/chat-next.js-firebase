import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import "./login.css";

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);

	// Verificar el estado de autenticación
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setUser(user);
		});
		return () => unsubscribe();
	}, []);

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(auth, email, password);
			console.log("Usuario autenticado correctamente");
			navigate("/chat");
		} catch (error) {
			console.error("Error de autenticación de usuario", error);
			setError(error.message);
		}
	};

	return (
		<form className="container-login" onSubmit={handleLogin}>
			<h2>Bienvenido al Chat</h2>
			<input
				type="email"
				placeholder="Correo electrónico"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Contraseña"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>

			<button type="submit">Iniciar sesión</button>
			{error && <p className="error-message">{error}</p>}

			<Link to="/registrarse">¿No tienes cuenta? Regístrate aquí</Link>
		</form>
	);
};

export default Login;

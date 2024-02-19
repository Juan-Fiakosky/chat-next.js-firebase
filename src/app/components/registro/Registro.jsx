// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth, firestore } from "../../../lib/firebase";
// import { doc, setDoc } from "firebase/firestore";
// import "./registro.css";

// const Registro = () => {
// 	const navigate = useNavigate();
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [error, setError] = useState(null);

// 	const handleRegistro = async (e) => {
// 		e.preventDefault();
// 		try {
// 			// Crea el usuario en Firebase Auth
// 			const userCredential = await createUserWithEmailAndPassword(
// 				auth,
// 				email,
// 				password
// 			);

// 			// Obtiene el ID del usuario
// 			const userId = userCredential.user.uid;

// 			// Guarda la información en Firestore
// 			await setDoc(doc(firestore, "users", userId), {
// 				email: email,
// 				password: password,
// 			});

// 			console.log("Usuario creado correctamente");
// 			navigate("/");
// 		} catch (error) {
// 			console.error("Error al crear cuenta de usuario", error);
// 			setError(error.message);
// 		}
// 	};

// 	return (
// 		<form className="container-registro" onSubmit={handleRegistro}>
// 			<h2>Crea tu cuenta</h2>
// 			<input
// 				type="email"
// 				placeholder="Correo electrónico"
// 				value={email}
// 				onChange={(e) => setEmail(e.target.value)}
// 			/>
// 			<input
// 				type="password"
// 				placeholder="Contraseña"
// 				value={password}
// 				onChange={(e) => setPassword(e.target.value)}
// 			/>

// 			<button type="submit">Crear cuenta</button>
// 			{error && <p className="error-message">{error}</p>}
// 		</form>
// 	);
// };

// export default Registro;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import "./registro.css";

const Registro = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);

	const handleRegistro = async (e) => {
		e.preventDefault();
		try {
			if (typeof document !== "undefined") {
				// Crea el usuario en Firebase Auth
				const userCredential = await createUserWithEmailAndPassword(
					auth,
					email,
					password
				);

				// Obtiene el ID del usuario
				const userId = userCredential.user.uid;

				// Guarda la información en Firestore
				await setDoc(doc(firestore, "users", userId), {
					email: email,
					password: password,
				});

				console.log("Usuario creado correctamente");
				navigate("/");
			}
		} catch (error) {
			console.error("Error al crear cuenta de usuario", error);
			setError(error.message);
		}
	};

	return (
		<form className="container-registro" onSubmit={handleRegistro}>
			<h2>Crea tu cuenta</h2>
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

			<button type="submit">Crear cuenta</button>
			{error && <p className="error-message">{error}</p>}
		</form>
	);
};

export default Registro;

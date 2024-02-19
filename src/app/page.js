"use client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReduxProvider from "../store";
import Login from "./components/login/Login.jsx";
import Chat from "./components/chat/Chat.jsx";
import Registro from "./components/registro/Registro.jsx";

const Home = () => {
	return (
		<BrowserRouter>
			<ReduxProvider>
				<Routes>
					<Route path="/registrarse" element={<Registro />} />
					<Route path="/chat" element={<Chat />} />
					<Route path="/" element={<Login />} />
				</Routes>
			</ReduxProvider>
		</BrowserRouter>
	);
};

export default Home;

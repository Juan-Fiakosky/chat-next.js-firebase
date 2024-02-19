// import { connect } from "react-redux";
// import { useState, useEffect } from "react";
// import { auth } from "../../../lib/firebase";
// import { db } from "../../../lib/firebase";
// import {
// 	collection,
// 	addDoc,
// 	query,
// 	orderBy,
// 	onSnapshot,
// } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import "./chat.css";

// const Chat = ({ messages, loadMessages }) => {
// 	const [message, setMessage] = useState("");
// 	const [loading, setLoading] = useState(true);
// 	const [messageHistory, setMessageHistory] = useState([]);
// 	const navigate = useNavigate();

// 	const sendMessage = async () => {
// 		const currentUser = auth.currentUser;
// 		const senderName = currentUser ? currentUser.displayName : "Juan";

// 		try {
// 			await addDoc(collection(db, "messages"), {
// 				text: message,
// 				sender: senderName,
// 				timestamp: new Date(),
// 			});
// 			setMessage("");
// 			setMessageHistory([...messageHistory, message]);
// 		} catch (error) {
// 			console.error("Error al enviar mensaje:", error);
// 		}
// 	};

// 	useEffect(() => {
// 		if (loading) {
// 			const unsubscribe = loadMessages();
// 			setLoading(false);
// 			return () => unsubscribe();
// 		}
// 	}, [loading, loadMessages]);

// 	const handleSalir = () => {
// 		auth
// 			.signOut()
// 			.then(() => {
// 				navigate("/");
// 			})
// 			.catch((error) => {
// 				console.error("Error al cerrar sesión:", error);
// 			});
// 	};

// 	return (
// 		<div className="chat-container">
// 			<button className="btn-salir" onClick={handleSalir}>
// 				Salir
// 			</button>
// 			<div className="text-message">
// 				{messageHistory.map((msg, index) => (
// 					<div key={index} className="message">
// 						<strong>Tú</strong>: {msg}
// 					</div>
// 				))}
// 			</div>
// 			<div className="message-container">
// 				{messages.map((msg, index) => (
// 					<div key={index} className="message">
// 						<strong>{msg.sender}</strong>: {msg.text}
// 					</div>
// 				))}
// 			</div>
// 			<div className="input-container">
// 				<input
// 					type="text"
// 					placeholder="Escribe tu mensaje..."
// 					value={message}
// 					onChange={(e) => setMessage(e.target.value)}
// 				/>
// 				<button onClick={sendMessage}>Enviar</button>
// 			</div>
// 		</div>
// 	);
// };

// const mapStateToProps = (state) => ({
// 	messages: state.chat.messages,
// });

// const mapDispatchToProps = (dispatch) => ({
// 	loadMessages: () => {
// 		const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
// 		return onSnapshot(q, (querySnapshot) => {
// 			const loadedMessages = [];
// 			querySnapshot.forEach((doc) => {
// 				loadedMessages.unshift(doc.data());
// 			});
// 			dispatch({ type: "LOAD_MESSAGES", payload: loadedMessages });
// 		});
// 	},
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Chat);

import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { auth } from "../../../lib/firebase";
import { db } from "../../../lib/firebase";
import {
	collection,
	addDoc,
	query,
	orderBy,
	onSnapshot,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./chat.css";

const Chat = ({ messages, loadMessages }) => {
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(true);
	const [messageHistory, setMessageHistory] = useState([]);
	const navigate = useNavigate();

	const sendMessage = async () => {
		const currentUser = auth.currentUser;
		const senderName = currentUser ? currentUser.displayName : "Juan";

		try {
			await addDoc(collection(db, "messages"), {
				text: message,
				sender: senderName,
				timestamp: new Date(),
			});
			setMessage("");
			setMessageHistory([...messageHistory, message]);
		} catch (error) {
			console.error("Error al enviar mensaje:", error);
		}
	};

	useEffect(() => {
		if (loading) {
			const unsubscribe = loadMessages();
			setLoading(false);
			return () => unsubscribe();
		}
	}, [loading, loadMessages]);

	const handleSalir = () => {
		auth
			.signOut()
			.then(() => {
				navigate("/");
			})
			.catch((error) => {
				console.error("Error al cerrar sesión:", error);
			});
	};

	useEffect(() => {
		if (typeof document !== "undefined") {
			const handleClick = () => {
				console.log("Clicked");
			};

			document.addEventListener("click", handleClick);

			return () => {
				document.removeEventListener("click", handleClick);
			};
		}
	}, []);

	return (
		<div className="chat-container">
			<button className="btn-salir" onClick={handleSalir}>
				Salir
			</button>
			<div className="text-message">
				{messageHistory.map((msg, index) => (
					<div key={index} className="message">
						<strong>Tú</strong>: {msg}
					</div>
				))}
			</div>
			<div className="message-container">
				{messages.map((msg, index) => (
					<div key={index} className="message">
						<strong>{msg.sender}</strong>: {msg.text}
					</div>
				))}
			</div>
			<div className="input-container">
				<input
					type="text"
					placeholder="Escribe tu mensaje..."
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button onClick={sendMessage}>Enviar</button>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	messages: state.chat.messages,
});

const mapDispatchToProps = (dispatch) => ({
	loadMessages: () => {
		const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
		return onSnapshot(q, (querySnapshot) => {
			const loadedMessages = [];
			querySnapshot.forEach((doc) => {
				loadedMessages.unshift(doc.data());
			});
			dispatch({ type: "LOAD_MESSAGES", payload: loadedMessages });
		});
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);

"use client";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuracion Firebase
const firebaseConfig = {
	apiKey: "AIzaSyCYUj8jjPPJTuK6FN_N67WR1DCllxNgAK0",
	authDomain: "chat-db993.firebaseapp.com",
	projectId: "chat-db993",
	storageBucket: "chat-db993.appspot.com",
	messagingSenderId: "945610920284",
	appId: "1:945610920284:web:2991a6fc961f0da5b4b199",
	measurementId: "G-PQ672EQYS3",
};

// Iniciar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const firestore = getFirestore(app);

export { auth, db, firestore };

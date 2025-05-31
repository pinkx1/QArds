import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { CardsList } from "./pages/CardsList";
import { Landing } from "./pages/Landing";
import { Card, AppState } from "./types";
import { qaCards } from "./data/cards";
import "./styles/dark-theme.css";
import { AccountPage } from "./pages/AccountPage";

export function App() {
	const browserLang = navigator.language.startsWith("ru") ? "ru" : "en";

	const defaultState: AppState = {
		cards: qaCards,
		currentCardIndex: 0,
		showAnswer: false,
		shuffleMode: false,
		selectedCategory: "all",
		language: browserLang,
	};

	const saved = localStorage.getItem("qards-state");
	const [appState, setAppState] = useState<AppState>(saved ? JSON.parse(saved) : defaultState);
	const originalCardsRef = useRef<Card[]>(qaCards);

	const [userEmail, setUserEmail] = useState<string | null>(null);

	// универсальная функция
	const checkAuth = () => {
		const token = localStorage.getItem("token");
		if (token) {
			try {
				const payload = JSON.parse(atob(token.split(".")[1]));
				setUserEmail(payload.email);
			} catch {
				localStorage.removeItem("token");
				setUserEmail(null);
			}
		} else {
			setUserEmail(null);
		}
	};

	useEffect(() => {
		localStorage.setItem("qards-state", JSON.stringify(appState));
	}, [appState]);

	// при первом запуске
	useEffect(() => {
		checkAuth();
		// слушаем кастомное событие после логина
		window.addEventListener("auth-update", checkAuth);
		return () => {
			window.removeEventListener("auth-update", checkAuth);
		};
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("token");
		setUserEmail(null);
	};

	return (
		<div className="min-h-screen bg-gray-50 w-full">
			<Router>
				<Routes>
					<Route path="/" element={<Landing appState={appState} setAppState={setAppState} userEmail={userEmail} onLogout={handleLogout} setUserEmail={setUserEmail} />} />
					<Route path="/flashcards" element={<Home appState={appState} setAppState={setAppState} originalCards={originalCardsRef.current} />} />
					<Route path="/cards" element={<CardsList appState={appState} setAppState={setAppState} />} />
					<Route path="/account" element={<AccountPage userEmail={userEmail} />} />
				</Routes>
			</Router>
		</div>
	);
}

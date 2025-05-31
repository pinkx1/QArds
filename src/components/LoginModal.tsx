import React, { useState } from "react";
import { Modal } from "./Modal";
import "./Auth.css";
import { t } from "../i18n";

interface LoginModalProps {
	isOpen: boolean;
	onClose: () => void;
	language: "en" | "ru";
	setRegisterOpen: () => void;
	setUserEmail: (email: string) => void;
}

export function LoginModal({ isOpen, onClose, language, setRegisterOpen, setUserEmail }: LoginModalProps) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const API = import.meta.env.VITE_API_BASE_URL;

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const res = await fetch(`${API}/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			const data = await res.json();

			if (!res.ok) {
				alert(data.message || "Login failed");
				return;
			}

			localStorage.setItem("token", data.token);
			setUserEmail(data.email); // на случай, если нужно мгновенно
			window.dispatchEvent(new Event("auth-update")); // 🔄 триггер App.tsx
			onClose();
		} catch (err) {
			alert("Something went wrong. Please try again.");
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<h2>{t(language, "login")}</h2>
			<form onSubmit={handleLogin} className="auth-form">
				<input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
				<input type="password" placeholder={t(language, "password")} required value={password} onChange={(e) => setPassword(e.target.value)} />
				<button type="submit">{t(language, "logIn")}</button>
			</form>

			<p className="auth-switch">
				{t(language, "noAccount")}{" "}
				<button
					type="button"
					className="auth-switch-button"
					onClick={() => {
						onClose();
						setRegisterOpen();
					}}
				>
					{t(language, "register")}
				</button>
			</p>
		</Modal>
	);
}

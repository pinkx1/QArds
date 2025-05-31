import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Header.css";

interface HeaderProps {
	onLogin?: () => void;
	onLogout?: () => void;
	userEmail?: string | null;
}

export function Header({ onLogin, onLogout, userEmail }: HeaderProps) {
	return (
		<header className="header">
			<div className="container header-inner">
				<Link to="/" className="logo-link">
					<img src={logo} alt="QAhead logo" className="app-logo" />
				</Link>

				<div className="header-right">
					{userEmail ? (
						<>
							<Link to="/account" className="login-button">
								Account
							</Link>
							<button className="login-button" onClick={onLogout}>
								Logout
							</button>
						</>
					) : (
						<button className="login-button" onClick={onLogin}>
							Log in
						</button>
					)}
				</div>
			</div>
		</header>
	);
}

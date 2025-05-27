import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

import './Header.css'

export function Header({ onLogin }: { onLogin: () => void }) {
  return (
    <header className="header">
  <div className="container header-inner">
    <Link to="/" className="logo-link">
      <img src={logo} alt="QAhead logo" className="app-logo" />
    </Link>

    <div className="header-right">
        <button className="login-button" onClick={onLogin}>
    Log in
  </button>
    </div>
  </div>
</header>

  )
}

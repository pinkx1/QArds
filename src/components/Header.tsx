import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

import './Header.css'

export function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo-link" title="Go to homepage">
			<img src={logo} alt="QAhead logo" className="app-logo" />
        </Link>
      </div>
    </header>
  )
}

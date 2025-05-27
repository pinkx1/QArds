import React from 'react'
import { Link } from 'react-router-dom'
import logoLight from '../assets/logo-light.png'
import logoDark from '../assets/logo-dark.png'
import './Header.css'

export function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo-link" title="Go to homepage">
          <img src={logoLight} alt="QArds logo" className="app-logo logo-light" />
          <img src={logoDark} alt="QArds logo" className="app-logo logo-dark" />
        </Link>
      </div>
    </header>
  )
}

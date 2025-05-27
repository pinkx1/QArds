import React, { useState } from 'react'
import { Modal } from './Modal'
import './Auth.css'
import { t } from '../i18n'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  language: 'en' | 'ru'
  setRegisterOpen: () => void
}

export function LoginModal({ isOpen, onClose, language, setRegisterOpen }: LoginModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    // тут будет fetch-запрос позже
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>{t(language, 'login')}</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder={t(language, 'password')}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{t(language, 'logIn')}</button>
      </form>

      <p className="auth-switch">
        {t(language, 'noAccount')}{' '}
        <button
          type="button"
          className="auth-switch-button"
          onClick={() => {
            onClose()
            setRegisterOpen()
          }}
        >
          {t(language, 'register')}
        </button>
      </p>
    </Modal>
  )
}

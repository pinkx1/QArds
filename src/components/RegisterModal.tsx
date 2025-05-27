import React, { useState } from 'react'
import { Modal } from './Modal'
import './Auth.css'
import { t } from '../i18n'

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
  language: 'en' | 'ru'
}

export function RegisterModal({ isOpen, onClose, language }: RegisterModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert(t(language, 'passwordsDontMatch'))
      return
    }
    // TODO: отправка данных на /api/register
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>{t(language, 'register')}</h2>
      <form onSubmit={handleRegister} className="auth-form">
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
        <input
          type="password"
          placeholder={t(language, 'confirmPassword')}
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">{t(language, 'register')}</button>
      </form>
    </Modal>
  )
}

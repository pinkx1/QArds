import React, { useEffect, useState } from 'react'
import { AppState } from '../types'
import { RotateCcwIcon, SunIcon, MoonIcon } from 'lucide-react'
import { t } from '../i18n'
import './Footer.css'

interface FooterProps {
  appState: AppState
  setAppState: React.Dispatch<React.SetStateAction<AppState>>
}

export function Footer({ appState, setAppState }: FooterProps) {
  const { language } = appState
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleLanguage = () => {
    setAppState((prev) => ({
      ...prev,
      language: prev.language === 'ru' ? 'en' : 'ru'
    }))
  }

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  const resetProgress = () => {
    const confirmMessage =
      language === 'ru'
        ? 'Вы уверены, что хотите сбросить весь прогресс?'
        : 'Are you sure you want to reset all progress?'

    if (confirm(confirmMessage)) {
      setAppState((prev) => ({
        ...prev,
        cards: prev.cards.map((card) => ({
          ...card,
          status: 'learning'
        })),
        currentCardIndex: 0,
        showAnswer: false
      }))
    }
  }

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-left">
          <button onClick={toggleLanguage} className="lang-button">
            {language.toUpperCase()}
          </button>
          <button onClick={toggleTheme} className="theme-button" title="Toggle theme">
            {theme === 'dark' ? <SunIcon className="icon" /> : <MoonIcon className="icon" />}
          </button>
        </div>
        <button
          onClick={resetProgress}
          title={t(language, 'reset')}
          className="reset-button"
        >
          <RotateCcwIcon className="icon" />
          <span>{t(language, 'reset')}</span>
        </button>
      </div>
    </footer>
  )
}

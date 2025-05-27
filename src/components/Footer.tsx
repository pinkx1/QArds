import React from 'react'
import { AppState } from '../types'
import { RotateCcwIcon } from 'lucide-react'
import { t } from '../i18n'
import './Footer.css'

interface FooterProps {
  appState: AppState
  setAppState: React.Dispatch<React.SetStateAction<AppState>>
}

export function Footer({ appState, setAppState }: FooterProps) {
  const { language } = appState

  const toggleLanguage = () => {
    setAppState((prev) => ({
      ...prev,
      language: prev.language === 'ru' ? 'en' : 'ru'
    }))
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
        <button onClick={toggleLanguage} className="lang-button">
          {language.toUpperCase()}
        </button>
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

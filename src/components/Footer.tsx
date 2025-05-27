import React from 'react'
import { AppState } from '../types'
import { RotateCcwIcon } from 'lucide-react'
import { t } from '../i18n'

interface FooterProps {
  appState: AppState
  setAppState: React.Dispatch<React.SetStateAction<AppState>>
}

export function Footer({
  appState,
  setAppState
}: FooterProps) {
  const { language } = appState

  const toggleLanguage = () => {
    setAppState(prev => ({
      ...prev,
      language: prev.language === 'ru' ? 'en' : 'ru'
    }))
  }

  const resetProgress = () => {
    const confirmMessage = language === 'ru'
      ? 'Вы уверены, что хотите сбросить весь прогресс?'
      : 'Are you sure you want to reset all progress?'

    if (confirm(confirmMessage)) {
      setAppState(prev => ({
        ...prev,
        cards: prev.cards.map(card => ({
          ...card,
          status: 'learning'
        })),
        currentCardIndex: 0,
        showAnswer: false
      }))
    }
  }

  return (
    <footer className="bg-white border-t border-gray-200 p-4">
      <div className="max-w-4xl mx-auto flex justify-end gap-3">
        <button
          onClick={toggleLanguage}
          className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {language.toUpperCase()}
        </button>
        <button
          onClick={resetProgress}
          title={t(language, 'reset')}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <RotateCcwIcon className="w-4 h-4" />
          <span className="hidden sm:inline">{t(language, 'reset')}</span>
        </button>
      </div>
    </footer>
  )
}

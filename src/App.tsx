import React, { useEffect, useState, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { CardsList } from './pages/CardsList'
import { Card, AppState } from './types'
import { qaCards } from './data/cards'
import './styles/dark-theme.css'

export function App() {
  const browserLang = navigator.language.startsWith('ru') ? 'ru' : 'en'

  const defaultState: AppState = {
    cards: qaCards,
    currentCardIndex: 0,
    showAnswer: false,
    shuffleMode: false,
    selectedCategory: 'all',
    language: browserLang
  }

  const saved = localStorage.getItem('qards-state')
  const [appState, setAppState] = useState<AppState>(
    saved ? JSON.parse(saved) : defaultState
  )

  // Храним оригинальный порядок карточек
  const originalCardsRef = useRef<Card[]>(qaCards)

  useEffect(() => {
    localStorage.setItem('qards-state', JSON.stringify(appState))
  }, [appState])

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                appState={appState}
                setAppState={setAppState}
                originalCards={originalCardsRef.current}
              />
            }
          />
          <Route
            path="/cards"
            element={<CardsList appState={appState} setAppState={setAppState} />}
          />
        </Routes>
      </Router>
    </div>
  )
}

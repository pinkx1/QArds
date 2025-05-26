import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { CardsList } from './pages/CardsList';
import { Card, AppState } from './types';
import { qaCards } from './data/cards'

export function App() {
const browserLang = navigator.language.startsWith('ru') ? 'ru' : 'en'

const [appState, setAppState] = useState<AppState>({
  cards: qaCards,
  currentCardIndex: 0,
  showAnswer: false,
  shuffleMode: false,
  selectedCategory: 'all',
  language: browserLang
})
  return <div className="min-h-screen bg-gray-50 w-full">
      <Router>
        <Routes>
          <Route path="/" element={<Home appState={appState} setAppState={setAppState} />} />
          <Route path="/cards" element={<CardsList appState={appState} setAppState={setAppState} />} />
        </Routes>
      </Router>
    </div>;
}
import React from 'react'
import { useEffect } from 'react'
import { Flashcard } from '../components/Flashcard'
import { ProgressCounter } from '../components/ProgressCounter'
import { Footer } from '../components/Footer'
import { AppState } from '../types'
import { ChevronLeftIcon, ChevronRightIcon, ShuffleIcon, FilterIcon } from 'lucide-react'
import { t } from '../i18n'
import './Home.css'
import logo from '../assets/logo.png'


interface HomeProps {
  appState: AppState
  setAppState: React.Dispatch<React.SetStateAction<AppState>>
}

export function Home({ appState, setAppState }: HomeProps) {
  const {
    cards,
    currentCardIndex,
    selectedCategory,
    shuffleMode,
    language
  } = appState

  const filteredCards = selectedCategory === 'all'
    ? cards
    : cards.filter(card => card.category === selectedCategory)

  const currentCard = filteredCards[currentCardIndex] || filteredCards[0]
  const categories = ['all', ...Array.from(new Set(cards.map(card => card.category)))]
  
  useEffect(() => {
    localStorage.setItem('qards-state', JSON.stringify(appState))
  }, [appState])

  const handleCardAction = (action: 'known' | 'needs-review') => {
    if (!currentCard) return
    const updatedCards = cards.map(card =>
      card.id === currentCard.id ? { ...card, status: action } : card
    )
    setAppState(prev => ({
      ...prev,
      cards: updatedCards,
      currentCardIndex: (currentCardIndex + 1) % filteredCards.length,
      showAnswer: false
    }))
  }

  const handleNavigation = (direction: 'prev' | 'next') => {
    const newIndex =
      direction === 'next'
        ? (currentCardIndex + 1) % filteredCards.length
        : currentCardIndex === 0
          ? filteredCards.length - 1
          : currentCardIndex - 1

    setAppState(prev => ({
      ...prev,
      currentCardIndex: newIndex,
      showAnswer: false
    }))
  }

  const toggleShuffle = () => {
    setAppState(prev => ({
      ...prev,
      shuffleMode: !prev.shuffleMode
    }))
  }

  const handleCategoryChange = (category: string) => {
    setAppState(prev => ({
      ...prev,
      selectedCategory: category,
      currentCardIndex: 0,
      showAnswer: false
    }))
  }

  return (
    <div className="home">
      <header className="home-header">
        <div className="container">
          <img alt="QArds logo" className="app-logo" />
        </div>
      </header>

      <main className="home-main">
        <div className="container">
          <ProgressCounter
            cards={filteredCards}
            language={language}
            shuffleMode={shuffleMode}
            selectedCategory={selectedCategory}
            categories={categories}
            onShuffleToggle={toggleShuffle}
            onCategoryChange={handleCategoryChange}
          />


          {currentCard && (
            <Flashcard
              card={currentCard}
              showAnswer={appState.showAnswer}
              onToggle={() =>
                setAppState(prev => ({ ...prev, showAnswer: !prev.showAnswer }))
              }
              onAction={handleCardAction}
              language={language}
            />
          )}
        </div>
      </main>

      <Footer appState={appState} setAppState={setAppState} />
    </div>
  )
}

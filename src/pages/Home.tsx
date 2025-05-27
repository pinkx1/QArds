import React from 'react'
import { Flashcard } from '../components/Flashcard'
import { ProgressCounter } from '../components/ProgressCounter'
import { Footer } from '../components/Footer'
import { AppState } from '../types'
import { ChevronLeftIcon, ChevronRightIcon, ShuffleIcon, FilterIcon } from 'lucide-react'
import { t } from '../i18n'
import './Home.css'

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
          <h1 className="app-title">{t(language, 'qards')}</h1>

          <div className="controls">
            <div className="category-select">
              <FilterIcon className="icon" />
              <select
                value={selectedCategory}
                onChange={e => handleCategoryChange(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? t(language, 'allCategories') : category}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={toggleShuffle}
              className={`shuffle-btn ${shuffleMode ? 'active' : ''}`}
            >
              <ShuffleIcon className="icon" />
              {t(language, 'shuffleMode')}
            </button>
          </div>
        </div>
      </header>

      <main className="home-main">
        <div className="container">
          <ProgressCounter cards={filteredCards} language={language} />

          <div className="navigation">
            <button
              onClick={() => handleNavigation('prev')}
              disabled={filteredCards.length <= 1}
              className="nav-btn"
            >
              <ChevronLeftIcon className="icon" />
              <span>{t(language, 'prev')}</span>
            </button>

            <span className="progress-count">
              {t(language, 'progress', {
                current: currentCardIndex + 1,
                total: filteredCards.length
              })}
            </span>

            <button
              onClick={() => handleNavigation('next')}
              disabled={filteredCards.length <= 1}
              className="nav-btn"
            >
              <span>{t(language, 'next')}</span>
              <ChevronRightIcon className="icon" />
            </button>
          </div>

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

import React, { useEffect, useState, useMemo } from 'react'
import { Flashcard } from '../components/Flashcard'
import { ProgressCounter } from '../components/ProgressCounter'
import { Footer } from '../components/Footer'
import { AppState, Card } from '../types'
import { t } from '../i18n'
import './Home.css'
import congratsImage from '../assets/congrats.png'

interface HomeProps {
  appState: AppState
  setAppState: React.Dispatch<React.SetStateAction<AppState>>
  originalCards: Card[]
}

export function Home({ appState, setAppState }: HomeProps) {
  const {
    cards,
    selectedCategory,
    language,
    showAnswer,
  } = appState

  const [currentIndex, setCurrentIndex] = useState(0)

  // Отфильтрованные карточки (по категории и статусу)
  const visibleCards = useMemo(() => {
    return cards.filter(
      (card) =>
        card.status !== 'known' &&
        (selectedCategory === 'all' || card.category === selectedCategory)
    )
  }, [cards, selectedCategory])

  const currentCard = visibleCards[currentIndex] || null

  const categories = ['all', ...Array.from(new Set(cards.map((card) => card.category)))]

  useEffect(() => {
    localStorage.setItem('qards-state', JSON.stringify(appState))
  }, [appState])

  useEffect(() => {
    setCurrentIndex(0)
  }, [selectedCategory, cards])

  const handleCardAction = (action: 'known' | 'needs-review') => {
    if (!currentCard) return

    const updatedCards = cards.map((card) =>
      card.id === currentCard.id ? { ...card, status: action } : card
    )

    setAppState((prev) => ({
      ...prev,
      cards: updatedCards,
      showAnswer: false,
    }))

    if (visibleCards.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % visibleCards.length)
    }
  }

  const handleNavigation = (direction: 'prev' | 'next') => {
    setCurrentIndex((prev) => {
      if (direction === 'next') {
        return (prev + 1) % visibleCards.length
      } else {
        return prev === 0 ? visibleCards.length - 1 : prev - 1
      }
    })

    setAppState((prev) => ({ ...prev, showAnswer: false }))
  }

  const toggleShuffle = () => {
    // Пока не реализуем — добавим позже
    alert(
      language === 'ru'
        ? 'Перемешивание временно отключено. Мы это исправим!'
        : 'Shuffle is temporarily disabled. We’ll fix it soon!'
    )
  }

  const handleCategoryChange = (category: string) => {
    setAppState((prev) => ({
      ...prev,
      selectedCategory: category,
      showAnswer: false,
    }))
    setCurrentIndex(0)
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
            cards={cards}
            language={language}
            shuffleMode={false} // пока отключено
            selectedCategory={selectedCategory}
            categories={categories}
            onShuffleToggle={toggleShuffle}
            onCategoryChange={handleCategoryChange}
          />

          {visibleCards.length === 0 ? (
            <div className="congrats-card">
              <img src={congratsImage} alt="All done" className="congrats-img" />
              <p className="congrats-text">
                {language === 'ru'
                  ? '🎉 Ура! Вы выучили все карточки в этой категории.\nМожно гордиться собой — отличная работа!'
                  : '🎉 You’ve learned all the cards in this category.\nBe proud — great job!'}
              </p>
            </div>
          ) : (
            <Flashcard
              card={currentCard}
              showAnswer={showAnswer}
              onToggle={() =>
                setAppState((prev) => ({ ...prev, showAnswer: !prev.showAnswer }))
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

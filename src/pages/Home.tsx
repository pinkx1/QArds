import React from 'react';
import { Flashcard } from '../components/Flashcard';
import { ProgressCounter } from '../components/ProgressCounter';
import { Footer } from '../components/Footer';
import { AppState, Card } from '../types';
import { ChevronLeftIcon, ChevronRightIcon, ShuffleIcon, FilterIcon } from 'lucide-react';
import { t } from '../i18n';

interface HomeProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}
export function Home({
  appState,
  setAppState
}: HomeProps) {
  const {
    cards,
    currentCardIndex,
    selectedCategory,
    shuffleMode,
    language
  } = appState;
  const filteredCards = selectedCategory === 'all' ? cards : cards.filter(card => card.category === selectedCategory);
  const currentCard = filteredCards[currentCardIndex] || filteredCards[0];
  const categories = ['all', ...Array.from(new Set(cards.map(card => card.category)))];
  const handleCardAction = (action: 'known' | 'needs-review') => {
    if (!currentCard) return;
    const updatedCards = cards.map(card => card.id === currentCard.id ? {
      ...card,
      status: action as 'known' | 'needs-review'
    } : card);
    setAppState(prev => ({
      ...prev,
      cards: updatedCards,
      currentCardIndex: (currentCardIndex + 1) % filteredCards.length,
      showAnswer: false
    }));
  };
  const handleNavigation = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next' ? (currentCardIndex + 1) % filteredCards.length : currentCardIndex === 0 ? filteredCards.length - 1 : currentCardIndex - 1;
    setAppState(prev => ({
      ...prev,
      currentCardIndex: newIndex,
      showAnswer: false
    }));
  };
  const toggleShuffle = () => {
    setAppState(prev => ({
      ...prev,
      shuffleMode: !shuffleMode
    }));
  };
  const handleCategoryChange = (category: string) => {
    setAppState(prev => ({
      ...prev,
      selectedCategory: category,
      currentCardIndex: 0,
      showAnswer: false
    }));
  };
  return <div className="min-h-screen w-full flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-4">
            {t(language, 'qards')}
          </h1>
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <FilterIcon className="w-4 h-4 text-gray-500" />
              <select value={selectedCategory} onChange={e => handleCategoryChange(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                {categories.map(category => <option key={category} value={category}>
                    {category === 'all' ? t(language, 'allCategories') : category}
                  </option>)}
              </select>
            </div>
            {/* Shuffle Toggle */}
            <button onClick={toggleShuffle} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${shuffleMode ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'}`}>
              <ShuffleIcon className="w-4 h-4" />
              {t(language, 'shuffleMode')}
            </button>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl mx-auto">
          {/* Progress Counter */}
          <ProgressCounter cards={filteredCards} language={language} />
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => handleNavigation('prev')} className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" disabled={filteredCards.length <= 1}>
              <ChevronLeftIcon className="w-5 h-5" />
              <span className="hidden sm:inline">{t(language, 'prev')}</span>
            </button>
            <span className="text-sm text-gray-500">
              {t(language, 'progress', {
                current: currentCardIndex + 1,
                total: filteredCards.length
              })}
            </span>
            <button onClick={() => handleNavigation('next')} className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" disabled={filteredCards.length <= 1}>
              <span className="hidden sm:inline">{t(language, 'next')}</span>
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
          {/* Flashcard */}
          {currentCard && (
  <Flashcard
    card={currentCard}
    showAnswer={appState.showAnswer}
    onToggle={() =>
      setAppState((prev) => ({
        ...prev,
        showAnswer: !prev.showAnswer,
      }))
    }
    onAction={handleCardAction}
    language={language}
  />
)}

        </div>
      </main>
      {/* Footer */}
      <Footer appState={appState} setAppState={setAppState} />
    </div>;
}
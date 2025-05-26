import React from 'react';
import { AppState } from '../types';
import { RotateCcwIcon } from 'lucide-react';
interface FooterProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}
export function Footer({
  appState,
  setAppState
}: FooterProps) {
  const toggleLanguage = () => {
    setAppState(prev => ({
      ...prev,
      language: prev.language === 'ru' ? 'en' : 'ru'
    }));
  };
  const resetProgress = () => {
    if (confirm('Вы уверены, что хотите сбросить весь прогресс?')) {
      setAppState(prev => ({
        ...prev,
        cards: prev.cards.map(card => ({
          ...card,
          status: 'learning'
        })),
        currentCardIndex: 0,
        showAnswer: false
      }));
    }
  };
  return <footer className="bg-white border-t border-gray-200 p-4">
      <div className="max-w-4xl mx-auto flex justify-end gap-3">
        <button onClick={toggleLanguage} className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
          {appState.language.toUpperCase()}
        </button>
        <button onClick={resetProgress} title="Сбросить прогресс" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
          <RotateCcwIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Сброс</span>
        </button>
      </div>
    </footer>;
}
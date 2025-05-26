import React from 'react';
import { Card } from '../types';
import { Link } from 'react-router-dom';
import { ListIcon } from 'lucide-react';
interface ProgressCounterProps {
  cards: Card[];
}
export function ProgressCounter({
  cards
}: ProgressCounterProps) {
  const knownCount = cards.filter(card => card.status === 'known').length;
  const learningCount = cards.filter(card => card.status === 'learning').length;
  const reviewCount = cards.filter(card => card.status === 'needs-review').length;
  return <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {knownCount}
            </div>
            <div className="text-sm text-gray-600">Изучено</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {learningCount}
            </div>
            <div className="text-sm text-gray-600">Изучается</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{reviewCount}</div>
            <div className="text-sm text-gray-600">На повторение</div>
          </div>
        </div>
        <Link to="/cards" className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" title="Посмотреть все карточки">
          <ListIcon className="w-5 h-5" />
          <span className="hidden sm:inline">Все карточки</span>
        </Link>
      </div>
    </div>;
}
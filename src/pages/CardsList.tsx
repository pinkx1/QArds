import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppState } from '../types';
import { ArrowLeftIcon, CheckIcon, XIcon, BookOpenIcon } from 'lucide-react';
interface CardsListProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}
export function CardsList({
  appState,
  setAppState
}: CardsListProps) {
  const [statusFilter, setStatusFilter] = useState<'all' | 'known' | 'learning' | 'needs-review'>('all');
  const {
    cards
  } = appState;
  const filteredCards = statusFilter === 'all' ? cards : cards.filter(card => card.status === statusFilter);
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'known':
        return <CheckIcon className="w-5 h-5 text-green-600" />;
      case 'needs-review':
        return <XIcon className="w-5 h-5 text-red-600" />;
      default:
        return <BookOpenIcon className="w-5 h-5 text-blue-600" />;
    }
  };
  const getStatusText = (status: string) => {
    switch (status) {
      case 'known':
        return 'Изучено';
      case 'needs-review':
        return 'На повторение';
      default:
        return 'Изучается';
    }
  };
  return <div className="min-h-screen w-full bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/" className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeftIcon className="w-5 h-5" />
              Назад
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Все карточки</h1>
          </div>
          {/* Status Filter */}
          <div className="flex gap-2 flex-wrap">
            {[{
            key: 'all',
            label: 'Все',
            count: cards.length
          }, {
            key: 'learning',
            label: 'Изучается',
            count: cards.filter(c => c.status === 'learning').length
          }, {
            key: 'known',
            label: 'Изучено',
            count: cards.filter(c => c.status === 'known').length
          }, {
            key: 'needs-review',
            label: 'На повторение',
            count: cards.filter(c => c.status === 'needs-review').length
          }].map(({
            key,
            label,
            count
          }) => <button key={key} onClick={() => setStatusFilter(key as any)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${statusFilter === key ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}`}>
                {label} ({count})
              </button>)}
          </div>
        </div>
      </header>
      {/* Cards Table */}
      <main className="p-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Вопрос
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Ответ
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Категория
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      Статус
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredCards.map(card => <tr key={card.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                        <div className="line-clamp-2">{card.question[appState.language]}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                        <div className="line-clamp-2">{card.answer[appState.language]}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          {card.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {getStatusIcon(card.status)}
                          <span className="text-sm text-gray-600">
                            {getStatusText(card.status)}
                          </span>
                        </div>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
            {filteredCards.length === 0 && <div className="p-8 text-center text-gray-500">
                Нет карточек для отображения
              </div>}
          </div>
        </div>
      </main>
    </div>;
}
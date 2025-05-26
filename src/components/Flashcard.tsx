import React from 'react'
import { Card } from '../types'
import { CheckIcon, XIcon } from 'lucide-react'

interface FlashcardProps {
  card: Card
  showAnswer: boolean
  onToggle: () => void
  onAction: (action: 'known' | 'needs-review') => void
  language: string
}

export function Flashcard({
  card,
  showAnswer,
  onToggle,
  onAction,
  language
}: FlashcardProps) {
  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Card */}
      <div
        onClick={onToggle}
        className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-6 min-h-[300px] flex items-center justify-center cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      >
        <div className="text-center">
          <div className="text-lg text-gray-900 leading-relaxed">
            {showAnswer
              ? card.answer[language] ?? card.answer.en
              : card.question[language] ?? card.question.en}
          </div>
          <div className="mt-4 text-sm text-gray-500">
            {showAnswer
              ? 'Нажмите, чтобы увидеть вопрос'
              : 'Нажмите, чтобы увидеть ответ'}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {showAnswer && (
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => onAction('needs-review')}
            title="Нужно подучить"
            className="flex items-center justify-center w-14 h-14 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition-colors shadow-md hover:shadow-lg"
          >
            <XIcon className="w-6 h-6" />
          </button>
          <button
            onClick={() => onAction('known')}
            title="Знаю"
            className="flex items-center justify-center w-14 h-14 bg-green-100 hover:bg-green-200 text-green-600 rounded-full transition-colors shadow-md hover:shadow-lg"
          >
            <CheckIcon className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  )
}

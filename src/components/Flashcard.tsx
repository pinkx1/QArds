import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Card } from '../types'
import { CheckIcon, XIcon } from 'lucide-react'
import { t } from '../i18n'
import './Flashcard.css'

interface FlashcardProps {
  card: Card
  showAnswer: boolean
  onToggle: () => void
  onAction: (action: 'known' | 'needs-review') => void
  language: 'en' | 'ru'
}

export function Flashcard({
  card,
  showAnswer,
  onToggle,
  onAction,
  language
}: FlashcardProps) {
  const questionText = card.question[language] ?? card.question.en
  const answerText = card.answer[language] ?? card.answer.en

  return (
    <div className="flashcard-wrapper">
      <div className="flashcard" onClick={onToggle}>
        <div className="flashcard-content">
          {showAnswer ? (
            <div className="flashcard-text markdown">
              <ReactMarkdown>{answerText}</ReactMarkdown>
            </div>
          ) : (
            <div className="flashcard-question">{questionText}</div>
          )}

          <div className="flashcard-hint">
            {showAnswer
              ? t(language, 'clickToSeeQuestion')
              : t(language, 'clickToSeeAnswer')}
          </div>
        </div>
      </div>

      {showAnswer && (
        <div className="flashcard-actions">
          <button
            onClick={() => onAction('needs-review')}
            title={t(language, 'needsReview')}
            className="action-btn red"
          >
            <XIcon className="icon" />
          </button>
          <button
            onClick={() => onAction('known')}
            title={t(language, 'known')}
            className="action-btn green"
          >
            <CheckIcon className="icon" />
          </button>
        </div>
      )}
    </div>
  )
}

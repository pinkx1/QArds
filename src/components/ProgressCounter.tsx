import React from 'react'
import { Card } from '../types'
import { Link } from 'react-router-dom'
import { ListIcon } from 'lucide-react'
import { t } from '../i18n'
import './ProgressCounter.css'

interface ProgressCounterProps {
  cards: Card[]
  language: 'en' | 'ru'
}

export function ProgressCounter({ cards, language }: ProgressCounterProps) {
  const knownCount = cards.filter(card => card.status === 'known').length
  const learningCount = cards.filter(card => card.status === 'learning').length
  const reviewCount = cards.filter(card => card.status === 'needs-review').length

  return (
    <div className="progress">
      <div className="progress-section">
        <div className="progress-item green">
          <div className="count">{knownCount}</div>
          <div className="label">{t(language, 'studied')}</div>
        </div>
        <div className="progress-item blue">
          <div className="count">{learningCount}</div>
          <div className="label">{t(language, 'learning')}</div>
        </div>
        <div className="progress-item red">
          <div className="count">{reviewCount}</div>
          <div className="label">{t(language, 'review')}</div>
        </div>
      </div>
      <Link
        to="/cards"
        className="view-all-link"
        title={t(language, 'allCards')}
      >
        <ListIcon className="icon" />
        <span>{t(language, 'allCards')}</span>
      </Link>
    </div>
  )
}

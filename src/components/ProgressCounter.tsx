import React from 'react'
import { Card } from '../types'
import { Link } from 'react-router-dom'
import { ListIcon, ShuffleIcon, FilterIcon } from 'lucide-react'
import { t } from '../i18n'
import './ProgressCounter.css'

interface ProgressCounterProps {
  cards: Card[]
  language: 'en' | 'ru'
  shuffleMode: boolean
  selectedCategory: string
  categories: string[]
  onShuffleToggle: () => void
  onCategoryChange: (category: string) => void
}

export function ProgressCounter({
  cards,
  language,
  shuffleMode,
  selectedCategory,
  categories,
  onShuffleToggle,
  onCategoryChange
}: ProgressCounterProps) {
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

      <div className="progress-actions">
        <button
          onClick={onShuffleToggle}
          className={`shuffle-btn button-like ${shuffleMode ? 'active' : ''}`}
        >
          <ShuffleIcon className="icon" />
          {t(language, 'shuffleMode')}
        </button>
<div className="category-select">
  <FilterIcon className="select-icon" />
  <select
    value={selectedCategory}
    onChange={e => onCategoryChange(e.target.value)}
    className="category-dropdown"
  >
    {categories.map(category => (
      <option key={category} value={category}>
        {category === 'all' ? t(language, 'allCategories') : category}
      </option>
    ))}
  </select>
</div>


        <Link
          to="/cards"
          className="view-all-link button-like"
          title={t(language, 'allCards')}
        >
          <ListIcon className="icon" />
          <span>{t(language, 'allCards')}</span>
        </Link>
      </div>
    </div>
  )
}

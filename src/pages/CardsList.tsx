import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AppState } from '../types'
import { ArrowLeftIcon, CheckIcon, XIcon, BookOpenIcon } from 'lucide-react'
import { t, translations } from '../i18n'
import './CardsList.css'
import logoLight from '../assets/logo-light.png'
import logoDark from '../assets/logo-dark.png'
import { Header } from '../components/Header'


interface CardsListProps {
  appState: AppState
  setAppState: React.Dispatch<React.SetStateAction<AppState>>
}

const labelKeyMap: Record<'all' | 'learning' | 'known' | 'needs-review', keyof typeof translations['en']> = {
  all: 'all',
  learning: 'learning',
  known: 'studied',
  'needs-review': 'review'
}

export function CardsList({ appState }: CardsListProps) {
  const [statusFilter, setStatusFilter] = useState<'all' | 'known' | 'learning' | 'needs-review'>('all')
  const { cards, language } = appState

  const filteredCards =
    statusFilter === 'all' ? cards : cards.filter((card) => card.status === statusFilter)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'known':
        return <CheckIcon className="icon green" />
      case 'needs-review':
        return <XIcon className="icon red" />
      default:
        return <BookOpenIcon className="icon blue" />
    }
  }

  const getStatusText = (status: string) => {
    const map = {
      known: 'studied',
      'needs-review': 'review',
      learning: 'learning'
    } as const
    return t(language, map[status as keyof typeof map])
  }

  return (
    <div className="cards-page">
      <Header />


      <main className="cards-main">
        <div className="container">
          <div className="cards-header-top">
            <Link to="/" className="back-button">
              <ArrowLeftIcon className="icon" />
              {t(language, 'back')}
            </Link>
            <h1 className="cards-title">{t(language, 'allCards')}</h1>
          </div>

          <div className="filter-buttons">
            {(Object.keys(labelKeyMap) as Array<keyof typeof labelKeyMap>).map((key) => {
              const count = key === 'all' ? cards.length : cards.filter((c) => c.status === key).length
              return (
                <button
                  key={key}
                  onClick={() => setStatusFilter(key)}
                  className={`filter-button ${statusFilter === key ? 'active' : ''}`}
                >
                  {t(language, labelKeyMap[key])} ({count})
                </button>
              )
            })}
          </div>

          <div className="cards-table-wrapper">
            <table className="cards-table">
              <thead>
                <tr>
                  <th>{t(language, 'question')}</th>
                  <th>{t(language, 'answer')}</th>
                  <th>{t(language, 'category')}</th>
                  <th>{t(language, 'status')}</th>
                </tr>
              </thead>
              <tbody>
                {filteredCards.map((card) => (
                  <tr key={card.id}>
                    <td>{card.question[language] ?? card.question.en}</td>
                    <td>{card.answer[language] ?? card.answer.en}</td>
                    <td>{card.category}</td>
                    <td className="status-cell">
                      {getStatusIcon(card.status)}
                      <span>{getStatusText(card.status)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredCards.length === 0 && (
              <div className="empty-message">{t(language, 'noCards')}</div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

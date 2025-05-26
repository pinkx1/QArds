// types.ts

export interface Card {
  id: number
  question: Record<string, string> // { en: string, ru: string }
  answer: Record<string, string>
  category: string
  tag: string // например: 'frontend', 'sql', 'network'
  status: 'known' | 'learning' | 'needs-review'
}

export interface AppState {
  cards: Card[]
  currentCardIndex: number
  showAnswer: boolean
  shuffleMode: boolean
  selectedCategory: string
  language: 'en' | 'ru'
}

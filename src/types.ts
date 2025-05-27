export interface Card {
  id: number
  question: Record<string, string>
  answer: Record<string, string>
  category: string
  tag: string
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

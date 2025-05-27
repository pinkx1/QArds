export const translations = {
  en: {
    allCategories: 'All Categories',
    shuffleMode: 'Shuffle Mode',
    prev: 'Previous',
    next: 'Next',
    clickToSeeAnswer: 'Click to see the answer',
    clickToSeeQuestion: 'Click to see the question',
    known: 'I know this',
    needsReview: 'Needs review',
    studied: 'Studied',
    learning: 'Learning',
    review: 'To review',
    allCards: 'All Cards',
    noCards: 'No cards to display',
    back: 'Back',
    all: 'All',
    reset: 'Reset progress',
    language: 'Language',
    qards: 'QArds',
	progress: '{current} of {total}',
	question: 'Question',
	answer: 'Answer',
	category: 'Category',
	status: 'Status',

  },
  ru: {
    allCategories: 'Все категории',
    shuffleMode: 'Перемешать',
    prev: 'Предыдущая',
    next: 'Следующая',
    clickToSeeAnswer: 'Нажмите, чтобы увидеть ответ',
    clickToSeeQuestion: 'Нажмите, чтобы увидеть вопрос',
    known: 'Знаю',
    needsReview: 'Нужно подучить',
    studied: 'Изучено',
    learning: 'Изучается',
    review: 'На повторение',
    allCards: 'Все карточки',
    noCards: 'Нет карточек для отображения',
    back: 'Назад',
    all: 'Все',
    reset: 'Сбросить прогресс',
    language: 'Язык',
    qards: 'QArds',
	progress: '{current} из {total}',
	question: 'Вопрос',
	answer: 'Ответ',
	category: 'Категория',
	status: 'Статус',
  }
}

export function t(
  lang: 'en' | 'ru',
  key: keyof typeof translations['en'],
  params?: Record<string, string | number>
): string {
  const template = translations[lang]?.[key] || translations.en[key] || key
  if (!params) return template
  return Object.entries(params).reduce(
    (str, [param, value]) => str.replace(`{${param}}`, String(value)),
    template
  )
}


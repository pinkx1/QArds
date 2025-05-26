import { Card } from '../types';

export const qaCards: Card[] = [
  {
    id: 1,
    question: {
      en: 'What is React?',
      ru: 'Что такое React?'
    },
    answer: {
      en: 'A JavaScript library for building user interfaces',
      ru: 'JavaScript библиотека для создания пользовательских интерфейсов'
    },
    category: 'General',
    tag: 'frontend',
    status: 'learning'
  },
  {
    id: 2,
    question: {
      en: 'What is JSX?',
      ru: 'Что такое JSX?'
    },
    answer: {
      en: 'A syntax extension to JavaScript for describing UI',
      ru: 'Синтаксическое расширение JavaScript для описания UI'
    },
    category: 'General',
    tag: 'frontend',
    status: 'learning'
  }
  // и так далее...
];
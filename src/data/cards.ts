import { Card } from '../types'

export const qaCards: Card[] = [
  {
    id: 1,
    question: {
      en: 'What is failure and recovery testing?',
      ru: 'Что такое тестирование на отказ и восстановление?'
    },
    answer: {
      en: `Failure and recovery testing checks how a system behaves during failures and how well it recovers afterward.

### Simulate failure:
- Internet connection is lost  
- Backend is restarted  
- Database is stopped  
- Browser is closed during work  

### Then observe:
- Does it show a clear error message?  
- Is data preserved?  
- Does the UI freeze?  

### Recovery phase:
- Does it resume automatically?  
- Is user input still available?  
- Are retries triggered?  

### What to check:
- Clear error messages on frontend  
- User input is preserved  
- Retry mechanisms and reconnections  
- Speed and correctness of recovery  
- Logging and traceability  

### Real-world examples:
- Google Chrome restores tabs  
- YouTube resumes from where it stopped  
- Telegram keeps typed messages  
- Shopping carts stay saved (e.g., Amazon)  
- Google Docs auto-recovers unsaved changes`,

      ru: `Тестирование на отказ и восстановление проверяет, как система ведёт себя при сбоях и насколько корректно восстанавливается после них.

### Примеры отказов:
- Отключение интернета  
- Перезапуск backend  
- Остановка базы данных  
- Закрытие браузера во время работы  

### Что проверяют при отказе:
- Появляется ли понятное сообщение  
- Сохраняются ли данные  
- Не зависает ли интерфейс  

### Что проверяют при восстановлении:
- Происходит ли восстановление автоматически  
- Сохранился ли пользовательский ввод  
- Срабатывают ли повторные попытки запроса  

### Что важно проверить:
- Сообщения об ошибках  
- Сохранность данных  
- Повторные попытки  
- Скорость восстановления  
- Записи в логах  

### Примеры из жизни:
- Вкладки восстанавливаются в Google Chrome  
- Видео продолжается в YouTube  
- Telegram сохраняет написанные сообщения  
- Корзина остаётся на Ozon или Wildberries  
- В Google Docs автоматически восстанавливаются черновики`
    },
    category: 'Тест-дизайн',
    tag: 'reliability',
    status: 'learning'
  },
  {
  id: 2,
  question: {
    en: 'What to do if clicking a button doesn’t write to the logs, even though logging is expected right after the backend receives the request?',
    ru: 'Что делать, если при нажатии на кнопку лог не записывается, хотя по требованиям он должен появиться сразу после получения запроса бэкендом?'
  },
  answer: {
    en: `If a log is expected as soon as the backend receives the request, but nothing appears, go through this checklist:

### ✅ Frontend:
- Is the request sent at all?
- Check in DevTools → Network tab
- If not — maybe the event isn’t triggered or validation blocks submission

### ✅ Backend:
- Is the route actually triggered? Add a quick \`console.log\`
- Is logging placed **before** any \`await\` or heavy operations?
- Could there be early returns or errors before the log?
- Is there a \`try/catch\` that silently swallows errors?

### ✅ Logger config:
- Is the logger imported and active in this handler?
- Is the environment filtering out certain log levels?
- Does the current log level (e.g. \`info\`) actually get output?

### ✅ Output location:
- Logs might be sent to a file instead of the console
- Or filtered by logger settings and not visible

### 🧪 Tip:
Try sending a minimal request to rule out issues with body data or auth.`,
    
    ru: `Если лог должен появиться сразу после того, как бэкенд получил запрос, но этого не происходит — стоит пройтись по чеклисту:

### ✅ Фронтенд:
- Уходит ли вообще запрос?
- Проверить в DevTools → вкладка Network
- Если нет — возможно, не срабатывает событие или валидация блокирует отправку

### ✅ Бэкенд:
- Срабатывает ли нужный роут? Добавить временно \`console.log\`
- Стоит ли лог до всех \`await\` и тяжёлых операций?
- Есть ли ранние \`return\` или ошибки до логирования?
- Проглатывается ли ошибка в \`try/catch\`?

### ✅ Настройки логгера:
- Подключён ли логгер в этом обработчике?
- Не фильтруются ли логи по уровню? (например, \`info\` может не выводиться)
- Включён ли вывод в нужное место?

### ✅ Куда выводится лог:
- Возможно, лог уходит в файл, а не в консоль
- Или не отображается из-за фильтрации

### 🧪 Совет:
Отправь минимальный запрос без тела — так проще исключить ошибки в данных или авторизации`
  },
  category: 'Практика',
  tag: 'logging',
  status: 'learning'
}
,

  {
    id: 3,
    question: { en: 'Question 3', ru: 'Вопрос 3' },
    answer: { en: 'Answer 3', ru: 'Ответ 3' },
    category: 'Dummy',
    tag: 'test',
    status: 'learning'
  },
  {
    id: 4,
    question: { en: 'Question 4', ru: 'Вопрос 4' },
    answer: { en: 'Answer 4', ru: 'Ответ 4' },
    category: 'Dummy',
    tag: 'test',
    status: 'learning'
  },
  {
    id: 5,
    question: { en: 'Question 5', ru: 'Вопрос 5' },
    answer: { en: 'Answer 5', ru: 'Ответ 5' },
    category: 'Dummy',
    tag: 'test',
    status: 'learning'
  },
  {
    id: 6,
    question: { en: 'Question 6', ru: 'Вопрос 6' },
    answer: { en: 'Answer 6', ru: 'Ответ 6' },
    category: 'Dummy',
    tag: 'test',
    status: 'learning'
  },
  {
    id: 7,
    question: { en: 'Question 7', ru: 'Вопрос 7' },
    answer: { en: 'Answer 7', ru: 'Ответ 7' },
    category: 'Dummy',
    tag: 'test',
    status: 'learning'
  },
  {
    id: 8,
    question: { en: 'Question 8', ru: 'Вопрос 8' },
    answer: { en: 'Answer 8', ru: 'Ответ 8' },
    category: 'Dummy',
    tag: 'test',
    status: 'learning'
  },
  {
    id: 9,
    question: { en: 'Question 9', ru: 'Вопрос 9' },
    answer: { en: 'Answer 9', ru: 'Ответ 9' },
    category: 'Dummy',
    tag: 'test',
    status: 'learning'
  },
  {
    id: 10,
    question: { en: 'Question 10', ru: 'Вопрос 10' },
    answer: { en: 'Answer 10', ru: 'Ответ 10' },
    category: 'Dummy',
    tag: 'test',
    status: 'learning'
  }
]

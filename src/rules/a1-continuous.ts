import type { Rule } from '../types'
import { ex, lesson, mis } from './make'

const unit = 'a1-present-continuous'

export const CONTINUOUS: Rule[] = [
  lesson('A1', unit, 'a1-continuous', 'Present Continuous', 'Что происходит сейчас или временно', [
    {
      type: 'forms',
      items: [
        { title: 'Утверждение', en: 'I am reading now.', ru: 'Я сейчас читаю.', formula: 'am / is / are + глагол-ing' },
        { title: 'Отрицание', en: 'She isn’t working today.', ru: 'Сегодня она не работает.', formula: 'am / is / are + not + глагол-ing' },
        { title: 'Вопрос', en: 'Are you working now?', ru: 'Ты сейчас работаешь?', formula: 'Am / Is / Are + кто + глагол-ing?' },
      ],
    },
    { type: 'heading', text: 'Утверждение' },
    { type: 'text', text: 'Нужны обе части: am, is или are и глагол с -ing. I — am. He, she, it — is. You, we, they — are.' },
    {
      type: 'examples',
      items: [
        ex('I am working now.', 'Я сейчас работаю.'),
        ex('She is reading a book.', 'Она читает книгу.'),
        ex('They are waiting for the bus.', 'Они ждут автобус.'),
        ex('It is raining.', 'Идёт дождь.'),
      ],
    },
    { type: 'heading', text: 'Как пишется -ing' },
    {
      type: 'table',
      head: ['Глагол', '-ing', 'Как'],
      rows: [
        ['work, read', 'working, reading', 'просто -ing'],
        ['make, write', 'making, writing', 'немая e уходит'],
        ['sit, run', 'sitting, running', 'согласная удваивается'],
      ],
    },
    { type: 'heading', text: 'Отрицание и вопрос' },
    { type: 'text', text: 'Not ставят после am, is, are. Вопрос начинает эта же форма. Do не нужен. В коротком «да» форму не сжимают и -ing не повторяют.' },
    {
      type: 'examples',
      items: [
        ex('I’m not cooking today.', 'Сегодня я не готовлю.'),
        ex('She isn’t sleeping.', 'Она не спит.'),
        ex('Is she reading? Yes, she is.', 'Она читает? Да.'),
        ex('Are you working? No, I’m not.', 'Ты работаешь? Нет.'),
      ],
    },
    { type: 'heading', text: 'Употребление' },
    { type: 'heading', text: 'Сейчас' },
    { type: 'text', text: 'Действие идёт в эту минуту. Рядом часто now, at the moment.' },
    {
      type: 'examples',
      items: [
        ex('What are you doing? I’m cooking.', 'Что ты делаешь? Готовлю.'),
        ex('She is talking on the phone.', 'Она говорит по телефону.'),
      ],
    },
    { type: 'heading', text: 'Временно' },
    { type: 'text', text: 'Не привычка, а этот период: today, this week. Привычка остаётся в Present Simple.' },
    {
      type: 'examples',
      items: [
        ex('I usually walk, but today I am taking the bus.', 'Обычно я хожу пешком, а сегодня еду на автобусе.'),
        ex('He is staying with us this week.', 'На этой неделе он живёт у нас.'),
      ],
    },
    { type: 'heading', text: 'Маркеры' },
    { type: 'text', text: 'now, at the moment, today, this week. Know, like, want, need на A1 почти не ставят в эту форму: I want tea. I know the answer.' },
    {
      type: 'mistakes',
      items: [
        mis('She working now.', 'She is working now.', 'Нужны обе части.'),
        mis('Do you working?', 'Are you working?', 'Вопрос без do.'),
        mis('I am knowing the answer.', 'I know the answer.', 'Know не ставят с -ing.'),
        mis('He is siting.', 'He is sitting.', 'Короткая гласная удваивает t.'),
      ],
    },
  ]),
]

import type { Rule } from '../types'
import { ex, lesson, mis } from './make'

const unit = 'a1-can'

export const CAN: Rule[] = [
  lesson('A1', unit, 'a1-can', 'Can / can’t', 'Умею, можно и просьба', [
    {
      type: 'forms',
      items: [
        { title: 'Утверждение', en: 'I can swim.', ru: 'Я умею плавать.', formula: 'кто + can + глагол. Без to и без -s.' },
        { title: 'Отрицание', en: 'She can’t drive.', ru: 'Она не умеет водить.', formula: 'кто + can’t + глагол' },
        { title: 'Вопрос', en: 'Can you help me?', ru: 'Можешь помочь?', formula: 'Can + кто + глагол?' },
      ],
    },
    { type: 'heading', text: 'Форма' },
    { type: 'text', text: 'Can один на всех: I can, she can. Окончания -s нет. После can глагол в начальной форме, без to. Вопрос без do. Короткий ответ: Yes, I can. No, I can’t.' },
    { type: 'heading', text: 'Умею' },
    {
      type: 'examples',
      items: [
        ex('I can swim. My brother can’t.', 'Я умею плавать. Брат нет.'),
        ex('She can speak English.', 'Она говорит по-английски.'),
        ex('Can she drive? No, she can’t.', 'Она умеет водить? Нет.'),
      ],
    },
    { type: 'heading', text: 'Можно' },
    {
      type: 'examples',
      items: [
        ex('Can I sit here? Yes, you can.', 'Можно сесть здесь? Да.'),
        ex('You can’t park here.', 'Здесь нельзя парковаться.'),
      ],
    },
    { type: 'heading', text: 'Просьба' },
    {
      type: 'examples',
      items: [
        ex('Can you help me, please?', 'Можешь помочь?'),
        ex('Could you speak more slowly?', 'Говорите медленнее, пожалуйста.'),
      ],
    },
    {
      type: 'mistakes',
      items: [
        mis('She cans swim.', 'She can swim.', 'Can без -s.'),
        mis('I can to swim.', 'I can swim.', 'После can нет to.'),
        mis('Do you can help?', 'Can you help?', 'Вопрос без do.'),
        mis('He can speaks.', 'He can speak.', 'Глагол без -s.'),
      ],
    },
  ]),
]

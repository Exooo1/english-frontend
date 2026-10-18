import type { Rule } from '../types'
import { ex, lesson, mis } from './make'

const unit = 'a1-have-got'

export const HAVE_GOT: Rule[] = [
  lesson('A1', unit, 'a1-have-got', 'Have got / has got', 'Что есть у человека', [
    {
      type: 'forms',
      items: [
        { title: 'Утверждение', en: 'I have got a bike.', ru: 'У меня есть велосипед.', formula: 'I / you / we / they + have got. He / she / it + has got.' },
        { title: 'Отрицание', en: 'I haven’t got a car.', ru: 'У меня нет машины.', formula: 'haven’t got / hasn’t got' },
        { title: 'Вопрос', en: 'Have you got a ticket?', ru: 'У тебя есть билет?', formula: 'Have / Has + кто + got…? Без do.' },
      ],
    },
    { type: 'heading', text: 'Вещи, семья, внешность' },
    { type: 'text', text: 'Have got — «есть»: вещь, родственник, волосы, глаза. Рост, возраст и «устал» идут через to be. В коротком ответе got нет: Yes, I have.' },
    {
      type: 'examples',
      items: [
        ex('I have got two sisters.', 'У меня две сестры.'),
        ex('She has got long dark hair.', 'У неё длинные тёмные волосы.'),
        ex('We haven’t got a car.', 'У нас нет машины.'),
        ex('Has she got brown eyes? Yes, she has.', 'У неё карие глаза? Да.'),
        ex('She is tall. She is tired.', 'Она высокая. Она устала.'),
      ],
    },
    { type: 'text', text: 'В американском часто без got: I have a bike. Do you have a bike?' },
    {
      type: 'mistakes',
      items: [
        mis('She have got a dog.', 'She has got a dog.', 'После she — has got.'),
        mis('Do you have got a pen?', 'Have you got a pen?', 'Вопрос без do.'),
        mis('Yes, I’ve.', 'Yes, I have.', 'В «да» без сокращения и без got.'),
        mis('She is long hair.', 'She has got long hair.', 'Волосы через have got.'),
      ],
    },
  ]),
]

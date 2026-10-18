import type { Rule } from '../types'
import { ex, lesson, mis } from './make'

const unit = 'a1-modals'

export const MODALS: Rule[] = [
  lesson('A1', unit, 'a1-obligation', 'Must, have to, should', 'Надо, нельзя, не обязательно, совет', [
    {
      type: 'forms',
      items: [
        { title: 'Надо', en: 'I must call my mother.', ru: 'Мне надо позвонить маме.', formula: 'must + глагол. Без to и без -s.' },
        { title: 'Нельзя / не обязательно', en: 'You don’t have to pay.', ru: 'Платить не нужно.', formula: 'mustn’t = нельзя. don’t have to = не обязательно.' },
        { title: 'Совет', en: 'You should rest.', ru: 'Тебе стоит отдохнуть.', formula: 'should + глагол. Без to.' },
      ],
    },
    { type: 'heading', text: 'Must и have to' },
    { type: 'text', text: 'Оба значат «надо». Must — ты сам считаешь, что необходимо. Have to — правило снаружи. После she — has to. Вопрос к have to через do.' },
    {
      type: 'examples',
      items: [
        ex('I must call my mother.', 'Мне надо позвонить маме.'),
        ex('She has to wear a uniform.', 'Ей нужно носить форму.'),
        ex('I have to get up at 6.', 'Мне приходится вставать в шесть.'),
        ex('Do you have to go?', 'Тебе обязательно идти?'),
      ],
    },
    { type: 'heading', text: 'Два разных «не»' },
    { type: 'text', text: 'Mustn’t запрещает. Don’t have to снимает обязанность: можно не делать.' },
    {
      type: 'examples',
      items: [
        ex('You mustn’t smoke here.', 'Здесь нельзя курить.'),
        ex('You don’t have to pay. It’s free.', 'Платить не нужно. Бесплатно.'),
      ],
    },
    { type: 'heading', text: 'Should' },
    { type: 'text', text: 'Совет, мягче, чем must. После should нет to.' },
    {
      type: 'examples',
      items: [
        ex('You should rest.', 'Тебе стоит отдохнуть.'),
        ex('You shouldn’t worry.', 'Не переживай.'),
        ex('Should I call her? Yes, you should.', 'Мне ей позвонить? Да.'),
      ],
    },
    {
      type: 'mistakes',
      items: [
        mis('She must to go.', 'She must go.', 'После must нет to.'),
        mis('You mustn’t pay. если бесплатно.', 'You don’t have to pay.', 'Mustn’t — запрет.'),
        mis('She have to work.', 'She has to work.', 'После she — has to.'),
        mis('You should to rest.', 'You should rest.', 'После should нет to.'),
      ],
    },
  ]),
]

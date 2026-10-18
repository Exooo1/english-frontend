import type { Rule } from '../types'
import { ex, lesson, mis } from './make'

const unit = 'a1-imperatives'

export const IMPERATIVES: Rule[] = [
  lesson('A1', unit, 'a1-imperative', 'Imperatives и Let’s', 'Команда, инструкция, просьба', [
    {
      type: 'forms',
      items: [
        { title: 'Команда', en: 'Open the door.', ru: 'Открой дверь.', formula: 'глагол без you' },
        { title: 'Запрет', en: 'Don’t be late.', ru: 'Не опаздывай.', formula: 'Don’t + глагол' },
        { title: 'Вместе', en: 'Let’s meet at 6.', ru: 'Давай встретимся в шесть.', formula: 'Let’s + глагол. Без to.' },
      ],
    },
    { type: 'heading', text: 'Команда и инструкция' },
    { type: 'text', text: 'You есть по смыслу, но его не пишут. Несколько шагов держат словами first, then. Please делает ту же форму просьбой.' },
    {
      type: 'examples',
      items: [
        ex('Sit down. Be quiet.', 'Сядь. Тихо.'),
        ex('First wash the apple. Then cut it.', 'Сначала помой яблоко. Потом нарежь.'),
        ex('Open the door, please.', 'Открой дверь, пожалуйста.'),
        ex('Could you close the window, please?', 'Закройте окно, пожалуйста.'),
      ],
    },
    { type: 'heading', text: 'Let’s' },
    { type: 'text', text: 'Предложение сделать вместе. Отрицание: Let’s not wait. Не Let’s don’t.' },
    {
      type: 'examples',
      items: [
        ex('Let’s go.', 'Давай пойдём.'),
        ex('Let’s not wait.', 'Давай не будем ждать.'),
      ],
    },
    {
      type: 'mistakes',
      items: [
        mis('You open the door. как команда.', 'Open the door.', 'You не пишут.'),
        mis('Don’t to open.', 'Don’t open.', 'После don’t нет to.'),
        mis('Let’s to go.', 'Let’s go.', 'После let’s нет to.'),
        mis('Let’s don’t wait.', 'Let’s not wait.', 'Отрицание через not.'),
      ],
    },
  ]),
]

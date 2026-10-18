import type { Rule } from '../types'
import { ex, lesson, mis } from './make'

const unit = 'a1-past-simple'

export const PAST: Rule[] = [
  lesson('A1', unit, 'a1-past', 'Past Simple', 'Законченное событие в прошлом', [
    {
      type: 'forms',
      items: [
        { title: 'Утверждение', en: 'I worked yesterday.', ru: 'Вчера я работал.', formula: 'все + глагол-ed или вторая форма' },
        { title: 'Отрицание', en: 'I didn’t work yesterday.', ru: 'Вчера я не работал.', formula: 'кто + didn’t + глагол без -ed' },
        { title: 'Вопрос', en: 'Did you work yesterday?', ru: 'Ты вчера работал?', formula: 'Did + кто + глагол?' },
      ],
    },
    { type: 'heading', text: 'Утверждение' },
    { type: 'text', text: 'Событие уже закончилось. У обычного глагола ко всем лицам добавляют -ed. Неправильные -ed не получают, форму учат парой.' },
    {
      type: 'table',
      head: ['Сейчас', 'Прошлое'],
      rows: [
        ['work, live', 'worked, lived'],
        ['study, stop', 'studied, stopped'],
        ['go, see, buy', 'went, saw, bought'],
        ['have, do, get', 'had, did, got'],
      ],
    },
    {
      type: 'examples',
      items: [
        ex('She worked on Monday.', 'В понедельник она работала.'),
        ex('We watched a film.', 'Мы посмотрели фильм.'),
        ex('He went to the shop.', 'Он сходил в магазин.'),
        ex('I saw her yesterday.', 'Я видел её вчера.'),
      ],
    },
    { type: 'heading', text: 'Отрицание и вопрос' },
    { type: 'text', text: 'Didn’t и Did одни на всех. После них глагол снова начальный, без -ed и без второй формы. Короткий ответ: Yes, I did. No, she didn’t.' },
    {
      type: 'examples',
      items: [
        ex('I didn’t go out.', 'Я не выходил.'),
        ex('She didn’t see him.', 'Она его не видела.'),
        ex('Did you see her? Yes, I did.', 'Ты её видел? Да.'),
        ex('Where did they go?', 'Куда они ходили?'),
      ],
    },
    { type: 'heading', text: 'Was / were' },
    { type: 'text', text: 'To be в прошлом спрашивает само, без Did. I, he, she, it — was. You, we, they — were.' },
    {
      type: 'examples',
      items: [
        ex('I was tired.', 'Я устал.'),
        ex('They were at home.', 'Они были дома.'),
        ex('Were you at home? No, I wasn’t.', 'Ты был дома? Нет.'),
      ],
    },
    { type: 'heading', text: 'Маркеры' },
    { type: 'text', text: 'yesterday, last week, two days ago, in 2019. Yesterday, last и ago без in и без on.' },
    {
      type: 'mistakes',
      items: [
        mis('She goed to work.', 'She went to work.', 'Go — went.'),
        mis('I didn’t went.', 'I didn’t go.', 'После didn’t начальная форма.'),
        mis('Did she saw you?', 'Did she see you?', 'После did тоже начальная форма.'),
        mis('Did you were at home?', 'Were you at home?', 'Was и were без did.'),
      ],
    },
  ]),
]

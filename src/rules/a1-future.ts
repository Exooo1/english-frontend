import type { Rule } from '../types'
import { ex, lesson, mis } from './make'

const unit = 'a1-future'

export const FUTURE: Rule[] = [
  lesson('A1', unit, 'a1-future', 'Going to и will', 'План или решение сейчас', [
    {
      type: 'forms',
      items: [
        { title: 'План', en: 'I’m going to study tonight.', ru: 'Сегодня вечером я буду заниматься.', formula: 'am / is / are + going to + глагол' },
        { title: 'Решение сейчас', en: 'I’ll open the door.', ru: 'Я открою.', formula: 'will + глагол. Одна форма на всех.' },
        { title: 'Вопрос', en: 'Are you going to cook?', ru: 'Ты будешь готовить?', formula: 'Are you going to…?  Will you…?' },
      ],
    },
    { type: 'heading', text: 'Going to' },
    { type: 'text', text: 'План уже есть, или это уже видно. Сначала am, is или are, потом going to, потом глагол. После to не ставят -ing.' },
    {
      type: 'examples',
      items: [
        ex('We’re going to fly on Friday.', 'В пятницу мы летим.'),
        ex('Look, it’s going to rain.', 'Смотри, сейчас пойдёт дождь.'),
        ex('I’m not going to stay late.', 'Я не собираюсь задерживаться.'),
        ex('Are you going to cook? Yes, I am.', 'Ты будешь готовить? Да.'),
      ],
    },
    { type: 'heading', text: 'Will' },
    { type: 'text', text: 'Решение в момент речи или предсказание без готового плана. Форма одна для всех. После will нет to. Нет: won’t.' },
    {
      type: 'examples',
      items: [
        ex('I’ll call you.', 'Я тебе перезвоню.'),
        ex('I think it will be cold.', 'Думаю, будет холодно.'),
        ex('Will you help me? No, I won’t.', 'Поможешь? Нет.'),
      ],
    },
    { type: 'heading', text: 'Как выбрать' },
    { type: 'text', text: 'Билеты уже куплены — going to. Телефон звонит прямо сейчас и ты решаешь ответить — will.' },
    {
      type: 'examples',
      items: [
        ex('We bought the tickets. We’re going to fly.', 'Билеты куплены. Мы летим.'),
        ex('The phone is ringing. I’ll answer it.', 'Телефон звонит. Я отвечу.'),
      ],
    },
    {
      type: 'mistakes',
      items: [
        mis('I going to study.', 'I’m going to study.', 'Нужны am, is или are.'),
        mis('I’m going to studying.', 'I’m going to study.', 'После to начальная форма.'),
        mis('I will to call.', 'I’ll call.', 'После will нет to.'),
        mis('She wills come.', 'She will come.', 'Will без -s.'),
      ],
    },
  ]),
]

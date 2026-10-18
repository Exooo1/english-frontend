import type { Rule } from '../types'
import { ex, lesson, mis } from './make'

const unit = 'a1-questions'

export const QUESTIONS: Rule[] = [
  lesson('A1', unit, 'a1-questions', 'Вопросительные слова', 'Что, кто, где, сколько и к кому вопрос', [
    { type: 'lead', text: 'Yes и no мало. В магазине, у врача и на улице ты спрашиваешь деталь: где, когда, сколько, чей. Слово стоит в начале, дальше обычный вопрос.' },
    { type: 'schemes', items: ['слово + do / does / did + кто + глагол', 'с to be: Where is she?', 'вопрос к подлежащему без do: Who lives here?', 'вопрос к дополнению с do: Who did you call?'] },
    {
      type: 'table',
      head: ['Слово', 'О чём', 'Пример'],
      rows: [
        ['what', 'вещь или действие', 'What is this?'],
        ['who', 'человек', 'Who is she?'],
        ['where', 'место', 'Where do you live?'],
        ['when', 'время', 'When does the shop open?'],
        ['why', 'причина', 'Why are you late?'],
        ['how', 'способ', 'How do you go to work?'],
        ['how many', 'штуки', 'How many apples?'],
        ['how much', 'масса и цена', 'How much is it?'],
        ['which', 'выбор из известных', 'Which bus?'],
        ['whose', 'чей', 'Whose bag is this?'],
      ],
    },
    { type: 'text', text: 'How old — возраст. Whose не путают с who’s: who’s значит who is. Ответ на why часто начинают с because. С to be глагол сам выходит вперёд, без do: Where is she? How old are you?' },
    { type: 'text', text: 'Если who, what или which сами делают действие, они и есть подлежащее. Тогда do, does и did не нужны: Who lives here? Who called you? What happened? Если тот, кто действует, на месте, помощник возвращается: Who did you call? What did you see?' },
    {
      type: 'examples',
      items: [
        ex('Where do you live?', 'Где ты живёшь?', 'Соседу. Where, потом do, потом you.'),
        ex('When does the shop open?', 'Когда открывается магазин?', 'Does, потому что shop — как he. Open без -s.'),
        ex('Where is she? Why are you late?', 'Где она? Почему ты опоздал?', 'С to be без do.'),
        ex('How much is it? How many tickets?', 'Сколько стоит? Сколько билетов?', 'Цена — much. Штуки — many.'),
        ex('Which bus goes to the centre?', 'Какой автобус идёт в центр?', 'Выбор из тех, что на остановке.'),
        ex('Whose bag is this?', 'Чья это сумка?', 'Whose, не who’s. Who’s = who is.'),
        ex('Who lives here? Who did you call?', 'Кто здесь живёт? Кому ты звонил?', 'Первый вопрос к подлежащему, без do. Второй к дополнению, с did.'),
      ],
    },
    {
      type: 'mistakes',
      items: [
        mis('Where you live?', 'Where do you live?', 'После where нужен do или does.'),
        mis('Where she is?', 'Where is she?', 'С to be глагол перед тем, кто действует.'),
        mis('Who did live here? про того, кто живёт.', 'Who lives here?', 'Вопрос к подлежащему без did.'),
        mis('Who’s bag is this?', 'Whose bag is this?', 'Whose — чей. Who’s — who is.'),
        mis('How many money?', 'How much money?', 'Деньги и цена — how much.'),
      ],
    },
    ]),
]

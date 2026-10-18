import type { Rule } from '../types'
import { ex, lesson, mis } from './make'

const unit = 'a1-present-simple'

export const PRESENT: Rule[] = [
  lesson('A1', unit, 'present-simple', 'Present Simple', 'Привычки, факты и расписание', [
    {
      type: 'forms',
      items: [
        { title: 'Утверждение', en: 'I work every day.', ru: 'Я работаю каждый день.', formula: 'I / you / we / they + глагол. He / she / it + глагол-s.' },
        { title: 'Отрицание', en: 'I don’t work every day.', ru: 'Я не работаю каждый день.', formula: 'кто + don’t / doesn’t + глагол без -s' },
        { title: 'Вопрос', en: 'Do you work every day?', ru: 'Ты работаешь каждый день?', formula: 'Do / Does + кто + глагол?  What do you do?' },
      ],
    },
    { type: 'heading', text: 'Утверждение' },
    { type: 'text', text: 'Фраза состоит из того, кто действует, и глагола. I, you, we, they берут глагол как в словаре. He, she, it добавляют -s или -es.' },
    {
      type: 'examples',
      items: [
        ex('I study French.', 'Я учу французский.'),
        ex('You speak English.', 'Ты говоришь по-английски.'),
        ex('We play football on Sunday.', 'По воскресеньям мы играем в футбол.'),
        ex('Cats like milk.', 'Кошки любят молоко.'),
        ex('She speaks English.', 'Она говорит по-английски.'),
        ex('He plays the guitar.', 'Он играет на гитаре.'),
      ],
    },
    { type: 'heading', text: 'Окончание -s' },
    {
      type: 'table',
      head: ['Как в словаре', 'He / she / it'],
      rows: [
        ['live, read, buy', 'lives, reads, buys'],
        ['go, do, watch', 'goes, does, watches'],
        ['study, cry', 'studies, cries'],
        ['have', 'has'],
      ],
    },
    { type: 'heading', text: 'Отрицание' },
    { type: 'text', text: 'После того, кто действует, ставят don’t или doesn’t. Смысловой глагол снова без -s: does забирает окончание себе. Сокращения: do not = don’t, does not = doesn’t.' },
    {
      type: 'examples',
      items: [
        ex('I do not speak Italian.', 'Я не говорю по-итальянски.'),
        ex('They don’t play the violin.', 'Они не играют на скрипке.'),
        ex('She does not like coffee.', 'Она не любит кофе.'),
        ex('He doesn’t play football.', 'Он не играет в футбол.'),
        ex('The cat doesn’t like water.', 'Кот не любит воду.'),
      ],
    },
    { type: 'heading', text: 'Вопрос' },
    { type: 'text', text: 'Вопрос начинает Do или Does. Дальше тот, кто действует, и глагол без -s. Если нужна деталь, вопросительное слово стоит в самом начале: Where, When, Why, What.' },
    {
      type: 'examples',
      items: [
        ex('Do you speak English?', 'Ты говоришь по-английски?'),
        ex('Do they play the guitar?', 'Они играют на гитаре?'),
        ex('Does he speak English?', 'Он говорит по-английски?'),
        ex('Does she play the violin?', 'Она играет на скрипке?'),
        ex('Why do you study English?', 'Почему ты учишь английский?'),
        ex('Where does she work?', 'Где она работает?'),
        ex('Yes, I do. No, she doesn’t.', 'Да. Нет.', 'Короткий ответ без основного глагола.'),
      ],
    },
    { type: 'heading', text: 'Употребление' },
    { type: 'heading', text: 'Привычки' },
    { type: 'text', text: 'То, что повторяется: каждый день, обычно, по понедельникам.' },
    {
      type: 'examples',
      items: [
        ex('I wake up at 6:15.', 'Я просыпаюсь в 6:15.'),
        ex('He runs every morning.', 'Он бегает каждое утро.'),
        ex('When does she usually come home?', 'Когда она обычно приходит домой?'),
      ],
    },
    { type: 'heading', text: 'Факты' },
    { type: 'text', text: 'То, что правда вообще, не только в эту минуту.' },
    {
      type: 'examples',
      items: [
        ex('Water boils at 100 degrees.', 'Вода кипит при 100 градусах.'),
        ex('The Earth goes round the Sun.', 'Земля вращается вокруг Солнца.'),
        ex('She loves her job.', 'Ей нравится её работа.'),
      ],
    },
    { type: 'heading', text: 'Расписание' },
    { type: 'text', text: 'Поезда, уроки, встречи по расписанию. Даже если это ещё впереди.' },
    {
      type: 'examples',
      items: [
        ex('The train leaves at 7.', 'Поезд уходит в семь.'),
        ex('The film starts at 8.', 'Фильм начинается в восемь.'),
        ex('He has a meeting at 3.', 'У него встреча в три.'),
      ],
    },
    { type: 'heading', text: 'Маркеры времени' },
    {
      type: 'table',
      head: ['Слово', 'Куда', 'Пример'],
      rows: [
        ['always, usually, often', 'перед глаголом', 'I usually get up at 7.'],
        ['sometimes', 'перед глаголом или в начало', 'Sometimes we eat out.'],
        ['never', 'перед глаголом, уже «нет»', 'He never drinks coffee.'],
        ['с am / is / are', 'после глагола', 'She is always late.'],
        ['every day, on Monday, at 7', 'в конце или в начале', 'I work on Mondays.'],
      ],
    },
    {
      type: 'mistakes',
      items: [
        mis('She love coffee.', 'She loves coffee.', 'После she глагол с -s.'),
        mis('She doesn’t likes coffee.', 'She doesn’t like coffee.', 'После doesn’t глагол без -s.'),
        mis('Does he works here?', 'Does he work here?', 'В вопросе с does окончания нет.'),
        mis('Yes, she does like.', 'Yes, she does.', 'В коротком ответе глагол не повторяют.'),
      ],
    },
  ]),
  lesson('A1', unit, 'a1-frequency', 'Always, usually, often, sometimes, never', 'Как часто это бывает', [
    {
      type: 'forms',
      items: [
        { title: 'Перед глаголом', en: 'I usually get up at 7.', ru: 'Обычно я встаю в семь.', formula: 'кто + usually / often / never + глагол' },
        { title: 'После to be', en: 'She is always late.', ru: 'Она всегда опаздывает.', formula: 'am / is / are + always' },
        { title: 'В отрицании', en: 'I don’t usually work on Sunday.', ru: 'По воскресеньям я обычно не работаю.', formula: 'don’t + usually + глагол' },
      ],
    },
    { type: 'text', text: 'Never уже значит «нет». Второе don’t рядом не ставят: He never drinks coffee. Час — at 7. Утро — in the morning. День — on Monday. Today и every day без предлога.' },
    {
      type: 'examples',
      items: [
        ex('She often calls her mother.', 'Она часто звонит маме.'),
        ex('He never drinks coffee.', 'Он никогда не пьёт кофе.'),
        ex('Sometimes we eat out.', 'Иногда мы едим не дома.'),
        ex('I always have coffee in the morning.', 'Утром я всегда пью кофе.'),
      ],
    },
    {
      type: 'mistakes',
      items: [
        mis('She always is late.', 'She is always late.', 'С is слово частоты стоит после.'),
        mis('He doesn’t never drink coffee.', 'He never drinks coffee.', 'Never уже отрицание.'),
        mis('I get up in 7.', 'I get up at 7.', 'Час — at.'),
      ],
    },
  ]),
]

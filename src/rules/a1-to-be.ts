import type { Rule } from '../types'
import { ex, lesson, mis } from './make'

const unit = 'a1-to-be'

export const TO_BE: Rule[] = [
  lesson('A1', unit, 'verb-to-be', 'To be', 'Имя, возраст, профессия, место и состояние', [
    {
      type: 'forms',
      items: [
        { title: 'Утверждение', en: 'I am ready.', ru: 'Я готов.', formula: 'I + am. He / she / it + is. You / we / they + are.' },
        { title: 'Отрицание', en: 'She is not here.', ru: 'Её здесь нет.', formula: 'am / is / are + not. I’m not, isn’t, aren’t.' },
        { title: 'Вопрос', en: 'Are you ready?', ru: 'Ты готов?', formula: 'Am / Is / Are + кто? Без do.' },
      ],
    },
    { type: 'heading', text: 'Сейчас' },
    { type: 'text', text: 'Форму выбирают по тому, кто действует. I — am. He, she, it — is. You, we, they — are. По-русски глагол часто пропускают. По-английски он нужен.' },
    {
      type: 'examples',
      items: [
        ex('I am Anna. I am from Kazan.', 'Я Анна. Я из Казани.'),
        ex('She is a doctor. She is 34.', 'Она врач. Ей 34.'),
        ex('You are late.', 'Ты опоздал.'),
        ex('We are at the hotel.', 'Мы в отеле.'),
        ex('They are tired.', 'Они устали.'),
        ex('It is cold.', 'Холодно.'),
      ],
    },
    { type: 'heading', text: 'Отрицание и вопрос' },
    { type: 'text', text: 'Not ставят сразу после формы. Вопрос начинает сама форма, без do. В коротком «да» форму не сжимают: Yes, I am. Формы I amn’t нет.' },
    {
      type: 'examples',
      items: [
        ex('I’m not late.', 'Я не опоздал.'),
        ex('He isn’t here. He’s at work.', 'Его здесь нет. Он на работе.'),
        ex('They aren’t ready.', 'Они не готовы.'),
        ex('Is she a doctor? Yes, she is.', 'Она врач? Да.'),
        ex('Are they at home? No, they aren’t.', 'Они дома? Нет.'),
      ],
    },
    { type: 'heading', text: 'Прошлое: was / were' },
    { type: 'text', text: 'Am и is становятся was. Are становится were. Вопрос тоже без did.' },
    {
      type: 'table',
      head: ['Кто', 'Прошлое', 'Пример'],
      rows: [
        ['I / he / she / it', 'was', 'I was tired. She was at home.'],
        ['you / we / they', 'were', 'They were happy.'],
        ['нет', 'wasn’t / weren’t', 'He wasn’t there.'],
        ['вопрос', 'Was / Were', 'Were you at home?'],
      ],
    },
    {
      type: 'examples',
      items: [
        ex('I was ill yesterday.', 'Вчера я болел.'),
        ex('They were at home.', 'Они были дома.'),
        ex('Was she at the station? No, she wasn’t.', 'Она была на станции? Нет.'),
      ],
    },
    { type: 'heading', text: 'Когда так говорят' },
    { type: 'text', text: 'Имя, возраст, профессия, откуда, состояние и место. Профессия в единственном числе с a или an.' },
    {
      type: 'examples',
      items: [
        ex('He is a doctor.', 'Он врач.'),
        ex('We are from Russia.', 'Мы из России.'),
        ex('I am tired.', 'Я устал.'),
        ex('They are at home.', 'Они дома.'),
      ],
    },
    {
      type: 'mistakes',
      items: [
        mis('She doctor.', 'She is a doctor.', 'Глагол обязателен.'),
        mis('She are tired.', 'She is tired.', 'He, she, it — is.'),
        mis('Do you be ready?', 'Are you ready?', 'To be без do.'),
        mis('Yes, I’m.', 'Yes, I am.', 'В коротком «да» без сокращения.'),
        mis('They was late.', 'They were late.', 'You, we, they — were.'),
      ],
    },
  ]),
]

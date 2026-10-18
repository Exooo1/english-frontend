import type { Rule } from '../types'
import { ex, lesson, mis } from './make'

const unit = 'a1-pronouns'

export const PRONOUNS: Rule[] = [
  lesson('A1', unit, 'a1-pronouns', 'Личные и притяжательные', 'Кто действует, кого зовут и чья вещь', [
    { type: 'lead', text: 'Без этих слов не познакомишься и не скажешь, чья сумка. В русской фразе падеж слышен по окончанию. В английской форму меняют целиком.' },
    { type: 'schemes', items: ['кто + глагол: I see', 'глагол + кого: see him', 'чей + вещь: my book', 'владелец + ’s: John’s book'] },
    {
      type: 'table',
      head: ['Кто', 'Кого', 'Чей'],
      rows: [
        ['I', 'me', 'my'],
        ['you', 'you', 'your'],
        ['he', 'him', 'his'],
        ['she', 'her', 'her'],
        ['it', 'it', 'its'],
        ['we', 'us', 'our'],
        ['they', 'them', 'their'],
      ],
    },
    { type: 'heading', text: 'Когда какую форму' },
    { type: 'text', text: 'Перед глаголом — кто действует: I, he, she. После глагола и после предлога — me, him, her, us, them. Чей предмет ставят перед словом, без артикля: my bag, не the my bag. I всегда с большой буквы. You и для «ты», и для «вы».' },
    { type: 'text', text: 'He и she — про людей. It — про вещь, животное, погоду и время. They — и про людей, и про несколько вещей. Its без апострофа — «его» у предмета. It’s значит it is.' },
    { type: 'text', text: 'Чья вещь у человека: John’s book. Если владельцев много и слово уже на s, только апостроф: my parents’ car. Children → children’s toys. Вопрос: Whose book is this?' },
    {
      type: 'examples',
      items: [
        ex('I am Anna. Nice to meet you.', 'Я Анна. Приятно познакомиться.', 'Первая встреча. I — кто говорит.'),
        ex('Help me, please.', 'Помоги мне, пожалуйста.', 'В кафе, сумка упала. После глагола me, не I.'),
        ex('She is a doctor. I see her every day.', 'Она врач. Я вижу её каждый день.', 'Про коллегу. She перед глаголом, her после.'),
        ex('This is Tom. His bag is black.', 'Это Том. Его сумка чёрная.', 'His, потому что владелец Том, не потому что сумка «мужская».'),
        ex('The cat likes its tail. It’s a small cat.', 'Коту нравится его хвост. Это маленький кот.', 'Its — чей хвост. It’s — it is.'),
        ex('Whose book is this? It’s John’s.', 'Чья это книга? Джона.', 'В классе. John’s book — книга Джона.'),
        ex('Come with us. Their car is outside.', 'Пойдём с нами. Их машина снаружи.', 'Друзья зовут. Us после with, their — чья машина.'),
      ],
    },
    {
      type: 'mistakes',
      items: [
        mis('Me like tea.', 'I like tea.', 'Кто действует — I. Me ставят после глагола.'),
        mis('Me and John go.', 'John and I go.', 'Себя ставят последним и берут I.'),
        mis('He is a table.', 'It is a table.', 'Стол, дом, погода — it.'),
        mis('I see he.', 'I see him.', 'После глагола him, her, them.'),
        mis('Who’s bag is this?', 'Whose bag is this?', 'Whose — чей. Who’s — это who is.'),
        mis('The my book.', 'My book.', 'Перед вещью артикля нет.'),
      ],
    },
    ]),
  lesson('A1', unit, 'a1-word-order', 'Порядок слов', 'Кто, потом действие, потом всё остальное', [
    { type: 'lead', text: 'В русском можно сказать «Кофе я утром пью». В английском такой порядок звучит как поломка. Слушатель ждёт: кто, что делает, с чем, где и когда.' },
    { type: 'schemes', items: ['кто + глагол + что', 'кто + глагол + где + когда', 'She works at home in the evening'] },
    {
      type: 'table',
      head: ['Часть', 'Что это', 'Пример'],
      rows: [
        ['Кто', 'подлежащее', 'I, she, the children'],
        ['Действие', 'глагол', 'live, loves, drink'],
        ['Кого / что', 'дополнение', 'the children, coffee'],
        ['Где, потом когда', 'конец фразы', 'in London, every morning'],
      ],
    },
    { type: 'text', text: 'Глагол в фразе обязателен. Его не выносят вперёд «для красоты». Если есть и место, и время, чаще сначала место.' },
    {
      type: 'examples',
      items: [
        ex('She lives in London.', 'Она живёт в Лондоне.', 'Знакомство: кто, что делает, где.'),
        ex('She loves the children.', 'Она любит детей.', 'Сначала она, потом любовь, потом дети.'),
        ex('I drink coffee every morning.', 'Я пью кофе каждое утро.', 'Дома. Время в конце, не после I.'),
        ex('We eat lunch at work at 1.', 'Мы обедаем на работе в час.', 'Сначала где, потом когда.'),
        ex('They buy bread in the shop on Saturday.', 'Они покупают хлеб в магазине в субботу.', 'Что, где, когда — в этом порядке.'),
        ex('He calls his mother in the evening.', 'Он звонит маме вечером.', 'Не «вечером он звонит» в начале фразы.'),
      ],
    },
    {
      type: 'mistakes',
      items: [
        mis('Loves she the children.', 'She loves the children.', 'Сначала тот, кто действует.'),
        mis('I every morning drink coffee.', 'I drink coffee every morning.', 'Время в конец.'),
        mis('She at home works in the evening.', 'She works at home in the evening.', 'Глагол сразу после того, кто действует.'),
      ],
    },
    ]),
  lesson('A1', unit, 'a1-demonstratives', 'This, that, these, those', 'Этот и тот, один и несколько', [
    { type: 'lead', text: 'В магазине и на вокзале ты постоянно показываешь: эта сумка или та, один ключ или связка. Неверное слово — и продавец смотрит не туда.' },
    { type: 'schemes', items: ['рядом + один: this is', 'рядом + несколько: these are', 'дальше + один: that is', 'дальше + несколько: those are'] },
    {
      type: 'table',
      head: ['', 'Рядом', 'Дальше'],
      rows: [
        ['один', 'this', 'that'],
        ['несколько', 'these', 'those'],
        ['глагол', 'is', 'are, если несколько'],
      ],
    },
    { type: 'text', text: 'This и these — в руке или на этом столе. That и those — через комнату, на той полке, у двери. Один предмет берёт is. Несколько берут are.' },
    {
      type: 'examples',
      items: [
        ex('This is my bag.', 'Это моя сумка.', 'Сумка в руке, на контроле в аэропорту.'),
        ex('These are my keys.', 'Это мои ключи.', 'Связка на ладони. These и are.'),
        ex('That car is old.', 'Та машина старая.', 'Машина через улицу, не рядом.'),
        ex('Those shoes are cheaper.', 'Те туфли дешевле.', 'Продавец показывает на витрину дальше.'),
        ex('This coffee is hot. That one is cold.', 'Этот кофе горячий. Тот холодный.', 'В кафе: чашка у тебя и чашка у друга.'),
        ex('These books are new. Those books are old.', 'Эти книги новые. Те старые.', 'На столе и на дальней полке.'),
      ],
    },
    {
      type: 'mistakes',
      items: [
        mis('This are my keys.', 'These are my keys.', 'Несколько предметов: these и are.'),
        mis('Those book is old.', 'That book is old.', 'Одна книга дальше: that.'),
        mis('These is my pen.', 'This is my pen.', 'Одна ручка рядом: this и is.'),
      ],
    },
    ]),
]

import type { Rule } from '../types'
import { ex, lesson, mis } from './make'

const unit = 'a1-prepositions'

export const PREPOSITIONS: Rule[] = [
  lesson('A1', unit, 'a1-prep-place', 'Предлоги места', 'Где лежит вещь', [
    { type: 'lead', text: 'В комнате, в магазине и у врача ты всё время говоришь, где предмет. Один неверный предлог — и ключи ищут на столе, хотя они в ящике.' },
    { type: 'schemes', items: ['in = внутри', 'on = на поверхности', 'at = точка', 'under / behind / next to / between / in front of'] },
    {
      type: 'table',
      head: ['Предлог', 'Где', 'Пример'],
      rows: [
        ['in', 'внутри объёма', 'in the box, in London'],
        ['on', 'на поверхности', 'on the table, on the wall'],
        ['at', 'точка', 'at the station, at the bus stop'],
        ['under', 'под', 'under the bed'],
        ['behind', 'за', 'behind the door'],
        ['next to', 'рядом', 'next to the bank'],
        ['between', 'между двумя', 'between the shop and the café'],
        ['in front of', 'перед', 'in front of the hotel'],
      ],
    },
    { type: 'text', text: 'The обычно остаётся: on the table. In front of не теряет of. Between нуждается в двух ориентирах.' },
    {
      type: 'examples',
      items: [
        ex('The keys are in the bag.', 'Ключи в сумке.', 'Внутри, не на поверхности.'),
        ex('The cup is on the table.', 'Чашка на столе.', 'Стоит сверху.'),
        ex('She is at the station.', 'Она на станции.', 'Точка на карте, не «внутри коробки».'),
        ex('The cat is under the bed.', 'Кот под кроватью.', 'Смотришь вниз.'),
        ex('The bag is behind the door.', 'Сумка за дверью.', 'Дверь её закрывает.'),
        ex('The café is next to the bank.', 'Кафе рядом с банком.', 'На улице, просишь дорогу.'),
        ex('The shop is between the café and the bank. The car is in front of the hotel.', 'Магазин между кафе и банком. Машина перед отелем.', 'Between — два соседа. In front of — перед входом.'),
      ],
    },
    {
      type: 'mistakes',
      items: [
        mis('The cat is on the box. если кот внутри.', 'The cat is in the box.', 'Внутри — in. Сверху — on.'),
        mis('In front the hotel.', 'In front of the hotel.', 'Of не выбрасывают.'),
        mis('Between the shop.', 'Between the shop and the café.', 'Нужны два ориентира.'),
      ],
    },
    ]),
  lesson('A1', unit, 'a1-prep-time', 'Предлоги времени', 'at, in, on', [
    { type: 'lead', text: 'Встречу срывает не глагол, а предлог: at 6, on Friday, in the morning. Эти три слова здесь про время, не про место.' },
    { type: 'schemes', items: ['at + час и точка', 'in + длинный период', 'on + день и дата', 'today / tomorrow / last / every — без предлога'] },
    {
      type: 'table',
      head: ['Предлог', 'Когда', 'Пример'],
      rows: [
        ['at', 'час и точка', 'at 7, at night, at the weekend'],
        ['in', 'длинный кусок', 'in the morning, in June, in 2020'],
        ['on', 'день и дата', 'on Friday, on 1 May, on Monday morning'],
        ['без', 'эти слова сами по себе', 'today, tomorrow, yesterday, tonight, last week, next Monday, every day'],
      ],
    },
    { type: 'text', text: 'Ночь с at: at night. Утро, день и вечер с in: in the morning, in the afternoon, in the evening.' },
    {
      type: 'examples',
      items: [
        ex('Let’s meet at 6.', 'Давай встретимся в шесть.', 'Час всегда с at.'),
        ex('I work in the morning.', 'Я работаю утром.', 'In the morning, не at the morning.'),
        ex('See you on Friday.', 'Увидимся в пятницу.', 'День с on.'),
        ex('The shop opens on 1 May.', 'Магазин открывается 1 мая.', 'Дата с on.'),
        ex('I sleep at night.', 'Я сплю ночью.', 'Night — исключение, at.'),
        ex('See you tomorrow. I walk every day.', 'Увидимся завтра. Я хожу каждый день.', 'Tomorrow и every day без предлога.'),
      ],
    },
    {
      type: 'mistakes',
      items: [
        mis('In 7 o’clock.', 'At 7.', 'Час — at.'),
        mis('In Friday.', 'On Friday.', 'День — on.'),
        mis('At the morning.', 'In the morning.', 'Утро, день, вечер — in.'),
        mis('On yesterday.', 'Yesterday.', 'Yesterday без предлога.'),
      ],
    },
    ]),
  lesson('A1', unit, 'a1-prep-direction', 'Предлоги направления', 'Куда и откуда', [
    { type: 'lead', text: '«Я еду на работу» и «я из Казани» без to и from не собираются. Это самые частые предлоги в дороге.' },
    { type: 'schemes', items: ['to = куда', 'from = откуда', 'home / here / there без to', 'into = движение внутрь'] },
    { type: 'text', text: 'I go to work. She is from Spain. We walked from the station to the hotel. Без to идут home, here и there: go home, come here, go there. From с ними остаётся: from home. Into — движение внутрь: Put the milk into the fridge.' },
    {
      type: 'examples',
      items: [
        ex('I go to work at 8.', 'Я еду на работу в восемь.', 'Куда — to work.'),
        ex('She is from Spain.', 'Она из Испании.', 'Откуда — from. Это не направление шага, а происхождение.'),
        ex('We walked from the station to the hotel.', 'Мы прошли от станции до отеля.', 'Оба конца маршрута.'),
        ex('Go home. Come here.', 'Иди домой. Иди сюда.', 'Home и here без to.'),
        ex('I came from home.', 'Я пришёл из дома.', 'From остаётся.'),
        ex('Put the milk into the fridge.', 'Положи молоко в холодильник.', 'Движение внутрь — into.'),
      ],
    },
    {
      type: 'mistakes',
      items: [
        mis('I go work.', 'I go to work.', 'Куда — с to.'),
        mis('Go to home.', 'Go home.', 'Home без to.'),
        mis('Come to here.', 'Come here.', 'Here и there без to.'),
        mis('She is to Spain. про происхождение.', 'She is from Spain.', 'Откуда — from.'),
      ],
    },
    ]),
]

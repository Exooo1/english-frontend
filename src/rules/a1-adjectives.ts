import type { Rule } from '../types'
import { ex, lesson, mis } from './make'

const unit = 'a1-adjectives'

export const ADJECTIVES: Rule[] = [
  lesson('A1', unit, 'a1-adj-order', 'Порядок прилагательных', 'Какое слово ближе к предмету', [
    { type: 'lead', text: '«Красивая маленькая чёрная сумка» по-английски собирается в одном порядке. Если переставить слова, фраза звучит как перечень, не как описание.' },
    { type: 'schemes', items: ['мнение → размер → возраст → цвет → откуда → материал → вещь', 'a nice small black bag', 'very / really перед прилагательным'] },
    { type: 'text', text: 'Прилагательное стоит перед существительным и само не меняется: a red car, red cars. Окончания -s у него нет. Артикль стоит перед всей цепочкой.' },
    {
      type: 'examples',
      items: [
        ex('A nice small black bag.', 'Красивая маленькая чёрная сумка.', 'Сначала мнение, потом размер, потом цвет.'),
        ex('An old Italian car.', 'Старая итальянская машина.', 'Возраст раньше, чем откуда.'),
        ex('A big wooden table.', 'Большой деревянный стол.', 'Размер, потом материал.'),
        ex('She has a very big dog.', 'У неё очень большая собака.', 'Very перед прилагательным.'),
        ex('Two red cars.', 'Две красные машины.', 'Red без -s, даже если машин две.'),
        ex('A really good film.', 'Правда хороший фильм.', 'Really тоже перед прилагательным.'),
      ],
    },
    {
      type: 'mistakes',
      items: [
        mis('A black small nice bag.', 'A nice small black bag.', 'Мнение, размер, цвет — в этом порядке.'),
        mis('Reds cars.', 'Red cars.', 'Прилагательное не получает -s.'),
        mis('A bag nice.', 'A nice bag.', 'Описание перед словом, не после.'),
        mis('A very dog big.', 'A very big dog.', 'Very стоит перед прилагательным.'),
      ],
    },
    ]),
  lesson('A1', unit, 'a1-comparison', 'Сравнение', 'Taller than и the tallest', [
    { type: 'lead', text: 'В магазине и в разговоре про людей ты сравниваешь: выше, дешевле, самый удобный. Это одна система из двух ступеней.' },
    { type: 'schemes', items: ['короткое: -er than / the -est', 'длинное: more … than / the most', 'good → better → the best', 'bad → worse → the worst'] },
    { type: 'text', text: 'Короткое слово в один слог: tall → taller than, the tallest. Big → bigger: короткая гласная удваивает согласную. На -y: happy → happier, the happiest. Длинное: more expensive than, the most expensive. Перед превосходной степенью the. После неё часто группа: the tallest in the class.' },
    {
      type: 'examples',
      items: [
        ex('Anna is taller than Tom.', 'Анна выше Тома.', 'Двое. Than значит «чем».'),
        ex('Tom is the tallest in the class.', 'Том самый высокий в классе.', 'Один из группы. Перед -est стоит the.'),
        ex('This bag is bigger.', 'Эта сумка больше.', 'Big → bigger, g удваивается.'),
        ex('This phone is more expensive than that one.', 'Этот телефон дороже того.', 'Длинное слово через more, не expensiver.'),
        ex('It is the most expensive bag in the shop.', 'Это самая дорогая сумка в магазине.', 'The most + длинное.'),
        ex('This coffee is better. That film was the worst.', 'Этот кофе лучше. Тот фильм был худшим.', 'Good и bad учат отдельно.'),
      ],
    },
    {
      type: 'mistakes',
      items: [
        mis('More tall than.', 'Taller than.', 'Короткое слово берёт -er, не more.'),
        mis('The most tall.', 'The tallest.', 'Короткое слово берёт -est.'),
        mis('Expensiver.', 'More expensive.', 'Длинное слово через more.'),
        mis('Tallest boy. без the.', 'The tallest boy.', 'Перед превосходной степенью the.'),
        mis('Gooder / the goodest.', 'Better / the best.', 'Good меняется целиком.'),
      ],
    },
    ]),
  lesson('A1', unit, 'a1-adverbs', 'Наречия', 'Как происходит действие', [
    { type: 'lead', text: 'Careful driver — какой человек. Drives carefully — как он едет. Путаница здесь меняет, о ком фраза.' },
    { type: 'schemes', items: ['прилагательное → какой предмет', 'прилагательное + ly → как действует', 'good → well', 'fast / hard / late / early не меняются'] },
    { type: 'text', text: 'Slow → slowly, careful → carefully. Happy → happily. Наречие ставят после глагола или после дополнения: She speaks slowly. He drives the car carefully. Hardly — это не «усердно». Hardly значит «едва». Усердно: work hard.' },
    {
      type: 'examples',
      items: [
        ex('She is a careful driver.', 'Она аккуратный водитель.', 'Прилагательное про человека.'),
        ex('She drives carefully.', 'Она водит аккуратно.', 'Наречие про действие. Стоит после глагола.'),
        ex('He speaks English slowly.', 'Он медленно говорит по-английски.', 'После дополнения тоже можно.'),
        ex('She sings well.', 'Она поёт хорошо.', 'Good → well, не goodly.'),
        ex('He works hard. We arrived late.', 'Он много работает. Мы приехали поздно.', 'Hard и late форму не меняют.'),
        ex('I hardly know him.', 'Я едва его знаю.', 'Hardly — «едва», не «усердно».'),
      ],
    },
    {
      type: 'mistakes',
      items: [
        mis('She drives careful.', 'She drives carefully.', 'Про действие нужно наречие.'),
        mis('She sings good.', 'She sings well.', 'Good про предмет. Well про действие.'),
        mis('He works hardly. в смысле усердно.', 'He works hard.', 'Hardly значит «едва».'),
        mis('A carefully driver.', 'A careful driver.', 'Перед существительным прилагательное.'),
      ],
    },
    ]),
]

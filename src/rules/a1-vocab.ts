import type { Rule } from '../types'
import { ex, lesson, mis } from './make'

const unit = 'a1-vocab'

export const VOCAB: Rule[] = [
  lesson('A1', unit, 'a1-v-hello', 'Приветствие и знакомство', 'Как начать разговор', [
    { type: 'lead', text: 'Слова знакомства учи связкой, не по одному. Имя без «я из» и без «приятно» в живой встрече не звучит.' },
    { type: 'schemes', items: ['Hello / Hi', 'Good morning / afternoon / evening', 'My name is… I’m from…', 'Nice to meet you'] },
    { type: 'text', text: 'Good night — прощание перед сном, не «добрый вечер». Hi короче, со знакомым. Hello уместно всегда.' },
    {
      type: 'examples',
      items: [
        ex('Hello. My name is Anna.', 'Здравствуйте. Меня зовут Анна.', 'Первый день на курсе.'),
        ex('Hi, Tom.', 'Привет, Том.', 'Со знакомым в коридоре. Короче, чем hello.'),
        ex('Good morning. The meeting is at 9.', 'Доброе утро. Встреча в девять.', 'До полудня, в офисе.'),
        ex('Good evening. A table for two.', 'Добрый вечер. Столик на двоих.', 'Вход в кафе вечером.'),
        ex('I’m from Kazan. Nice to meet you.', 'Я из Казани. Приятно познакомиться.', 'После имени. Ответ: Nice to meet you too.'),
        ex('Good night. See you tomorrow.', 'Спокойной ночи. До завтра.', 'Расстаётесь спать, не здороваетесь.'),
      ],
    },
    { type: 'mistakes', items: [
      mis('Good night при входе вечером.', 'Good evening.', 'Good night — когда уходите спать.'),
      mis('My name Anna.', 'My name is Anna.', 'После name нужен is.'),
      mis('I from Kazan.', 'I’m from Kazan.', 'Перед from нужен to be.'),
    ] },
    ]),
  lesson('A1', unit, 'a1-v-family', 'Семья', 'Кто кому кем приходится', [
    { type: 'lead', text: 'Семью описывают через have got и через «я сам кто». «У меня есть брат» и «я брат» — разные фразы.' },
    { type: 'schemes', items: ['I have got a…', 'His / Her name is…', 'I am a…'] },
    { type: 'text', text: 'Ближний круг: mother, father, parents, sister, brother, son, daughter, husband, wife. Дальше: grandmother, grandfather, aunt, uncle, cousin. Child → children.' },
    {
      type: 'examples',
      items: [
        ex('I have got a brother. His name is Tom.', 'У меня есть брат. Его зовут Том.', 'Знакомство. Have got, потом имя через is.'),
        ex('My parents live in Kazan.', 'Мои родители живут в Казани.', 'Parents — как they, глагол без -s.'),
        ex('She is my wife. We have got a daughter.', 'Она моя жена. У нас есть дочь.', 'Кто она — is. Что есть — have got.'),
        ex('Her aunt is a doctor.', 'Её тётя — врач.', 'Aunt дальше ближнего круга.'),
        ex('I am a son and a brother.', 'Я сын и брат.', 'Про себя — am, не have got.'),
        ex('The children are at home.', 'Дети дома.', 'Child → children, глагол are.'),
      ],
    },
    { type: 'mistakes', items: [
      mis('I am a brother two.', 'I have got two brothers.', '«У меня есть» — have got.'),
      mis('Childs.', 'Children.', 'Форму учат целиком.'),
      mis('She have got a son.', 'She has got a son.', 'После she — has got.'),
    ] },
    ]),
  lesson('A1', unit, 'a1-v-home', 'Дом и комнаты', 'Где что лежит', [
    { type: 'lead', text: 'Комнату учат сразу с предлогом. «Кухня» без «на столе» и «в холодильнике» в речи не пригождается.' },
    { type: 'schemes', items: ['kitchen, bedroom, bathroom, living room', 'There is… in the…', 'on / in / under'] },
    {
      type: 'examples',
      items: [
        ex('There is a bed in the bedroom.', 'В спальне есть кровать.', 'Комната + что в ней.'),
        ex('The lamp is on the table.', 'Лампа на столе.', 'On — на поверхности.'),
        ex('The milk is in the fridge.', 'Молоко в холодильнике.', 'Кухня. In — внутри.'),
        ex('We watch TV in the living room.', 'Мы смотрим телевизор в гостиной.', 'Living room — два слова.'),
        ex('The towels are in the bathroom.', 'Полотенца в ванной.', 'Несколько — are.'),
        ex('My keys are under the chair.', 'Ключи под стулом.', 'Under, не on.'),
      ],
    },
    { type: 'mistakes', items: [
      mis('In kitchen.', 'In the kitchen.', 'Комната с the.'),
      mis('The lamp is in the table.', 'The lamp is on the table.', 'Сверху — on.'),
    ] },
    ]),
  lesson('A1', unit, 'a1-v-food', 'Еда и напитки', 'Что едят и что заказывают', [
    { type: 'lead', text: 'Еду дели так же, как существительные: яблоко — штука, хлеб и чай — порция. Заказ собирай фразой, не списком слов.' },
    { type: 'schemes', items: ['an apple / some bread', 'a cup of tea', 'breakfast, lunch, dinner', 'I’m hungry / I’m thirsty'] },
    {
      type: 'examples',
      items: [
        ex('I’d like a tea and a sandwich, please.', 'Мне чай и сэндвич, пожалуйста.', 'В кафе. Заказ, не «я люблю вообще».'),
        ex('An apple and some bread.', 'Яблоко и немного хлеба.', 'Штука и масса.'),
        ex('I have breakfast at 8.', 'Я завтракаю в восемь.', 'Have breakfast — приём пищи.'),
        ex('I’m hungry. I’m thirsty.', 'Я хочу есть. Я хочу пить.', 'Состояние через am.'),
        ex('A cup of tea and a piece of bread.', 'Чашка чая и кусок хлеба.', 'Порцию называют ёмкостью.'),
        ex('We have dinner at home.', 'Мы ужинаем дома.', 'Dinner — вечерний приём.'),
      ],
    },
    { type: 'mistakes', items: [
      mis('I want tea. грубо в кафе.', 'I’d like a tea, please.', 'I want звучит резко.'),
      mis('A bread.', 'Some bread. / A piece of bread.', 'Хлеб не считают как одну штуку без куска.'),
    ] },
    ]),
  lesson('A1', unit, 'a1-v-shop', 'Покупки и одежда', 'Магазин и что надето', [
    { type: 'lead', text: 'В магазине нужны цена, размер и решение. Цвет стоит перед вещью: a blue shirt, не a shirt blue.' },
    { type: 'schemes', items: ['How much is…?', 'Have you got it in medium?', 'I’ll take it', 'She is wearing…'] },
    {
      type: 'examples',
      items: [
        ex('How much is this shirt?', 'Сколько стоит эта рубашка?', 'Рубашка в руке — this.'),
        ex('Have you got it in medium?', 'Есть в размере M?', 'После цены, до решения.'),
        ex('I’ll take it.', 'Я возьму.', 'Решение сейчас, поэтому will.'),
        ex('Can I pay by card?', 'Можно картой?', 'На кассе.'),
        ex('She is wearing a blue coat.', 'На ней синее пальто.', 'Цвет перед словом. Wear в форме is wearing, если прямо сейчас.'),
        ex('A pair of trousers, size M.', 'Брюки, размер M.', 'Trousers обычно с a pair of.'),
      ],
    },
    { type: 'mistakes', items: [
      mis('How many is it?', 'How much is it?', 'Цена — how much.'),
      mis('A shirt blue.', 'A blue shirt.', 'Цвет перед вещью.'),
    ] },
    ]),
  lesson('A1', unit, 'a1-v-city', 'Город и транспорт', 'Как добраться', [
    { type: 'lead', text: 'Место спрашивают Where is…? Дорогу отвечают командами. Транспорт — коротким by.' },
    { type: 'schemes', items: ['Where is the…?', 'Go straight. Turn left / right.', 'by bus / by train / on foot'] },
    {
      type: 'examples',
      items: [
        ex('Where is the station?', 'Где станция?', 'На улице. Понятное место с the.'),
        ex('Go straight. Then turn left.', 'Идите прямо. Потом налево.', 'Команды без you.'),
        ex('It’s next to the bank.', 'Это рядом с банком.', 'Ориентир после поворота.'),
        ex('I go to work by bus.', 'Я езжу на работу на автобусе.', 'By bus, не on bus.'),
        ex('She goes by train.', 'Она ездит на поезде.', 'После she — goes.'),
        ex('We came on foot.', 'Мы пришли пешком.', 'Пешком — on foot, не by foot.'),
      ],
    },
    { type: 'mistakes', items: [
      mis('Turn to left.', 'Turn left.', 'Left и right без to.'),
      mis('By foot.', 'On foot.', 'Пешком — on foot.'),
    ] },
    ]),
  lesson('A1', unit, 'a1-v-travel', 'Путешествие', 'Дорога, отель, билет', [
    { type: 'lead', text: 'У стойки хватает коротких фраз с одними и теми же словами. Учи их как реплики, не как словарь.' },
    { type: 'schemes', items: ['A return ticket, please', 'Here is my passport', 'I have a reservation', 'The plane is delayed'] },
    {
      type: 'examples',
      items: [
        ex('A return ticket to London, please.', 'Обратный билет до Лондона, пожалуйста.', 'Касса. Return — туда и обратно.'),
        ex('Here is my passport.', 'Вот мой паспорт.', 'Контроль.'),
        ex('This is my luggage.', 'Это мой багаж.', 'У ленты. Luggage обычно не считают по штукам.'),
        ex('I have a reservation.', 'У меня бронь.', 'Стойка отеля.'),
        ex('Where is the hotel?', 'Где отель?', 'Из такси.'),
        ex('The plane is delayed.', 'Самолёт задерживается.', 'Табло. Delayed — уже факт.'),
      ],
    },
    { type: 'mistakes', items: [
      mis('Two luggages.', 'Luggage. / Two bags.', 'Luggage без -s.'),
      mis('I reservation.', 'I have a reservation.', 'Нужен глагол.'),
    ] },
    ]),
  lesson('A1', unit, 'a1-v-health', 'Здоровье и тело', 'Что болит и к кому идти', [
    { type: 'lead', text: 'Боль говорят двумя схемами. Часть тела с my и глагол hurt, или готовое название вроде headache.' },
    { type: 'schemes', items: ['My back hurts', 'I’ve got a headache / a cold', 'I need a doctor', 'foot → feet, tooth → teeth'] },
    {
      type: 'examples',
      items: [
        ex('My head hurts.', 'У меня болит голова.', 'У врача. My + часть тела + hurts.'),
        ex('I’ve got a headache.', 'У меня головная боль.', 'Готовое слово, не my head ache.'),
        ex('I’ve got a cold.', 'Я простужен.', 'Не I am a cold.'),
        ex('My tooth hurts. I need a dentist.', 'Зуб болит. Мне нужен стоматолог.', 'Tooth → teeth, если несколько.'),
        ex('Her feet hurt.', 'У неё болят ноги.', 'Foot → feet.'),
        ex('I need a doctor.', 'Мне нужен врач.', 'Профессия с a.'),
      ],
    },
    { type: 'mistakes', items: [
      mis('I am headache.', 'I’ve got a headache. / My head hurts.', 'Боль — не am + название.'),
      mis('My foots hurt.', 'My feet hurt.', 'Foot → feet.'),
    ] },
    ]),
  lesson('A1', unit, 'a1-v-work', 'Работа и учёба', 'Кем работает и где учится', [
    { type: 'lead', text: 'Профессию называют через to be и артикль. Место работы — отдельным предлогом, не тем же глаголом.' },
    { type: 'schemes', items: ['I’m a student / a doctor', 'in an office / in a hospital / at a school', 'I study English'] },
    {
      type: 'examples',
      items: [
        ex('I’m a student. I study English.', 'Я студент. Я учу английский.', 'Учёба. Профессия с a.'),
        ex('She is a doctor. She works in a hospital.', 'Она врач. Она работает в больнице.', 'После she — works.'),
        ex('He works in an office.', 'Он работает в офисе.', 'Office с гласного звука — an.'),
        ex('The children are at school.', 'Дети в школе.', 'At school без лишнего the в этой связке.'),
        ex('I have homework.', 'У меня домашка.', 'Have, не am homework.'),
        ex('We start work at 9.', 'Мы начинаем работу в девять.', 'Час с at.'),
      ],
    },
    { type: 'mistakes', items: [
      mis('I am student.', 'I am a student.', 'Профессия с артиклем.'),
      mis('She work in hospital.', 'She works in a hospital.', '-s и артикль.'),
    ] },
    ]),
  lesson('A1', unit, 'a1-v-hobby', 'Хобби и свободное время', 'Что человек любит делать', [
    { type: 'lead', text: 'Хобби говорят через like и через три глагола: play, go, watch. Инструмент берёт the, мяч — нет.' },
    { type: 'schemes', items: ['I like + -ing', 'play football / play the guitar', 'go swimming', 'in my free time'] },
    {
      type: 'examples',
      items: [
        ex('I like reading.', 'Мне нравится читать.', 'После like действие на -ing.'),
        ex('In my free time I watch films.', 'В свободное время я смотрю фильмы.', 'Watch films, не see films в этой связке.'),
        ex('We play football on Sunday.', 'По воскресеньям мы играем в футбол.', 'Мяч без the.'),
        ex('She plays the guitar.', 'Она играет на гитаре.', 'Инструмент с the. После she — plays.'),
        ex('I go swimming on Saturday.', 'По субботам я хожу плавать.', 'Go + -ing.'),
        ex('He doesn’t like cooking.', 'Он не любит готовить.', 'Doesn’t, потом like без -s.'),
      ],
    },
    { type: 'mistakes', items: [
      mis('I like read.', 'I like reading.', 'Действие после like на -ing.'),
      mis('Play guitar.', 'Play the guitar.', 'Инструмент с the.'),
      mis('Play the football.', 'Play football.', 'Мяч без the.'),
    ] },
    ]),
  lesson('A1', unit, 'a1-v-weather', 'Погода', 'Что за окном', [
    { type: 'lead', text: 'Погоду начинают с it. It здесь не «оно-небо», а способ начать фразу. Без it фраза не стоит.' },
    { type: 'schemes', items: ['It’s sunny / cloudy / windy / cold / hot', 'It’s raining / snowing', 'It was… / It rained'] },
    {
      type: 'examples',
      items: [
        ex('It’s sunny today.', 'Сегодня солнечно.', 'Разговор у окна.'),
        ex('It’s cold. Take a coat.', 'Холодно. Возьми пальто.', 'Совет через команду.'),
        ex('It’s raining.', 'Идёт дождь.', 'Процесс сейчас, поэтому -ing.'),
        ex('It’s snowing in Kazan.', 'В Казани идёт снег.', 'Тоже процесс.'),
        ex('It was sunny yesterday.', 'Вчера было солнечно.', 'Прошлое через was.'),
        ex('It rained last night.', 'Ночью шёл дождь.', 'Законченный дождь — Past Simple.'),
      ],
    },
    { type: 'mistakes', items: [
      mis('Is sunny.', 'It’s sunny.', 'Нужно it.'),
      mis('It raining.', 'It’s raining.', 'Нужен is.'),
    ] },
    ]),
  lesson('A1', unit, 'a1-v-time', 'Время, числа, даты', 'Который час и какое число', [
    { type: 'lead', text: 'Час спрашивают одной фразой, дату — другой. Числа нужны и там, и в цене, поэтому их лучше учить пачками: 1–12, потом десятки.' },
    { type: 'schemes', items: ['What time is it?', 'at 7 / half past / quarter to', 'What is the date? on 5 May', '13 thirteen, 30 thirty'] },
    {
      type: 'examples',
      items: [
        ex('What time is it? It’s half past six.', 'Который час? Половина седьмого.', '6:30. Half past + час, который уже прошёл.'),
        ex('It’s quarter to seven.', 'Без четверти семь.', '6:45. Quarter to + следующий час.'),
        ex('Let’s meet at 7.', 'Давай в семь.', 'Час с at.'),
        ex('What is the date? It’s 5 May.', 'Какое число? 5 мая.', 'Дата. On 5 May, если ставишь в фразу.'),
        ex('Thirteen apples. Thirty pounds.', 'Тринадцать яблок. Тридцать фунтов.', '13 и 30 легко спутать на слух.'),
        ex('She was born in 1998.', 'Она родилась в 1998.', 'Год читают парами: nineteen ninety-eight. Год с in.'),
      ],
    },
    { type: 'mistakes', items: [
      mis('What time it is?', 'What time is it?', 'Is перед it.'),
      mis('In Monday.', 'On Monday.', 'День — on.'),
      mis('Thirty и thirteen вслух одинаково.', 'Thirteen — ударение на -teen. Thirty — на первый слог.', 'На слух это разные числа: 13 и 30.'),
    ] },
    ]),
  lesson('A1', unit, 'a1-v-colours', 'Цвета', 'Какого цвета предмет', [
    { type: 'lead', text: 'Цвет стоит перед вещью и не меняется во множественном числе. Вопрос один: What colour is it?' },
    { type: 'schemes', items: ['a red car', 'What colour is it? It’s green.', 'an orange bag'] },
    {
      type: 'examples',
      items: [
        ex('A red car and two red cars.', 'Красная машина и две красные машины.', 'Red без -s.'),
        ex('What colour is it? It’s green.', 'Какого цвета? Зелёное.', 'В магазине.'),
        ex('Her eyes are green.', 'У неё зелёные глаза.', 'Цвет после are, если он сказуемое.'),
        ex('An orange bag.', 'Оранжевая сумка.', 'Orange начинается с гласного звука, поэтому an.'),
        ex('The black coat is mine.', 'Чёрное пальто моё.', 'Цвет перед coat.'),
        ex('I like blue.', 'Мне нравится синий.', 'Цвет сам по себе, без вещи.'),
      ],
    },
    { type: 'mistakes', items: [
      mis('A car red.', 'A red car.', 'Цвет перед существительным.'),
      mis('Reds cars.', 'Red cars.', 'Цвет без -s.'),
      mis('A orange bag.', 'An orange bag.', 'Orange с гласного звука.'),
    ] },
    ]),
  lesson('A1', unit, 'a1-v-feelings', 'Эмоции и состояние', 'Как человек себя чувствует', [
    { type: 'lead', text: 'Состояние человека говорят через to be. Слово на -ed — про человека, на -ing — про вещь или ситуацию.' },
    { type: 'schemes', items: ['I’m tired / happy / sad / hungry / cold', 'I am bored. The film is boring.', 'I’ve got a cold'] },
    {
      type: 'examples',
      items: [
        ex('I’m tired. I need coffee.', 'Я устал. Мне нужен кофе.', 'В офисе после обеда.'),
        ex('She’s happy.', 'Она рада.', 'После she — is, здесь she’s.'),
        ex('We’re hungry. We’re cold.', 'Мы голодные. Нам холодно.', 'Состояние через are, не через have.'),
        ex('I’m sad today.', 'Сегодня мне грустно.', 'Today без предлога.'),
        ex('I am bored. The film is boring.', 'Мне скучно. Фильм скучный.', '-ed про тебя, -ing про фильм.'),
        ex('I’ve got a cold.', 'Я простужен.', 'Простуда — have got, не am.'),
      ],
    },
    { type: 'mistakes', items: [
      mis('I have tired.', 'I’m tired.', 'Состояние через to be.'),
      mis('I am boring. про себя, если скучно.', 'I am bored.', 'Boring — про фильм или урок.'),
      mis('I am a cold.', 'I’ve got a cold.', 'Простуда готовой связкой.'),
    ] },
    ]),
  lesson('A1', unit, 'a1-v-daily', 'Повседневные действия', 'Обычный день', [
    { type: 'lead', text: 'Обычный день — цепочка в Present Simple. Время ставят в конец шага. После he и she окончание возвращается.' },
    { type: 'schemes', items: ['I get up at 7', 'I have breakfast / go to work / get home', 'She gets up'] },
    {
      type: 'examples',
      items: [
        ex('I get up at 7.', 'Я встаю в семь.', 'Первый шаг дня. Час в конце.'),
        ex('I have breakfast and go to work.', 'Я завтракаю и еду на работу.', 'Два шага через and.'),
        ex('I get home at 6.', 'Я прихожу домой в шесть.', 'Home без to.'),
        ex('I have dinner and go to bed.', 'Я ужинаю и ложусь спать.', 'Конец дня.'),
        ex('She gets up at 7.', 'Она встаёт в семь.', 'После she — gets.'),
        ex('On Sunday I don’t go to work.', 'В воскресенье я не хожу на работу.', 'День с on. Don’t перед глаголом.'),
      ],
    },
    { type: 'mistakes', items: [
      mis('I get up in 7.', 'I get up at 7.', 'Час — at.'),
      mis('She get up at 7.', 'She gets up at 7.', 'После she есть -s.'),
      mis('I go to home.', 'I go home. / I get home.', 'Home без to.'),
    ] },
    ]),
]

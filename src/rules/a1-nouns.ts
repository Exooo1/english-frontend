import type { Rule } from '../types'
import { ex, lesson, mis } from './make'

const unit = 'a1-nouns'

export const NOUNS: Rule[] = [
  lesson('A1', unit, 'a1-articles-nouns', 'a / an', 'Одна вещь из многих', [
    { type: 'lead', text: 'A и an ставят, когда говоришь об одной штуке и пока не важно, какая именно. Без них «I have cat» звучит обрубленно.' },
    { type: 'schemes', items: ['a + согласный звук', 'an + гласный звук', 'профессия: a doctor / an engineer'] },
    {
      type: 'table',
      head: ['Артикль', 'Смотри на звук', 'Пример'],
      rows: [
        ['a', 'согласный', 'a book, a cat, a university'],
        ['an', 'гласный', 'an apple, an hour, an engineer'],
      ],
    },
    { type: 'text', text: 'Смотрят на звук, не на букву. University начинается с «ю» — это согласный, поэтому a. Hour без звука h — гласный, поэтому an. Во множественном числе a и an нет: books, apples.' },
    {
      type: 'examples',
      items: [
        ex('I have a cat.', 'У меня есть кот.', 'Какой именно, пока не важно. Одна штука.'),
        ex('She is an engineer.', 'Она инженер.', 'Профессия в единственном числе тоже с артиклем.'),
        ex('Wait an hour.', 'Подожди час.', 'H не слышно, слово начинается с гласного звука.'),
        ex('He is a student at a university.', 'Он студент университета.', 'Оба слова со звука «ю» и «с».'),
        ex('Can I have an apple?', 'Можно яблоко?', 'В кафе. Apple с гласного.'),
        ex('I need a ticket and an umbrella.', 'Мне нужен билет и зонт.', 'Ticket с согласного, umbrella с гласного.'),
      ],
    },
    {
      type: 'mistakes',
      items: [
        mis('I have cat.', 'I have a cat.', 'Одна новая штука без артикля не стоит.'),
        mis('She is a engineer.', 'She is an engineer.', 'Engineer начинается с гласного звука.'),
        mis('I have a books.', 'I have a book. / I have books.', 'A только с одной штукой.'),
        mis('An university.', 'A university.', 'Слышится «ю», это согласный звук.'),
      ],
    },
    ]),
  lesson('A1', unit, 'a1-the', 'the', 'Уже понятно, какая вещь', [
    { type: 'lead', text: 'The значит «вот эта, мы уже знаем какая». Первый раз кот просто a cat. Когда оба смотрят на него — the cat.' },
    { type: 'schemes', items: ['первый раз: a', 'уже эта: the', 'одна такая в мире: the sun', 'про всех вообще: без артикля'] },
    { type: 'text', text: 'The ставят, когда вещь назвали раньше, она одна такая или на неё показывают. Если говорят о кошках вообще, артикля нет: Cats like milk.' },
    {
      type: 'examples',
      items: [
        ex('I have a cat. The cat is black.', 'У меня есть кот. Кот чёрный.', 'Сначала просто кот, потом уже этот.'),
        ex('The sun is hot.', 'Солнце горячее.', 'Солнце одно. Артикль the.'),
        ex('The door is open.', 'Дверь открыта.', 'Дверь в этой комнате, оба понимают какая.'),
        ex('Open the book on the desk.', 'Открой книгу на столе.', 'На уроке. Книга и стол уже перед вами.'),
        ex('Cats like milk.', 'Кошки любят молоко.', 'Про кошек вообще, не про одну. Артикля нет.'),
        ex('Where is the station?', 'Где станция?', 'В городе станция, про которую спрашивают, понятна.'),
      ],
    },
    {
      type: 'mistakes',
      items: [
        mis('I have the cat. сразу, без «какой».', 'Сначала I have a cat. Потом the cat.', 'The — когда уже ясно, какой.'),
        mis('The cats like the milk. про всех кошек.', 'Cats like milk.', 'Про класс вещей артикля нет.'),
        mis('Sun is hot.', 'The sun is hot.', 'Солнце одно, the остаётся.'),
      ],
    },
    ]),
  lesson('A1', unit, 'a1-plurals', 'Множественное число', '-s, -es, -ies и исключения', [
    { type: 'lead', text: 'Одна книга и три книги в английском отличаются окончанием. Если сказать three book, фраза разваливается: число и глагол не сойдутся.' },
    { type: 'schemes', items: ['обычно + s: cats', 's, x, ch, sh + es: boxes', 'согласная + y → ies: babies', 'гласная + y + s: boys'] },
    {
      type: 'table',
      head: ['Как', 'Пример'],
      rows: [
        ['+ s', 'cat → cats, boy → boys'],
        ['+ es', 'box → boxes, watch → watches'],
        ['y → ies', 'baby → babies, city → cities'],
        ['особая форма', 'man → men, child → children, foot → feet'],
        ['без изменения', 'sheep, fish'],
        ['person', 'people'],
      ],
    },
    { type: 'text', text: 'Отдельные формы учат целиком: woman → women, tooth → teeth, mouse → mice. С несколькими штуками глагол тоже во множественном: Three children are here.' },
    {
      type: 'examples',
      items: [
        ex('Two cats and three dogs.', 'Два кота и три собаки.', 'В приюте. Обычное -s.'),
        ex('I need two boxes.', 'Мне нужны две коробки.', 'На почте. Box кончается на x, поэтому -es.'),
        ex('The babies are asleep.', 'Малыши спят.', 'Baby на согласную + y: babies. Глагол are.'),
        ex('The boys are outside.', 'Мальчики на улице.', 'Boy на гласную + y: просто boys.'),
        ex('Three children are here. Two men are late.', 'Трое детей здесь. Двое мужчин опаздывают.', 'Child и man форму меняют целиком.'),
        ex('My feet hurt. These sheep are quiet.', 'Ноги болят. Эти овцы тихие.', 'Foot → feet. Sheep не меняется.'),
      ],
    },
    {
      type: 'mistakes',
      items: [
        mis('Three childs.', 'Three children.', 'Child не получает -s.'),
        mis('Two babys.', 'Two babies.', 'Согласная + y → ies.'),
        mis('The children is here.', 'The children are here.', 'Несколько — глагол are.'),
        mis('Two boxs.', 'Two boxes.', 'После x, s, ch, sh нужно -es.'),
      ],
    },
    ]),
  lesson('A1', unit, 'a1-countable', 'Countable / uncountable', 'Штуки, much, many, a lot of', [
    { type: 'lead', text: 'Яблоко можно посчитать. Воду — нет, только стакан. От этого зависит a, множественное число и слова «много» и «сколько».' },
    { type: 'schemes', items: ['штука: a book, two books, many', 'масса: milk, much, a cup of', 'и то и другое: a lot of'] },
    { type: 'text', text: 'Countable считают по штукам. Uncountable называют массу и не ставят во множественное: water, bread, money, time, information. Перед ними нет a. Порцию называют ёмкостью: a cup of tea, a piece of bread. Глагол в единственном: Milk is cold.' },
    { type: 'text', text: 'Many и How many — со штуками. Much и How much — с неисчисляемым и с ценой. В обычной фразе чаще a lot of для обоих. Немного штук: a few. Немного массы: a little.' },
    {
      type: 'examples',
      items: [
        ex('I need a book and some water.', 'Мне нужна книга и немного воды.', 'Книга — штука. Вода — масса, без a.'),
        ex('How many apples? Three.', 'Сколько яблок? Три.', 'В магазине. Яблоки считают.'),
        ex('How much is it?', 'Сколько это стоит?', 'Ценник. How much и про цену.'),
        ex('There is a lot of milk.', 'Молока много.', 'A lot of подходит и к молоку.'),
        ex('She has a few friends and a little time.', 'У неё немного друзей и мало времени.', 'Friends — штуки. Time не считают.'),
        ex('A cup of tea and a piece of bread.', 'Чашка чая и кусок хлеба.', 'Порцию называют ёмкостью.'),
      ],
    },
    {
      type: 'mistakes',
      items: [
        mis('A water, two milks.', 'Some water. A glass of milk.', 'Воду и молоко не считают по штукам.'),
        mis('How much apples?', 'How many apples?', 'Штуки — many.'),
        mis('How many money?', 'How much money?', 'Деньги на A1 не считают как штуки.'),
        mis('Informations.', 'Information. A lot of information.', 'Information без -s.'),
      ],
    },
    ]),
  lesson('A1', unit, 'a1-some-any', 'some / any', 'Некоторое количество', [
    { type: 'lead', text: 'Когда не нужно точное число, говорят some и any: немного молока, несколько стульев, «есть хоть что-нибудь?».' },
    { type: 'schemes', items: ['утверждение: some', 'вопрос и нет: any', 'предложение и просьба: some', 'совсем нет: no'] },
    { type: 'text', text: 'Some и any подходят и к штукам, и к массе. В обычном утверждении some. В вопросе и отрицании any. Когда предлагаешь или просишь, some остаётся и в вопросе: Would you like some tea?' },
    {
      type: 'examples',
      items: [
        ex('I have some milk.', 'У меня есть молоко.', 'Дома. Утверждение — some.'),
        ex('There are some chairs.', 'Есть несколько стульев.', 'В комнате. Some и со штуками.'),
        ex('Have you got any milk?', 'У тебя есть молоко?', 'Вопрос — any.'),
        ex('I haven’t got any milk.', 'У меня нет молока.', 'Отрицание — any.'),
        ex('Would you like some tea?', 'Хочешь чаю?', 'Предложение. Some остаётся.'),
        ex('There is no milk.', 'Молока совсем нет.', 'Сильнее, чем not any.'),
      ],
    },
    {
      type: 'mistakes',
      items: [
        mis('I have any milk. в обычном рассказе.', 'I have some milk.', 'В утверждении some.'),
        mis('I haven’t got some milk.', 'I haven’t got any milk.', 'В отрицании any.'),
        mis('Do you want any tea? когда угощаешь.', 'Would you like some tea?', 'Предложение держит some.'),
      ],
    },
    ]),
  lesson('A1', unit, 'there-is-are', 'there is / there are', 'Как сказать, что что-то где-то есть', [
    { type: 'lead', text: 'По-русски хватает «На столе книга». По-английски нужен зачин there is или there are. There здесь не переводится и не значит «там».' },
    { type: 'schemes', items: ['There is + один / масса', 'There are + несколько', 'Is there…? / Are there…?', 'Yes, there is. / No, there aren’t.'] },
    { type: 'text', text: 'Форму выбирают по слову сразу после глагола. There is a book. There is some milk. There are two books. Отрицание: There isn’t a pen. There aren’t any chairs.' },
    {
      type: 'examples',
      items: [
        ex('There is a book on the table.', 'На столе книга.', 'Одна книга. There is, не There are.'),
        ex('There is some milk in the fridge.', 'В холодильнике есть молоко.', 'Молоко не считают. There is.'),
        ex('There are two chairs in the room.', 'В комнате два стула.', 'Несколько. There are.'),
        ex('There isn’t a pen.', 'Ручки нет.', 'Один предмет в отрицании.'),
        ex('Are there any chairs? No, there aren’t.', 'Стулья есть? Нет.', 'Вопрос начинает Are.'),
        ex('Is there a café near here? Yes, there is.', 'Кафе рядом есть? Да.', 'На улице. Краткое «да» без сокращения.'),
      ],
    },
    {
      type: 'mistakes',
      items: [
        mis('A book is on the table. как единственный способ.', 'There is a book on the table.', 'Когда просто сообщаешь, что вещь есть, начинают с there.'),
        mis('There are a book.', 'There is a book.', 'Форма по первому слову: одна книга — is.'),
        mis('There is two books.', 'There are two books.', 'Две книги — are.'),
        mis('Yes, there’s.', 'Yes, there is.', 'В кратком «да» без сокращения.'),
      ],
    },
    ]),
]

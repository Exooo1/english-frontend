import type { RuleFormula } from '../types'

// Одно объяснение на урок. Формулировки сверены с LearnEnglish (British Council), уровень A1–A2.
export const EXPLAIN: Record<string, RuleFormula> = {
  'a1-alphabet': {
    text: `В английском алфавите 26 букв.

Гласные: a, e, i, o, u. Буква y иногда гласная: my, happy.

Остальные буквы — согласные.`,
  },
  'a1-sounds': {
    text: `В английском есть звуки, которых нет в русском.
Каждый звук учим вместе с одним словом: thin, this, we, sing, cat, bird, about.
Слово говорим целиком, не по буквам.`,
  },
  'a1-transcription': {
    text: `Транскрипция в квадратных скобках показывает, как слово звучит.
Знак ˈ стоит перед ударным слогом. Две точки означают долгий звук.
Новое слово сверяют по скобкам.`,
  },
  'a1-syllables': {
    text: `Слог строится вокруг гласной. Закрытый слог кончается согласной, и гласная короткая: cat, pen, big, dog, cup. Открытый слог кончается гласной, и буква читается своим именем: he, go.

Немая e в конце сама не звучит, но открывает слог: cap короткое, cape уже «по имени» буквы a. Так же name, like, home, cute. Буква u в открытом слоге чаще звучит [juː]: music, student, use. Таблица на каждый день: cat / name, pen / he, big / like, dog / go, cup / music.`,
  },
  'a1-digraphs': {
    text: `Две или три буквы рядом часто читаются одним звуком. Их не складывают из русских «с» и «х».

sh — «ш» (shop), ch — «ч» (chair), ph — «ф» (phone). th глухое в thin и звонкое в this, the, they. wh чаще [w] (what), но who через [h]. ee и обычно ea — долгое «и»: see, tea; в bread, head короткое. oo долгое в food и короткое перед k: book, look. ar как в car, or как в horse, er / ir / ur как в her, bird, turn.`,
  },
  'a1-stress': {
    text: `Ударение смотрят в словаре. Русское ударение на похожее слово не переносят: computer ударный на втором слоге, comˈputer.

Знак ˈ стоит перед ударным слогом. У коротких существительных ударение чаще на первом: ˈtable. У коротких глаголов чаще на втором: beˈgin, reˈcord «записывать», а ˈrecord «запись». Суффикс -tion сам не ударный: ударение на слоге перед ним, ˈstation, inforˈmation.`,
  },
  'a1-intonation': {
    text: `В конце фразы голос либо поднимается, либо опускается. По этой мелодии слышно, вопрос это или сообщение.

Утверждение и восклицание идут вниз. Вопрос, на который отвечают yes или no, идёт вверх: Is it far? Вопрос с what, where, who, when, why, how идёт вниз: Where is the station? В списке незаконченные пункты вверх, последний вниз: apples, bread and milk.`,
  },
  'a1-silent-letters': {
    text: `Часть букв пишут, но не произносят. Если читать каждую, слово становится другим.

kn в начале: k молчит (know, knee, knife). wr в начале: w молчит (write, wrong). mb в конце: b молчит (thumb, climb). gh после гласной часто молчит (night, right). h молчит в hour и honest. Немая e в конце сама не звучит и открывает слог: name, like, home. В listen молчит t.`,
  },

  'a1-pronouns': {
    text: `Перед глаголом стоит тот, кто действует: I, you, he, she, it, we, they.
I всегда с большой буквы. You — и «ты», и «вы».
He и she — про людей. It — про вещь, животное, погоду.
They — и про людей, и про несколько вещей.

После глагола и предлога форма другая: me, him, her, us, them.
I see him. Help me. Go with us.

Чья вещь: my, your, his, her, its, our, their. Артикля перед ними нет.
Слово выбирают по владельцу: Tom — his bag, Anna — her bag.
Its без апострофа — «его» у предмета. It’s значит it is.

Чья вещь у человека: John’s book.
Если слово уже на s, только апостроф: my parents’ car.
Вопрос: Whose book is this?`,
  },
  'a1-word-order': {
    text: `В утвердительной фразе порядок фиксированный: кто действует, потом глагол, потом на что действие направлено, потом где и когда.

She loves the children. I drink coffee every morning. Если есть и место, и время, чаще сначала место, потом время: She works at home in the evening. Глагол в фразе обязателен, его не выносят вперёд «для красоты», как в русском.`,
  },
  'a1-demonstratives': {
    text: `This, that, these, those показывают на предмет. This и these — рядом, в руке или на этом столе. That и those — дальше.

Один предмет: this, that и глагол is. Несколько: these, those и глагол are. This is my bag. These are my keys. That car is old. Those cars are old.`,
  },

  'verb-to-be': {
    text: `To be значит «быть» или «находиться». По-русски глагол часто пропускают. По-английски он нужен: She is a doctor.

Сейчас: I am. He, she, it — is. You, we, they — are.
Нет: I’m not. She isn’t. They aren’t.
Вопрос: Am I? Is she? Are they?
Короткое «да» без сокращения: Yes, I am. Yes, she is.
Формы I amn’t нет. Do с to be не ставят.

В прошлом am и is становятся was, are становится were.
I was tired. They were at home.
Was she at home? Yes, she was. No, they weren’t.

Так называют имя, возраст, профессию, откуда, состояние и место.
I am Anna. She is 20. He is a doctor. They are at home.`,
  },

  'a1-articles-nouns': {
    text: `A и an ставят, когда говорят об одной штуке из многих и пока не важно, какая именно. Во множественном числе их нет: books, apples.

A перед согласным звуком, an перед гласным. Смотрят на звук, не на букву: a book, a university (звук «ю»), an apple, an hour (h не слышно). Профессия в единственном числе тоже с артиклем: a doctor, an engineer.`,
  },
  'a1-the': {
    text: `The ставят, когда уже понятно, какая именно вещь: её назвали раньше, она одна такая или на неё показывают.

Первый раз: I have a cat. Дальше этот кот: The cat is black. Солнце одно: The sun is hot. Дверь в этой комнате понятна: The door is open. Если говорят о кошках вообще, артикля нет: Cats like milk.`,
  },
  'a1-plurals': {
    text: `Несколько штук показывают окончанием. Обычно -s: cat → cats, boy → boys. Если слово кончается на s, x, z, ch, sh, добавляют -es: box → boxes, watch → watches. Согласная + y: baby → babies. Гласная + y: boy → boys.

Отдельные формы учат целиком: man → men, woman → women, child → children, foot → feet, tooth → teeth, mouse → mice. Sheep и fish в обычной речи не меняются. Person → people. С несколькими штуками глагол во множественном числе: Three children are here.`,
  },
  'a1-countable': {
    text: `Countable считают по штукам: a book, two books. Uncountable называют массу и не ставят во множественное число: milk, water, bread, money, time, information. Перед ними нет a и an. Порцию называют ёмкостью: a cup of tea, a piece of bread. Глагол в единственном числе: Milk is cold.

«Много» зависит от того же деления. Many и How many — со штуками: many books, How many apples? Much и How much — с неисчисляемым и с ценой: much water, How much is it? В обычном утверждении чаще a lot of для обоих случаев: a lot of friends, a lot of time. Немного штук: a few books. Немного неисчисляемого: a little milk.`,
  },
  'a1-some-any': {
    text: `Some и any значат «некоторое количество» или «несколько». Они подходят и к штукам, и к неисчисляемым.

В обычном утверждении some: I have some milk. There are some chairs. В вопросе и отрицании any: Have you got any milk? I haven’t got any milk. There aren’t any chairs. Когда предлагают или просят, some остаётся и в вопросе: Would you like some tea? Сильнее «нет совсем»: There is no milk.`,
  },
  'there-is-are': {
    text: `There is и there are говорят, что что-то где-то есть. There здесь не переводится и не значит «там». По-русски достаточно «На столе книга», в английском нужен глагол.

Форму выбирают по слову сразу после глагола. Один предмет или то, что не считают: There is a book on the table. There is some milk. Несколько штук: There are two books. Отрицание: There isn’t a pen. There aren’t any chairs. Вопрос: Is there a pen? Are there any chairs? Yes, there is. No, there aren’t.`,
  },

  'a1-have-got': {
    text: `Have got значит «есть»: вещь, родственник, волосы, глаза.
I, you, we, they — have got. He, she, it — has got.

Нет: I haven’t got a car. She hasn’t got a bike.
Вопрос без do: Have you got a ticket? Has she got a cat?
Короткий ответ: Yes, I have. No, she hasn’t.
Got в ответ не входит. В «да» форму не сжимают.

Рост, возраст и «устал» идут через to be: She is tall. She is tired.
Волосы и глаза — через has got.
В американском часто без got: I have a bike. Do you have a bike?`,
  },

  'present-simple': {
    text: `Так говорят о том, что бывает регулярно, и о том, что правда вообще.
I go to the gym three times a week. She loves her job.

I, you, we, they — глагол как в словаре: I work. We drink coffee.
He, she, it — добавляют s или es: she works, he finishes, she studies.

Have, do и go после he, she, it другие: has, does, goes.

Нет: don’t или doesn’t. Глагол снова без s.
We don’t eat meat. She doesn’t like coffee.

Вопрос: Do или Does в начале.
Do you work here? Does he speak English?
Короткий ответ: Yes, I do. No, she doesn’t.

То, что происходит прямо сейчас, говорят другой формой, с ing.`,
  },
  'a1-frequency': {
    text: `Always, usually, often, sometimes, never говорят, как часто бывает действие в Present Simple.

Их ставят перед основным глаголом: I usually get up at 7. She never drinks coffee. С am, is, are слово стоит после глагола: She is always late. В отрицании don’t стоит перед usually: I don’t usually work on Sunday.`,
  },

  'a1-can': {
    text: `Can значит три вещи: умею, можно и просьба.
Форма одна для всех: I can, she can. Окончания s нет.
После can глагол без to: can swim, не can to swim.

Нет: can’t. Вопрос без do: Can you swim?
Короткий ответ: Yes, I can. No, I can’t.
Второй глагол в ответе не повторяют.

Умею: I can swim. She can’t drive.
Можно: Can I sit here? You can’t park here.
Просьба: Can you help me, please?
Мягче: Could you speak more slowly?`,
  },

  'a1-imperative': {
    text: `Команда — это глагол в начальной форме без you. You есть по смыслу, но его не пишут: Open the door. Sit down. Be quiet. Отрицание начинается с Don’t: Don’t open the window. Don’t be late. После don’t сразу глагол, без to.

Инструкция — цепочка таких команд. Порядок держат словами first, then, next: First, wash the apple. Then cut it. С please та же форма становится просьбой: Please sit down. Close the door, please. Незнакомому человеку мягче: Could you close the door, please?

Let’s (let us) предлагает сделать что-то вместе, говорящий тоже участвует: Let’s go. Let’s meet at 6. После let’s нет to. Отрицание: Let’s not wait.`,
  },

  'a1-continuous': {
    text: `Эту форму берут, когда действие идёт сейчас или временно: now, today, this week.

Собирают из двух частей: am, is или are и глагол с ing.
I am working. She is reading. They are waiting.
Обе части нужны. She working — не фраза.

Нет ставят после am, is, are: She isn’t reading.
Вопрос: Is she reading? Are you working?
Короткий ответ: Yes, she is. No, she isn’t.
Do здесь не нужен.

Как писать ing: work → working. Немая e уходит: make → making.
Короткая ударная гласная удваивает согласную: sit → sitting.

Привычка остаётся в Present Simple.
I usually walk, but today I am taking the bus.
Know, like, want, need так не ставят: I want tea.`,
  },

  'a1-past': {
    text: `Так говорят о событии, которое уже закончилось.
Рядом часто стоят yesterday, last week, two days ago.
Yesterday и last идут без in.

Обычный глагол: ко всем лицам добавляют ed.
I worked. She worked. Study → studied. Stop → stopped.

Неправильные ed не получают. Форму учат парой.
go — went, see — saw, buy — bought, have — had.
Read пишут так же, читают [red]. Put и cut не меняются.

Нет и вопрос одни на всех: didn’t и Did.
После них глагол снова начальный: I didn’t go. Did you see her?
Короткий ответ: Yes, I did. No, she didn’t.

Was и were спрашивают сами, без Did: Were you at home?
Кто сделал действие — тоже без Did: Who called you?`,
  },

  'a1-future': {
    text: `Будущее на A1 говорят двумя формами. Смотри, когда появилось решение.

Going to — план уже есть, или это уже видно.
Сначала am, is или are, потом going to, потом глагол.
I’m going to study tonight. It’s going to rain.
Вопрос: Are you going to cook? Yes, I am.
После to не ставят ing.

Will — решение прямо сейчас или предсказание без плана.
Форма одна для всех. I’ll call you. I think it will rain.
Нет: won’t. Вопрос: Will you help me? Yes, I will.
После will нет to.

Билеты уже куплены: We’re going to fly.
Дверь звонит сейчас: I’ll open it.`,
  },

  'a1-obligation': {
    text: `Must, have to и should плюс глагол говорят, что действие нужно или разумно.
После must и should нет to и нет s.

Must — «я считаю, что надо»: I must call my mother.
Have to — правило снаружи: She has to wear a uniform.
После she — has to. Вопрос: Do you have to go?

Два «не» разные.
Mustn’t — нельзя: You mustn’t smoke here.
Don’t have to — не обязательно: You don’t have to pay.

Should — совет, мягче must.
You should rest. You shouldn’t worry.`,
  },

  'a1-prep-place': {
    text: `Предлог места стоит перед местом и говорит, где предмет относительно другого. The обычно остаётся: on the table.

In — внутри объёма: in the box, in the room, in London. On — на поверхности: on the table, on the wall. At — точка: at the station, at the bus stop. Under — под. Behind — за. Next to — рядом. Between — между двумя ориентирами: between the shop and the cafe. In front of — перед, of не выбрасывают.`,
  },
  'a1-prep-time': {
    text: `At, in и on ставят время. Здесь они не про место.

At — час и точка: at 7, at night, at the weekend. In — длинный период: in the morning, in the afternoon, in the evening, in June, in summer, in 2020. Ночь с at: at night. On — день и дата: on Friday, on 1 May, on Monday morning.

Today, tomorrow, yesterday, tonight, last, next и every идут без предлога: See you tomorrow. Last week. Every day.`,
  },
  'a1-prep-direction': {
    text: `To отвечает на «куда», from на «откуда». Их ставят перед местом: I go to work. She is from Spain. We walked from the station to the hotel.

Без to идут home, here и there: go home, come here, go there. From с ними остаётся: from home, from here. Into значит движение внутрь: Put the milk into the fridge.`,
  },

  'a1-adj-order': {
    text: `Прилагательное стоит перед существительным и само не меняется: a red car, red cars, a tall woman. Окончания -s у него нет.

Если прилагательных несколько, на A1 держат порядок: мнение, размер, возраст, цвет, откуда, материал. A nice small black bag. An old Italian car. A big wooden table. Артикль стоит перед всей цепочкой. Very и really ставят перед прилагательным: a very big dog.`,
  },
  'a1-comparison': {
    text: `Сравнительная степень сравнивает двоих. Превосходная выбирает одного из группы. Это одна система.

Короткое прилагательное в один слог получает -er и -est: tall → taller than, the tallest. Big → bigger, the biggest: короткая гласная удваивает согласную. На -y: happy → happier, the happiest. Длинное слово получает more и the most: more expensive than, the most expensive. Перед превосходной степенью ставят the. После неё часто группа: the tallest in the class, the best day of the week.

Особые формы: good → better → the best, bad → worse → the worst. Than значит «чем» и стоит перед вторым предметом: Anna is taller than Tom.`,
  },
  'a1-adverbs': {
    text: `Прилагательное говорит, какой предмет: a careful driver, a good singer. Наречие говорит, как делают действие.

От многих прилагательных наречие получают через -ly: slow → slowly, careful → carefully. Happy → happily. Good → well: She sings well. Fast, hard, late и early форму не меняют: He works hard. We arrived late. Наречие ставят после глагола или после дополнения: She speaks slowly. He drives the car carefully.

Hardly — это не «усердно». Hardly значит «едва». Усердно: work hard.`,
  },

  'a1-questions': {
    text: `Эти слова спрашивают деталь, не «да или нет».
Who — человек. What — вещь. Which — выбор из известных.
When — время. Where — место. Why — причина. How — способ.
How many — штуки. How much — масса и цена. Whose — чей.
Whose не путать с who’s: who’s значит who is.

Слово стоит в начале. Дальше обычный вопрос.
Where do you live? When does the shop open?
С to be без do: Where is she? How old are you?
На why часто отвечают because.

Если who или what сами делают действие, do не нужен.
Who lives here? Who called you?
Если действующий на месте, помощник возвращается.
Who did you call? What did you see?`,
  },

  'a1-v-hello': {
    text: `Знакомство собирают связкой, не отдельными словами. Hello уместно всегда. Hi короче. Good morning — до полудня, good afternoon — днём, good evening — вечером. Good night говорят, когда расстаются на ночь, это не «добрый вечер».

Имя и откуда: My name is Anna. I’m from Kazan. После name и перед from нужен to be. В первую встречу: Nice to meet you. Ответ: Nice to meet you too.`,
  },
  'a1-v-family': {
    text: `Семью описывают через have got и притяжательное слово. I have got a brother. His name is Tom. My parents live in Kazan. «У меня есть брат» — have got. «Я сам брат» — I am a brother.

Ближний круг: mother, father, parents, sister, brother, son, daughter, husband, wife. Дальше: grandmother, grandfather, aunt, uncle, cousin. Ребёнок и дети: child, children.`,
  },
  'a1-v-home': {
    text: `Дом называют комнатами и сразу говорят, где вещь. There is a bed in the bedroom. The lamp is on the table.

Комнаты: kitchen, bedroom, bathroom, living room. Предлог перед местом: in the kitchen, on the bed, in the bathroom.`,
  },
  'a1-v-food': {
    text: `Еду делят так же, как существительные. Штука: an apple. Масса и порция: some bread, a cup of tea, a piece of bread.

Приёмы пищи: breakfast, lunch, dinner. Состояние: I’m hungry. I’m thirsty. Заказ: I’d like a tea, please.`,
  },
  'a1-v-shop': {
    text: `В магазине нужны цена, размер и решение. How much is this shirt? Have you got it in medium? I’ll take it. Can I pay by card?

Одежду описывают цветом перед словом: a blue shirt, a pair of trousers, size M. «Надет» говорят через wear: She is wearing a coat.`,
  },
  'a1-v-city': {
    text: `Место в городе спрашивают Where is the…? Дорогу объясняют командами: Go straight. Turn left. Turn right. It’s next to the bank.

Транспорт: by bus, by train, by car. Пешком: on foot.`,
  },
  'a1-v-travel': {
    text: `У стойки хватает коротких фраз с одними и теми же словами. A return ticket, please. Here is my passport. This is my luggage. I have a reservation.

Where is the hotel? The plane is delayed. Luggage в обычной речи не считают по штукам.`,
  },
  'a1-v-health': {
    text: `Боль говорят двумя схемами. Часть тела с my и глагол hurt: My back hurts. My head hurts. Или готовое название: I’ve got a headache. I’ve got a cold.

Дальше: I need a doctor. Foot → feet, tooth → teeth.`,
  },
  'a1-v-work': {
    text: `Профессию называют через to be и артикль: I’m a student. She is a doctor. Место работы: in an office, in a hospital, at a school.

Учёба: I study English. I have homework. She works in a hospital — после she глагол с -s.`,
  },
  'a1-v-hobby': {
    text: `Хобби говорят через like, love, hate и через play, go, watch. I like reading. In my free time I watch films.

Play для игры и мяча: play football. Музыкальный инструмент с the: play the guitar. Занятие на -ing после go: go swimming.`,
  },
  'a1-v-weather': {
    text: `Погоду начинают с it. It здесь способ начать фразу о небе: It’s sunny. It’s cloudy. It’s windy. It’s cold. It’s hot.

Дождь и снег как процесс: It’s raining. It’s snowing. Вчера: It was sunny. It rained.`,
  },
  'a1-v-time': {
    text: `Время спрашивают What time is it? Дату — What is the date? Час ставят с at, день и дату с on: at 7, on Monday, on 5 May.

Половина: It’s half past six. Без четверти: It’s quarter to seven. Thirteen — 13, thirty — 30. Год читают парами: 1998 nineteen ninety-eight.`,
  },
  'a1-v-colours': {
    text: `Цвет стоит перед существительным и не получает окончания: a red car, two red cars. Вопрос: What colour is it? It’s green. Her eyes are green.

Orange как цвет перед гласным звуком: an orange bag.`,
  },
  'a1-v-feelings': {
    text: `Состояние человека говорят через to be: I’m tired. She’s happy. We’re hungry. We’re cold. I’m sad.

Слово на -ed про человека, слово на -ing про вещь или ситуацию: I am bored. The film is boring. Простуда готовой связкой: I’ve got a cold.`,
  },
  'a1-v-daily': {
    text: `Обычный день собирают цепочкой в Present Simple. Время ставят в конец шага: I get up at 7. I have breakfast. I go to work. I get home. I have dinner. I go to bed.

После he, she, it окончание возвращается: She gets up at 7.`,
  },

  'a1-p-hello': {
    text: `Hello подходит в любое время суток. Hi короче и теплее, со знакомым. Good morning — до полудня, good afternoon — после полудня до вечера, good evening — когда уже вечером и вы только встретились.

Good night — прощание перед сном: Good night. Sleep well. Вечером при входе в кафе говорят Good evening.`,
  },
  'a1-p-how': {
    text: `How are you? — короткий вежливый вопрос о делах. Ждут короткий ответ и вопрос назад.

How are you? I’m fine, thanks. And you? Чуть полнее: I’m very well, thank you. Not bad, thanks. Если правда не fine: I’m a bit tired, but I’m OK.`,
  },
  'a1-p-name': {
    text: `Знакомство собирают из трёх фраз: имя, откуда, приятно познакомиться. My name is Anna. I’m from Kazan. Nice to meet you. Ответ: Nice to meet you too.

После name и перед from нужен to be: не My name Anna и не I from Kazan. Третьего представляют так: This is my friend, Lara.`,
  },
  'a1-p-polite': {
    text: `Please смягчает просьбу и обычно стоит в конце: A coffee, please. Thank you отвечают на помощь и подарок. На спасибо: You’re welcome.

Sorry признаёт, что вы уже виноваты или опоздали: Sorry, I’m late. Excuse me — когда вины ещё нет: вы привлекаете внимание или просите пропустить. Excuse me, where is the station? Чужому, чтобы начать вопрос, говорят Excuse me.`,
  },
  'a1-p-repeat': {
    text: `Этими фразами останавливают разговор и просят сказать проще. I don’t understand. Sorry, could you repeat that, please? Could you speak more slowly, please?

Что значит слово: What does this word mean? Чуть проще: Can you say that again? Голая команда Repeat звучит грубо.`,
  },
  'a1-p-like': {
    text: `I’d like — это I would like, «я бы хотел сейчас». Так заказывают и просят. I’d like a tea and a sandwich, please. Can I have the bill, please? I’d like to book a room: после to глагол в начальной форме.

I like значит «мне нравится вообще», не «хочу сейчас». I want в кафе звучит резко.`,
  },
  'a1-p-shop': {
    text: `Покупку доводят цепочкой. Excuse me, how much is this shirt? It’s 25 pounds. Have you got it in medium? I’ll take it. Can I pay by card?

Цену спрашивают How much is it? I’ll take it — решение в момент речи, поэтому will.`,
  },
  'a1-p-way': {
    text: `Дорогу спрашивают с Excuse me. Excuse me, where is the station? Ответ — команды: Go straight on. Then turn left. Turn right at the traffic lights.

It’s next to the bank. Is it far? It’s about five minutes. Left и right без to: turn left, не turn to left. Понятное место в городе с the: the station.`,
  },
  'a1-p-meet': {
    text: `Время встречи собирают из What time, at и Let’s. What time is the film? Let’s meet at 6. See you on Friday at the station.

Час всегда с at: at 6, at half past seven. День с on: on Friday. Отказ: Sorry, I can’t. I’m busy.`,
  },
  'a1-p-usually': {
    text: `I usually… открывает рассказ об обычном дне. Дальше Present Simple, время в конце. I usually get up at 7. On Saturday I usually stay at home.

Usually можно заменить на always, often, sometimes. В отрицании don’t стоит перед usually: I don’t usually work on Sunday. Вопрос: What do you usually do in the evening?`,
  },
  'a1-p-like-hate': {
    text: `Like, love и hate показывают отношение. После них существительное, если это вещь, и -ing, если это действие. I like coffee. I love swimming. I don’t like cold weather. She hates getting up early.

Don’t like мягче, чем hate. Very перед like не ставят. Усиление: I really like tea. I like tea very much. Вопрос: Do you like fish? Yes, I do.`,
  },
  'a1-p-yesterday': {
    text: `Yesterday I… начинает короткий рассказ в Past Simple. Глагол сразу в прошедшей форме. Yesterday I went to the cinema. I was tired, so I stayed at home. Два действия соединяют and или then.

Отрицание: I didn’t go out. После didn’t глагол начальный. Вопрос: What did you do yesterday?`,
  },
  'a1-p-going': {
    text: `I’m going to… сообщает план, который уже есть. Сначала am, is или are, потом going to, потом глагол в начальной форме. I’m going to visit my parents on Sunday. She’s going to learn to drive.

Отрицание: I’m not going to stay late. Вопрос: What are you going to do tonight? После to не ставят -ing: going to study.`,
  },
  'a1-p-sorry': {
    text: `I’m sorry признаёт вину или неловкость. I’m sorry I’m late. Sorry about the noise. I’m sorry I’m late, не I’m sorry for late.

Ответ закрывает извинение: That’s OK. Don’t worry. No problem. I’m really sorry. Если уже случилось и вы виноваты, говорят sorry. Excuse me — до события, когда вы только обращаетесь.`,
  },
  'a1-p-class': {
    text: `На уроке учитель говорит командами: глагол без you. Open your books. Close your books. Listen. Repeat. Read the text. Write your name. Work in pairs. Look at the board.

Две команды соединяют and: Listen and repeat. Отрицание: Don’t look at your phone. Страница: Open your books at page 10.`,
  },
}

export const formulaFor = (id: string): RuleFormula => {
  const formula = EXPLAIN[id]
  if (!formula) throw new Error(`Нет объяснения у правила ${id}`)
  return formula
}

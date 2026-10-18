import type { Rule } from '../types'
import { ex, lesson, mis } from './make'

const unit = 'a1-phrases'

export const PHRASES: Rule[] = [
  lesson('A1', unit, 'a1-p-hello', 'Hello, Hi, Good morning', 'С чего начать', [
    { type: 'lead', text: 'Приветствие выбирают по времени и по тому, знакомый человек или нет. Одна фраза на все случаи звучит чужеродно.' },
    { type: 'schemes', items: ['Hello — всегда', 'Hi — короче, со знакомым', 'Good morning / afternoon / evening', 'Good night — прощание'] },
    {
      type: 'examples',
      items: [
        ex('Hello. Can I help you?', 'Здравствуйте. Чем помочь?', 'Продавец в магазине. Нейтрально.'),
        ex('Hi, Tom. How are you?', 'Привет, Том. Как дела?', 'Со знакомым.'),
        ex('Good morning. The meeting is at 9.', 'Доброе утро. Встреча в девять.', 'До полудня.'),
        ex('Good afternoon.', 'Добрый день.', 'После полудня, до вечера.'),
        ex('Good evening. A table for two, please.', 'Добрый вечер. Столик на двоих.', 'Вход в кафе вечером.'),
        ex('Good night. Sleep well.', 'Спокойной ночи.', 'Уходите спать. Это не приветствие.'),
      ],
    },
    { type: 'mistakes', items: [
      mis('Good night при входе.', 'Good evening.', 'Good night — прощание.'),
      mis('Good morning в 8 вечера.', 'Good evening.', 'Morning только до полудня.'),
    ] },
    ]),
  lesson('A1', unit, 'a1-p-how', 'How are you?', 'Короткий ответ и вопрос назад', [
    { type: 'lead', text: 'How are you? ждут короткий ответ, не историю болезни. Потом спрашивают назад.' },
    { type: 'schemes', items: ['How are you?', 'I’m fine, thanks. And you?', 'Not bad, thanks.', 'I’m a bit tired, but I’m OK.'] },
    {
      type: 'examples',
      items: [
        ex('How are you? I’m fine, thanks.', 'Как дела? Хорошо, спасибо.', 'В коридоре. Коротко.'),
        ex('And you?', 'А ты?', 'Обязательный возврат вопроса.'),
        ex('I’m very well, thank you.', 'Очень хорошо, спасибо.', 'Чуть полнее, чем fine.'),
        ex('Not bad, thanks.', 'Неплохо, спасибо.', 'Нейтрально, без восторга.'),
        ex('I’m a bit tired, but I’m OK.', 'Немного устал, но нормально.', 'Если правда не fine. Всё равно коротко.'),
        ex('How are you? Fine. And you? Good, thanks.', 'Как дела? Нормально. А ты? Хорошо.', 'Два хода диалога.'),
      ],
    },
    { type: 'mistakes', items: [
      mis('How you are?', 'How are you?', 'Are перед you.'),
      mis('I fine.', 'I’m fine.', 'Нужен am.'),
      mis('Длинный рассказ вместо fine.', 'I’m fine, thanks. And you?', 'Сначала короткий ответ.'),
    ] },
    ]),
  lesson('A1', unit, 'a1-p-name', 'My name is… I’m from…', 'Nice to meet you', [
    { type: 'lead', text: 'Знакомство — три фразы подряд: имя, откуда, приятно. Одного имени мало.' },
    { type: 'schemes', items: ['My name is…', 'I’m from…', 'Nice to meet you.', 'Nice to meet you too.'] },
    {
      type: 'examples',
      items: [
        ex('My name is Anna. I’m from Kazan.', 'Меня зовут Анна. Я из Казани.', 'Первая встреча.'),
        ex('Nice to meet you.', 'Приятно познакомиться.', 'Сразу после имени.'),
        ex('Nice to meet you too.', 'Мне тоже.', 'Ответ. Too в конце.'),
        ex('This is my friend, Lara.', 'Это моя подруга, Лара.', 'Представляешь третьего.'),
        ex('I’m Anna. And you?', 'Я Анна. А ты?', 'Короче, чем My name is.'),
        ex('Where are you from? I’m from Spain.', 'Откуда ты? Я из Испании.', 'From после am.'),
      ],
    },
    { type: 'mistakes', items: [
      mis('My name Anna.', 'My name is Anna.', 'Нужен is.'),
      mis('I from Kazan.', 'I’m from Kazan.', 'Нужен am.'),
      mis('Nice to meet.', 'Nice to meet you.', 'You не выбрасывают.'),
    ] },
    ]),
  lesson('A1', unit, 'a1-p-polite', 'Please, Thank you, Sorry, Excuse me', 'Четыре слова вежливости', [
    { type: 'lead', text: 'Sorry и excuse me путают чаще всего. Sorry — когда уже виноват. Excuse me — когда вины ещё нет, ты только обращаешься.' },
    { type: 'schemes', items: ['просьба + please', 'Thank you. You’re welcome.', 'Sorry, I’m late.', 'Excuse me, where is…?'] },
    {
      type: 'examples',
      items: [
        ex('A coffee, please.', 'Кофе, пожалуйста.', 'Please обычно в конце.'),
        ex('Thank you. You’re welcome.', 'Спасибо. Пожалуйста.', 'На спасибо — you’re welcome.'),
        ex('Sorry, I’m late.', 'Извини, я опоздал.', 'Уже случилось. Sorry.'),
        ex('Excuse me, where is the station?', 'Извините, где станция?', 'Ты ещё ничего не сделал. Excuse me.'),
        ex('Excuse me, can I come in?', 'Извините, можно войти?', 'Привлекаешь внимание.'),
        ex('Thanks for the help.', 'Спасибо за помощь.', 'Thanks короче, чем thank you.'),
      ],
    },
    { type: 'mistakes', items: [
      mis('Sorry, where is the station? незнакомцу.', 'Excuse me, where is the station?', 'Чтобы начать вопрос — excuse me.'),
      mis('Please a coffee. в начале как единственная форма.', 'A coffee, please.', 'Please спокойно стоит в конце.'),
    ] },
    ]),
  lesson('A1', unit, 'a1-p-repeat', 'Could you repeat? I don’t understand', 'Когда не расслышали', [
    { type: 'lead', text: 'Этими фразами останавливают разговор и просят сказать проще. Голая команда Repeat звучит грубо.' },
    { type: 'schemes', items: ['I don’t understand.', 'Could you repeat that, please?', 'Could you speak more slowly?', 'What does this word mean?'] },
    {
      type: 'examples',
      items: [
        ex('Sorry, I don’t understand.', 'Извините, я не понимаю.', 'Честно останавливаешь разговор.'),
        ex('Could you repeat that, please?', 'Повторите, пожалуйста.', 'Не расслышал фразу.'),
        ex('Could you speak more slowly, please?', 'Говорите медленнее, пожалуйста.', 'Темп, не громкость.'),
        ex('What does this word mean?', 'Что значит это слово?', 'Палец на слово в меню.'),
        ex('Can you say that again?', 'Скажите ещё раз.', 'Чуть проще, чем could you repeat.'),
        ex('Sorry, could you repeat the address?', 'Повторите адрес, пожалуйста.', 'В такси. Конкретная деталь.'),
      ],
    },
    { type: 'mistakes', items: [
      mis('Repeat.', 'Could you repeat that, please?', 'Голая команда грубая.'),
      mis('I not understand.', 'I don’t understand.', 'Нужен don’t.'),
    ] },
    ]),
  lesson('A1', unit, 'a1-p-like', 'I’d like… Can I have…?', 'Как заказать и попросить', [
    { type: 'lead', text: 'I’d like — «я бы хотел сейчас». I like — «мне нравится вообще». В кафе нужна первая фраза.' },
    { type: 'schemes', items: ['I’d like + вещь', 'I’d like to + глагол', 'Can I have…, please?'] },
    {
      type: 'examples',
      items: [
        ex('I’d like a tea and a sandwich, please.', 'Мне чай и сэндвич.', 'Заказ официанту.'),
        ex('Can I have the bill, please?', 'Можно счёт?', 'Конец ужина.'),
        ex('I’d like to book a room.', 'Я хотел бы забронировать номер.', 'После to глагол в начальной форме.'),
        ex('I like tea.', 'Мне нравится чай.', 'Вообще, не заказ прямо сейчас.'),
        ex('I’d like this one, please.', 'Мне вот этот, пожалуйста.', 'В магазине, вещь в руке.'),
        ex('Can I have some water?', 'Можно воды?', 'Просьба, some в просьбе уместен.'),
      ],
    },
    { type: 'mistakes', items: [
      mis('I want a tea. в кафе.', 'I’d like a tea, please.', 'I want звучит резко.'),
      mis('I like a tea now. как заказ.', 'I’d like a tea.', 'I like — про вкус вообще.'),
      mis('I’d like booking a room.', 'I’d like to book a room.', 'После to начальная форма.'),
    ] },
    ]),
  lesson('A1', unit, 'a1-p-shop', 'How much is it? I’ll take it', 'Покупка до конца', [
    { type: 'lead', text: 'Покупку доводят цепочкой: цена, размер, решение, оплата. Обрывать на цене рано.' },
    { type: 'schemes', items: ['How much is this…?', 'Have you got it in…?', 'I’ll take it.', 'Can I pay by card?'] },
    {
      type: 'examples',
      items: [
        ex('Excuse me, how much is this shirt?', 'Извините, сколько стоит эта рубашка?', 'Начинаешь с excuse me.'),
        ex('It’s 25 pounds.', '25 фунтов.', 'Ответ продавца. Ты его понимаешь.'),
        ex('Have you got it in medium?', 'Есть размер M?', 'До того как сказать «беру».'),
        ex('I’ll take it.', 'Я возьму.', 'Решение в момент речи.'),
        ex('Can I pay by card?', 'Можно картой?', 'Касса.'),
        ex('I’ll take the blue one.', 'Возьму синюю.', 'One вместо повтора слова shirt.'),
      ],
    },
    { type: 'mistakes', items: [
      mis('How many is it?', 'How much is it?', 'Цена — much.'),
      mis('I take it. как решение сейчас.', 'I’ll take it.', 'Решение в эту секунду — will.'),
    ] },
    ]),
  lesson('A1', unit, 'a1-p-way', 'Where is…?', 'Go straight, turn left, turn right', [
    { type: 'lead', text: 'Дорогу спрашивают с excuse me. Ответ — команды, не рассказ. Left и right без to.' },
    { type: 'schemes', items: ['Excuse me, where is…?', 'Go straight.', 'Turn left / turn right.', 'It’s next to…'] },
    {
      type: 'examples',
      items: [
        ex('Excuse me, where is the station?', 'Извините, где станция?', 'На улице незнакомцу.'),
        ex('Go straight on.', 'Идите прямо.', 'Первая команда.'),
        ex('Then turn left.', 'Потом налево.', 'Then держит порядок.'),
        ex('Turn right at the traffic lights.', 'Направо у светофора.', 'Ориентир в конце.'),
        ex('It’s next to the bank.', 'Это рядом с банком.', 'Финал объяснения.'),
        ex('Is it far? It’s about five minutes.', 'Далеко? Минут пять.', 'Is it far — голос вверх.'),
      ],
    },
    { type: 'mistakes', items: [
      mis('Turn to left.', 'Turn left.', 'Без to.'),
      mis('Where is station?', 'Where is the station?', 'Понятное место в городе с the.'),
    ] },
    ]),
  lesson('A1', unit, 'a1-p-meet', 'What time…? Let’s meet at…', 'Договориться о встрече', [
    { type: 'lead', text: 'Время встречи собирают из what time, at и let’s. Час всегда с at, день с on.' },
    { type: 'schemes', items: ['What time is…?', 'Let’s meet at…', 'See you on… at…', 'Sorry, I can’t. I’m busy.'] },
    {
      type: 'examples',
      items: [
        ex('What time is the film?', 'Во сколько фильм?', 'Афиша.'),
        ex('Let’s meet at 6.', 'Давай встретимся в шесть.', 'В чате. At 6.'),
        ex('See you on Friday at the station.', 'Увидимся в пятницу на станции.', 'День с on, место с at, если это точка.'),
        ex('Let’s meet at half past seven.', 'Давай в половину восьмого.', 'Half past + час.'),
        ex('Sorry, I can’t. I’m busy.', 'Извини, не могу. Я занят.', 'Отказ. Две короткие фразы.'),
        ex('Is 6 OK? Yes, 6 is fine.', 'Шесть нормально? Да, шесть подходит.', 'Короткое согласие на время.'),
      ],
    },
    { type: 'mistakes', items: [
      mis('Let’s meet in 6.', 'Let’s meet at 6.', 'Час — at.'),
      mis('See you in Friday.', 'See you on Friday.', 'День — on.'),
      mis('I can’t. без причины.', 'Sorry, I can’t. I’m busy.', 'Отказ мягче с sorry.'),
    ] },
    ]),
  lesson('A1', unit, 'a1-p-usually', 'I usually…', 'Рассказать про привычку', [
    { type: 'lead', text: 'I usually… открывает рассказ об обычном дне. Дальше Present Simple, время в конце.' },
    { type: 'schemes', items: ['I usually + глагол', 'On Saturday I usually…', 'I don’t usually…', 'What do you usually do…?'] },
    {
      type: 'examples',
      items: [
        ex('I usually get up at 7.', 'Обычно я встаю в семь.', 'Будний день.'),
        ex('On Saturday I usually stay at home.', 'По субботам я обычно сижу дома.', 'День с on, в начале.'),
        ex('I always have coffee in the morning.', 'Утром я всегда пью кофе.', 'Always на том же месте, что usually.'),
        ex('I don’t usually work on Sunday.', 'По воскресеньям я обычно не работаю.', 'Don’t перед usually.'),
        ex('Sometimes I walk to work.', 'Иногда я хожу на работу пешком.', 'Sometimes можно в начало.'),
        ex('What do you usually do in the evening?', 'Что ты обычно делаешь вечером?', 'Вопрос соседу.'),
      ],
    },
    { type: 'mistakes', items: [
      mis('I usually am get up at 7.', 'I usually get up at 7.', 'Один глагол.'),
      mis('I not usually work.', 'I don’t usually work.', 'Нужен don’t.'),
    ] },
    ]),
  lesson('A1', unit, 'a1-p-like-hate', 'I like / love / hate…', 'Что нравится', [
    { type: 'lead', text: 'Like, love и hate показывают отношение. После них вещь или действие на -ing. Don’t like мягче, чем hate.' },
    { type: 'schemes', items: ['I like + вещь', 'I love / hate + -ing', 'I don’t like…', 'I really like… / I like … very much'] },
    {
      type: 'examples',
      items: [
        ex('I like coffee.', 'Мне нравится кофе.', 'Вещь без -ing.'),
        ex('I love swimming.', 'Я обожаю плавать.', 'Действие на -ing.'),
        ex('I don’t like cold weather.', 'Я не люблю холодную погоду.', 'Мягкое «не нравится».'),
        ex('She hates getting up early.', 'Она ненавидит рано вставать.', 'После she — hates. Getting на -ing.'),
        ex('I really like tea.', 'Мне правда нравится чай.', 'Very перед like не ставят.'),
        ex('Do you like fish? Yes, I do.', 'Тебе нравится рыба? Да.', 'Краткий ответ без like.'),
      ],
    },
    { type: 'mistakes', items: [
      mis('I very like tea.', 'I really like tea. / I like tea very much.', 'Very перед like не стоит.'),
      mis('I like swim.', 'I like swimming.', 'Действие на -ing.'),
      mis('She hate coffee.', 'She hates coffee.', 'После she есть -s.'),
    ] },
    ]),
  lesson('A1', unit, 'a1-p-yesterday', 'Yesterday I…', 'Короткий рассказ о прошлом', [
    { type: 'lead', text: 'Yesterday I… начинает короткий рассказ. Глагол сразу в прошедшей форме. Два действия соединяют and или then.' },
    { type: 'schemes', items: ['Yesterday I + вторая форма', 'I didn’t + начальная', 'What did you do yesterday?'] },
    {
      type: 'examples',
      items: [
        ex('Yesterday I went to the cinema.', 'Вчера я ходил в кино.', 'Go → went.'),
        ex('I saw a good film.', 'Я посмотрел хороший фильм.', 'See → saw. Второе предложение той же истории.'),
        ex('I was tired, so I stayed at home.', 'Я устал, поэтому остался дома.', 'Was для состояния, stayed для обычного глагола.'),
        ex('Then I cooked dinner.', 'Потом я приготовил ужин.', 'Then держит порядок.'),
        ex('I didn’t go out.', 'Я не выходил.', 'После didn’t снова go.'),
        ex('What did you do yesterday?', 'Что ты делал вчера?', 'Вопрос другу.'),
      ],
    },
    { type: 'mistakes', items: [
      mis('Yesterday I go.', 'Yesterday I went.', 'Нужна прошедшая форма.'),
      mis('I didn’t went.', 'I didn’t go.', 'После didn’t начальная форма.'),
      mis('What you did yesterday?', 'What did you do yesterday?', 'Did перед you.'),
    ] },
    ]),
  lesson('A1', unit, 'a1-p-going', 'I’m going to…', 'Сказать о плане', [
    { type: 'lead', text: 'I’m going to… — план, который уже есть. Не решение в эту секунду: для него will.' },
    { type: 'schemes', items: ['I’m / She’s going to + глагол', 'I’m not going to…', 'What are you going to do?'] },
    {
      type: 'examples',
      items: [
        ex('I’m going to visit my parents on Sunday.', 'В воскресенье я поеду к родителям.', 'План уже есть. День с on.'),
        ex('She’s going to learn to drive.', 'Она собирается учиться водить.', 'После she — is. После to начальная форма.'),
        ex('We’re going to fly on Friday.', 'В пятницу мы летим.', 'Билеты куплены.'),
        ex('I’m not going to stay late.', 'Я не собираюсь задерживаться.', 'Not после am.'),
        ex('What are you going to do tonight?', 'Что будешь делать сегодня вечером?', 'Вопрос другу вечером.'),
        ex('I’m going to study tonight.', 'Сегодня вечером я буду заниматься.', 'После to начальная форма: study, не studying.'),
      ],
    },
    { type: 'mistakes', items: [
      mis('I going to study.', 'I’m going to study.', 'Нужен am.'),
      mis('I’m going to studying.', 'I’m going to study.', 'После to начальная форма.'),
      mis('She going to come.', 'She’s going to come.', 'Нужен is.'),
    ] },
    ]),
  lesson('A1', unit, 'a1-p-sorry', 'I’m sorry. That’s OK', 'Извиниться и принять извинение', [
    { type: 'lead', text: 'I’m sorry признаёт вину. Ответ закрывает извинение, чтобы разговор не завис. Excuse me — до события, когда ты только обращаешься.' },
    { type: 'schemes', items: ['I’m sorry I’m…', 'Sorry about…', 'That’s OK. / Don’t worry. / No problem.'] },
    {
      type: 'examples',
      items: [
        ex('I’m sorry I’m late.', 'Извини, я опоздал.', 'Уже пришёл позже. Sorry.'),
        ex('Sorry about the noise.', 'Извини за шум.', 'About + вещь, не for late.'),
        ex('That’s OK.', 'Ничего страшного.', 'Принимаешь извинение.'),
        ex('Don’t worry.', 'Не переживай.', 'Мягкий ответ.'),
        ex('No problem.', 'Без проблем.', 'Коротко, между знакомыми.'),
        ex('I’m really sorry.', 'Мне правда жаль.', 'Сильнее, чем просто sorry.'),
      ],
    },
    { type: 'mistakes', items: [
      mis('I’m sorry for late.', 'I’m sorry I’m late.', 'Late через I’m, не через for.'),
      mis('Excuse me, I’m late. когда уже опоздал.', 'I’m sorry I’m late.', 'Вина уже есть — sorry.'),
    ] },
    ]),
  lesson('A1', unit, 'a1-p-class', 'Open your books. Listen. Repeat', 'Фразы урока', [
    { type: 'lead', text: 'На уроке учитель говорит командами: глагол без you. Две команды соединяют and.' },
    { type: 'schemes', items: ['Open / Close your books', 'Listen. Repeat.', 'Don’t look…', 'Open your books at page 10'] },
    {
      type: 'examples',
      items: [
        ex('Open your books.', 'Откройте книги.', 'Начало задания.'),
        ex('Close your books.', 'Закройте книги.', 'Конец.'),
        ex('Listen and repeat.', 'Слушайте и повторяйте.', 'Две команды через and.'),
        ex('Read the text. Write your name.', 'Прочитайте текст. Напишите имя.', 'Два шага.'),
        ex('Work in pairs. Look at the board.', 'Работайте в парах. Смотрите на доску.', 'Организация класса.'),
        ex('Don’t look at your phone. Open your books at page 10.', 'Не смотрите в телефон. Откройте книги на странице 10.', 'Запрет через don’t. Страница с at.'),
      ],
    },
    { type: 'mistakes', items: [
      mis('You open your books.', 'Open your books.', 'В команде you не пишут.'),
      mis('Open your books on page 10.', 'Open your books at page 10.', 'Страница — at.'),
      mis('Don’t to look.', 'Don’t look.', 'После don’t нет to.'),
    ] },
    ]),
]

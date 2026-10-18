import type { Rule } from '../types'
import { ex, lesson, mis } from './make'

const unit = 'a1-phonetics'

export const PHONETICS: Rule[] = [
  lesson('A1', unit, 'a1-alphabet', 'Алфавит', '26 букв: гласные и согласные', [
    {
      type: 'tiles',
      items: [
        { title: 'A a', caption: '«эй»', text: 'apple — яблоко' },
        { title: 'B b', caption: '«би»', text: 'book — книга' },
        { title: 'C c', caption: '«си»', text: 'cat — кот' },
        { title: 'D d', caption: '«ди»', text: 'dog — собака' },
        { title: 'E e', caption: '«и»', text: 'egg — яйцо' },
        { title: 'F f', caption: '«эф»', text: 'fish — рыба' },
        { title: 'G g', caption: '«джи»', text: 'girl — девочка' },
        { title: 'H h', caption: '«эйч»', text: 'house — дом' },
        { title: 'I i', caption: '«ай»', text: 'ice — лёд' },
        { title: 'J j', caption: '«джей»', text: 'juice — сок' },
        { title: 'K k', caption: '«кей»', text: 'key — ключ' },
        { title: 'L l', caption: '«эл»', text: 'lamp — лампа' },
        { title: 'M m', caption: '«эм»', text: 'man — мужчина' },
        { title: 'N n', caption: '«эн»', text: 'nose — нос' },
        { title: 'O o', caption: '«оу»', text: 'orange — апельсин' },
        { title: 'P p', caption: '«пи»', text: 'pen — ручка' },
        { title: 'Q q', caption: '«кью»', text: 'queen — королева' },
        { title: 'R r', caption: '«ар»', text: 'red — красный' },
        { title: 'S s', caption: '«эс»', text: 'sun — солнце' },
        { title: 'T t', caption: '«ти»', text: 'table — стол' },
        { title: 'U u', caption: '«ю»', text: 'umbrella — зонт' },
        { title: 'V v', caption: '«ви»', text: 'van — фургон' },
        { title: 'W w', caption: '«дабл-ю»', text: 'window — окно' },
        { title: 'X x', caption: '«экс»', text: 'X-ray — рентген' },
        { title: 'Y y', caption: '«уай»', text: 'yellow — жёлтый' },
        { title: 'Z z', caption: '«зед» / «зи»', text: 'zoo — зоопарк' },
      ],
    },
    { type: 'text', text: 'Гласные плитки подсвечены зелёным: A, E, I, O, U. Буква Y — жёлтая: она иногда гласная. Остальные — согласные.' },
    { type: 'heading', text: 'Имя буквы и звук — не одно и то же' },
    { type: 'text', text: 'Имя называем в алфавите. Звук — то, что слышно в слове. C — «си», но в cat читается [k].' },
    {
      type: 'examples',
      items: [
        ex('C. Cat [kæt].', 'Буква C называется «си». В слове cat звучит [к].'),
        ex('A. Cat [kæt].', 'Буква A называется «эй». В слове cat звучит [æ].'),
        ex('G. Girl [ɡɜːl].', 'Буква G называется «джи». В слове girl звучит [г].'),
      ],
    },
    { type: 'heading', text: 'Мини-практика' },
    {
      type: 'examples',
      items: [
        ex('Anna. A-N-N-A.', 'Анна. «Эй, эн, эн, эй».', 'Продиктуй своё имя по буквам.'),
        ex('London. L-O-N-D-O-N.', 'Лондон. «Эл, оу, эн, ди, оу, эн».', 'Продиктуй город по буквам.'),
        ex('UK. U-K. USA. U-S-A.', '«Ю, кей. Ю, эс, эй».', 'Сокращения тоже диктуют по буквам.'),
      ],
    },
    { type: 'callout', title: 'Запомнить', text: 'Z читается «зед» в Британии и «зи» в Америке.' },
    { type: 'heading', text: 'Порядок по ритму' },
    { type: 'schemes', items: ['A B C D E F G', 'H I J K L M N', 'O P Q R S T U V', 'W X Y Z'] },
    { type: 'text', text: 'Проговори строчки подряд под ритм — так порядок запоминается сам.' },
    ]),
  lesson('A1', unit, 'a1-sounds', 'Звуки, которых нет в русском', 'Семь звуков, которые придётся поставить с нуля', [
    { type: 'heading', text: 'Звуки и слова' },
    {
      type: 'tiles',
      items: [
        { title: '[θ]', caption: 'thin', text: 'тонкий' },
        { title: '[ð]', caption: 'this', text: 'это' },
        { title: '[w]', caption: 'we', text: 'мы' },
        { title: '[ŋ]', caption: 'sing', text: 'петь' },
        { title: '[æ]', caption: 'cat', text: 'кот' },
        { title: '[ɜː]', caption: 'bird', text: 'птица' },
        { title: '[ə]', caption: 'about', text: 'о, про' },
      ],
    },
    { type: 'heading', text: 'Похожие пары' },
    {
      type: 'split',
      items: [
        { title: 'Глухой', caption: '[θ]', example: 'thin', translation: 'тонкий' },
        { title: 'Звонкий', caption: '[ð]', example: 'this', translation: 'это' },
      ],
    },
    {
      type: 'split',
      items: [
        { title: 'Thin', caption: '[θ]', example: 'A thin coat.', translation: 'Тонкое пальто.' },
        { title: 'Sin', caption: '[s]', example: 'It is a sin.', translation: 'Это грех.' },
      ],
    },
    {
      type: 'split',
      items: [
        { title: 'Three', caption: '[θ]', example: 'Three birds.', translation: 'Три птицы.' },
        { title: 'Tree', caption: '[t]', example: 'A green tree.', translation: 'Зелёное дерево.' },
      ],
    },
    {
      type: 'split',
      items: [
        { title: 'They', caption: '[ð]', example: 'They sing.', translation: 'Они поют.' },
        { title: 'Day', caption: '[d]', example: 'A long day.', translation: 'Долгий день.' },
      ],
    },
    {
      type: 'split',
      items: [
        { title: 'We', caption: '[w]', example: 'We work.', translation: 'Мы работаем.' },
        { title: 'Van', caption: '[v]', example: 'A white van.', translation: 'Белый фургон.' },
      ],
    },
    {
      type: 'split',
      items: [
        { title: 'Songs', caption: '[ŋ]', example: 'Two songs.', translation: 'Две песни.' },
        { title: 'Sons', caption: '[n]', example: 'Two sons.', translation: 'Два сына.' },
      ],
    },
    {
      type: 'split',
      items: [
        { title: 'Bad', caption: '[æ]', example: 'A bad cat.', translation: 'Плохой кот.' },
        { title: 'Bed', caption: '[e]', example: 'The bed is big.', translation: 'Кровать большая.' },
      ],
    },
    {
      type: 'split',
      items: [
        { title: 'Shirt', caption: '[ɜː]', example: 'A clean shirt.', translation: 'Чистая рубашка.' },
        { title: 'Short', caption: '[ɔː]', example: 'A short film.', translation: 'Короткий фильм.' },
      ],
    },
    {
      type: 'split',
      items: [
        { title: 'About', caption: '[ə]', example: 'About six.', translation: 'Около шести.' },
        { title: 'Sofa', caption: '[ə]', example: 'On the sofa.', translation: 'На диване.' },
      ],
    },
    { type: 'heading', text: 'Примеры' },
    {
      type: 'examples',
      items: [
        ex('Thin, not sin.', 'Тонкий, не «грех».'),
        ex('This is my bag.', 'Это моя сумка.'),
        ex('We work on Friday.', 'Мы работаем в пятницу.'),
        ex('The cat is on the bed.', 'Кот на кровати.'),
        ex('Birds sing in the morning.', 'Птицы поют утром.'),
        ex('Tell me about the film.', 'Расскажи про фильм.'),
      ],
    },
    ]),
  lesson('A1', unit, 'a1-transcription', 'Транскрипция', 'Скобки, ударение и долгота', [
    { type: 'heading', text: 'Знаки и слова' },
    {
      type: 'tiles',
      items: [
        { title: '[ɪ]', caption: 'sit', text: 'сидеть' },
        { title: '[iː]', caption: 'see', text: 'видеть' },
        { title: '[e]', caption: 'pen', text: 'ручка' },
        { title: '[æ]', caption: 'cat', text: 'кот' },
        { title: '[ʌ]', caption: 'cup', text: 'чашка' },
        { title: '[ɒ]', caption: 'dog', text: 'собака' },
        { title: '[ʊ]', caption: 'book', text: 'книга' },
        { title: '[uː]', caption: 'food', text: 'еда' },
        { title: '[ə]', caption: 'about', text: 'о, про' },
        { title: '[ɜː]', caption: 'bird', text: 'птица' },
        { title: '[eɪ]', caption: 'name', text: 'имя' },
        { title: '[aɪ]', caption: 'like', text: 'любить' },
        { title: '[əʊ]', caption: 'go', text: 'идти' },
        { title: '[ɔɪ]', caption: 'boy', text: 'мальчик' },
        { title: '[aʊ]', caption: 'house', text: 'дом' },
        { title: '[ɪə]', caption: 'here', text: 'здесь' },
        { title: '[eə]', caption: 'where', text: 'где' },
        { title: '[ʊə]', caption: 'sure', text: 'уверен' },
        { title: '[ɔː]', caption: 'door', text: 'дверь' },
        { title: '[ɑː]', caption: 'car', text: 'машина' },
      ],
    },
    { type: 'heading', text: 'Три главных знака' },
    {
      type: 'tiles',
      items: [
        { title: '[ ]', caption: 'скобки', text: 'звук, а не буква' },
        { title: 'ˈ', caption: 'ударение', text: 'перед ударным слогом' },
        { title: 'ː', caption: 'долгота', text: 'тяни звук' },
      ],
    },
    { type: 'heading', text: 'Скобки [ ]' },
    {
      type: 'split',
      items: [
        { title: 'Буквы', caption: 'cat', example: 'c + a + t', translation: 'Так пишется.' },
        { title: 'Звуки', caption: '[kæt]', example: '[k] + [æ] + [t]', translation: 'Так звучит.' },
      ],
    },
    { type: 'heading', text: 'Ударение ˈ' },
    {
      type: 'split',
      items: [
        { title: 'Table', caption: '[ˈteɪbl]', example: 'A round table.', translation: 'Круглый стол. Ударный первый слог.' },
        { title: 'About', caption: '[əˈbaʊt]', example: 'A book about cats.', translation: 'Книга про котов. Ударный второй слог.' },
      ],
    },
    { type: 'heading', text: 'Долгота ː' },
    {
      type: 'split',
      items: [
        { title: 'Sit', caption: '[sɪt]', example: 'Sit down.', translation: 'Садись. Коротко.' },
        { title: 'See', caption: '[siː]', example: 'I see a ship.', translation: 'Вижу корабль. Долго.' },
      ],
    },
    { type: 'heading', text: 'Примеры' },
    {
      type: 'examples',
      items: [
        ex('See the ship.', 'Вижу корабль.'),
        ex('Her name is Kate.', 'Её зовут Кейт.'),
        ex('The dog is here.', 'Собака здесь.'),
        ex('A book about food.', 'Книга про еду.'),
        ex('Mother is at home.', 'Мама дома.'),
        ex('I like tea.', 'Я люблю чай.'),
        ex('A red car.', 'Красная машина.'),
        ex('A white horse.', 'Белая лошадь.'),
      ],
    },
    ]),
  lesson('A1', unit, 'a1-syllables', 'Открытый и закрытый слог', 'Как читать a, e, i, o, u', [
    { type: 'lead', text: 'От этого зависит, прочитаешь ты name как имя или как «намэ». Одна немая e на конце меняет и звук, и смысл.' },
    { type: 'schemes', items: ['закрытый: согласная в конце → гласная короткая', 'открытый: гласная в конце → буква называет себя', 'немая e открывает слог'] },
    {
      type: 'split',
      items: [
        { title: 'Закрытый', caption: 'конец на согласную', example: 'cat, pen, big, dog, cup', translation: 'Гласная короткая.' },
        { title: 'Открытый', caption: 'конец на гласную', example: 'he, go, name, like', translation: 'Буква называет себя.' },
      ],
    },
    {
      type: 'table',
      head: ['Буква', 'Закрытый', 'Открытый'],
      rows: [
        ['a', 'cat [kæt] кот', 'name [neɪm] имя'],
        ['e', 'pen [pen] ручка', 'he [hiː] он'],
        ['i', 'big [bɪɡ] большой', 'like [laɪk] нравиться'],
        ['o', 'dog [dɒɡ] собака', 'go [ɡəʊ] идти'],
        ['u', 'cup [kʌp] чашка', 'music [ˈmjuːzɪk] музыка'],
      ],
    },
    { type: 'text', text: 'Открытое u чаще [juː]: music, student, use, cute. Немая e сама не звучит: cap кепка, cape накидка.' },
    {
      type: 'examples',
      items: [
        ex('A big cat.', 'Большой кот.', 'Big и cat закрытые, гласные короткие.'),
        ex('Her name is Kate.', 'Её зовут Кейт.', 'Name и Kate: немая e, a читается «эй».'),
        ex('He likes tea.', 'Он любит чай.', 'He — открытое e, like — открытое i.'),
        ex('Go home at six.', 'Иди домой в шесть.', 'Go открытое. Home тоже с немой e.'),
        ex('The student likes music.', 'Студенту нравится музыка.', 'U в student и music звучит как «ю».'),
        ex('Cap or cape?', 'Кепка или накидка?', 'Одна e меняет слово. В магазине одежды это важно.'),
      ],
    },
    {
      type: 'mistakes',
      items: [
        mis('Name как «намэ».', 'Name [neɪm]. Конечная e молчит.', 'Она только открывает слог.'),
        mis('Like как «лик».', 'Like [laɪk]: i называет себя, «ай».', 'Смотри тип слога, не длину слова.'),
        mis('Music как «мусик».', 'Music [ˈmjuːzɪk]: открытое u даёт «ю».', 'Так же student, use, cute.'),
      ],
    },
    ]),
  lesson('A1', unit, 'a1-digraphs', 'Чтение сочетаний', 'th, sh, ch, ph, wh, ee, ea, oo и другие', [
    { type: 'lead', text: 'Две буквы рядом часто дают один звук. Если читать их по-русски по отдельности, chair станет «хаир», а phone — «пхонэ».' },
    { type: 'schemes', items: ['sh = ш', 'ch = ч', 'ph = ф', 'th = язык между зубами', 'ee / чаще ea = долгое и'] },
    {
      type: 'table',
      head: ['Буквы', 'Звук', 'Пример'],
      rows: [
        ['th', '[θ] глухо / [ð] звонко', 'thin; this'],
        ['sh', '[ʃ]', 'she — она'],
        ['ch', '[tʃ]', 'chair — стул'],
        ['ph', '[f]', 'phone — телефон'],
        ['wh', '[w], who через [h]', 'what; who'],
        ['ee', '[iː]', 'see — видеть'],
        ['ea', '[iː], иногда [e]', 'sea; bread'],
        ['oo', '[uː] / [ʊ]', 'food; book'],
        ['ou', '[aʊ]', 'house — дом'],
        ['ow', '[aʊ] / [əʊ]', 'cow; snow'],
        ['ar', '[ɑː]', 'car — машина'],
        ['er, ir, ur', '[ɜː]', 'her; bird; turn'],
        ['or', '[ɔː]', 'horse — лошадь'],
      ],
    },
    { type: 'text', text: 'В коротких словах the, this, that, they, them th звонкое. В thin, three, thank глухое. Oo перед k чаще короткое: book, look, cook. Ea в bread, head, breakfast короткое.' },
    {
      type: 'examples',
      items: [
        ex('This shop is cheap.', 'Этот магазин дешёвый.', 'This — звонкое th, shop — sh, cheap — ch.'),
        ex('She sees the sea.', 'Она видит море.', 'See и sea оба с долгим «и».'),
        ex('Good food, please.', 'Хорошей еды, пожалуйста.', 'В кафе. Good короткое, food долгое.'),
        ex('The car is near the horse.', 'Машина рядом с лошадью.', 'Car — ar, horse — or.'),
        ex('Who is at home?', 'Кто дома?', 'Who через [h], не через [w].'),
        ex('Three birds turn left.', 'Три птицы поворачивают налево.', 'Three глухое th. Bird и turn — один и тот же [ɜː].'),
      ],
    },
    {
      type: 'mistakes',
      items: [
        mis('Chair как «хаир».', 'Chair [tʃeə]: ch — это «ч».', 'Так же cheese, child, cheap.'),
        mis('Book как «буук».', 'Book [bʊk]: перед k oo короткое.', 'Food долгое, book короткое.'),
        mis('Phone как «пхонэ».', 'Phone [fəʊn]: ph — это «ф».', 'Так же photo, elephant.'),
      ],
    },
    ]),
  lesson('A1', unit, 'a1-stress', 'Ударение', 'Куда падает голос в слове', [
    { type: 'lead', text: 'Неверное ударение ломает слово сильнее, чем один кривой звук. Computer с ударением как в русском «компьютер» часто не узнают.' },
    { type: 'schemes', items: ['ˈ стоит перед ударным слогом', 'короткое существительное чаще ˈна первом', 'перед -tion ударный слог'] },
    { type: 'text', text: 'Русское ударение на похожее слово не переносят. Смотри знак в словаре. У коротких глаголов ударение чаще на втором слоге: beˈgin.' },
    {
      type: 'examples',
      items: [
        ex('A ˈtable and a ˈwindow.', 'Стол и окно.', 'Оба существительных с ударением в начале.'),
        ex('Beˈgin the lesson.', 'Начни урок.', 'Учитель. У глагола ударный второй слог.'),
        ex('A ˈrecord. Reˈcord it.', 'Запись. Запиши это.', 'Одно написание. Первое — предмет, второе — действие.'),
        ex('The ˈstation is open.', 'Станция открыта.', 'Ударение перед -tion.'),
        ex('Inforˈmation, please.', 'Информацию, пожалуйста.', 'Стойка в аэропорту. Ударный слог перед -tion.'),
        ex('My comˈputer is slow.', 'Мой компьютер тормозит.', 'Ударный второй слог, не последний.'),
      ],
    },
    {
      type: 'mistakes',
      items: [
        mis('ComPUTer как «компьютер».', 'Comˈputer: ударный второй слог.', 'Знак ˈ перед pu.'),
        mis('Record всегда одинаково.', 'ˈRecord — запись. Reˈcord — записывать.', 'Та же пара: ˈpresent подарок, preˈsent вручать.'),
      ],
    },
    ]),
  lesson('A1', unit, 'a1-intonation', 'Интонация', 'Утверждение, вопрос, восклицание', [
    { type: 'lead', text: 'По мелодии конца фразы слышно, ты сообщаешь или спрашиваешь. Ровный вопрос «да/нет» звучит как приказ.' },
    { type: 'schemes', items: ['сообщение → вниз', 'yes/no → вверх', 'what / where / who → вниз'] },
    {
      type: 'table',
      head: ['Фраза', 'Голос в конце', 'Пример'],
      rows: [
        ['Утверждение', 'вниз', 'The shop is open.'],
        ['Вопрос да/нет', 'вверх', 'Is it far?'],
        ['Вопрос с what, where, who…', 'вниз', 'Where is the station?'],
        ['Восклицание', 'вниз', 'What a lovely day!'],
        ['Список', 'вверх, последний вниз', 'Apples, bread and milk.'],
      ],
    },
    {
      type: 'examples',
      items: [
        ex('The café is on the left.', 'Кафе слева.', 'Ты объясняешь дорогу. Голос вниз.'),
        ex('Is it far?', 'Далеко?', 'Ждёшь yes или no. Голос вверх.'),
        ex('Where is the station?', 'Где станция?', 'В вопросе есть where. Голос вниз.'),
        ex('No, it isn’t.', 'Нет.', 'Это уже ответ. Голос вниз.'),
        ex('What a cold day!', 'Ну и холод!', 'Восклицание тоже вниз.'),
        ex('Tea, coffee or water?', 'Чай, кофе или вода?', 'В кафе. Незакрытые пункты вверх, последний вниз.'),
      ],
    },
    {
      type: 'mistakes',
      items: [
        mis('Is it far? ровным или падающим тоном.', 'Yes/no-вопрос идёт вверх.', 'Падающий тон звучит как требование.'),
        mis('Where is it? с сильным подъёмом, как да/нет.', 'Вопрос с where идёт вниз.', 'Подъём здесь звучит неуверенно и странно.'),
      ],
    },
    ]),
  lesson('A1', unit, 'a1-silent-letters', 'Немые буквы', 'Буква написана, звука нет', [
    { type: 'lead', text: 'Если читать каждую букву, know станет «кноу», а write — «врайт». Тебя поймут с трудом, хотя слово знакомое.' },
    { type: 'schemes', items: ['kn- в начале: k молчит', 'wr- в начале: w молчит', '-mb в конце: b молчит', 'немая e открывает слог'] },
    {
      type: 'table',
      head: ['Где молчит', 'Как читать', 'Слова'],
      rows: [
        ['kn в начале', 'k не слышно', 'know, knee, knife'],
        ['wr в начале', 'w не слышно', 'write, wrong, wrist'],
        ['mb в конце', 'b не слышно', 'thumb, lamb, climb'],
        ['gh после гласной', 'часто молчит', 'night, light, right'],
        ['h в начале', 'иногда молчит', 'hour, honest'],
        ['e в конце', 'молчит и открывает слог', 'name, like, home'],
      ],
    },
    { type: 'text', text: 'В listen молчит t: [ˈlɪsn]. В often t можно и услышать, и не услышать — оба варианта живые.' },
    {
      type: 'examples',
      items: [
        ex('I know his name.', 'Я знаю его имя.', 'Know без k, name без конечной e.'),
        ex('Write it, please.', 'Напиши, пожалуйста.', 'На уроке. Write без w.'),
        ex('The knife is here.', 'Нож здесь.', 'На кухне. Knife без k.'),
        ex('My thumb hurts.', 'Большой палец болит.', 'У врача. Thumb без b.'),
        ex('It is night.', 'Сейчас ночь.', 'Night без gh.'),
        ex('Wait an hour.', 'Подожди час.', 'Hour без h, поэтому an, не a.'),
      ],
    },
    {
      type: 'mistakes',
      items: [
        mis('Know как «кноу».', 'Know [nəʊ]. K перед n молчит.', 'Та же семья: knee, knife, knock.'),
        mis('Write как «врайт».', 'Write [raɪt]. W перед r молчит.', 'Wrong, wrist, wrap тоже с r.'),
        mis('Name с конечным «э».', 'Name [neɪm]. E молчит.', 'Она открывает слог, но сама не звучит.'),
      ],
    },
    ]),
]

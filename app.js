const express = require('express');
const path = require('path');
const hbs = require('hbs')
require('dotenv').config();

// const session = require('express-session');
// const FileStore = require('session-file-store')(session);

// const indexRouter = require('./src/routes/indexRouter')

const app = express();
const PORT = process.env.PORT || 3005;



// const sessionConfig = {
//   store: new FileStore(), // хранилище сессий
//   key: 'smth', // ключ куки
//   secret: 'gchjtghjkl;bjkll', // шифрование id сессии
//   resave: false, // пересохранение сессии (когда что-то поменяли - false)
//   saveUninitialized: false, // сохраняем пустую сессию (чтоб посмотреть)
//   httpOnly: true, // нельзя изменить куки с фронта
//   cookie: { expires: 24 * 60 * 60e3 },
// }

// app.use(session(sessionConfig));

app.use(express.static(path.join(process.env.PWD, 'public')));

app.set('view engine', 'hbs');
app.set('views', path.join(process.env.PWD, 'src', 'views'));
hbs.registerPartials(path.join(process.env.PWD, 'src', 'views', 'partials'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('main')
})

app.get('/register', (req, res) => {
  res.render('register')
})


app.listen(PORT, () => {
  console.log(`started at port ${PORT}`);
})

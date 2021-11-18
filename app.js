const express = require('express');
const path = require('path');
const hbs = require('hbs')
require('dotenv').config();


const indexRouter = require('./src/routes/index.router');
const loginRouter = require('./src/routes/login.router')
// const session = require('express-session');
// const FileStore = require('session-file-store')(session);

const app = express();
const PORT = process.env.PORT || 3000;


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


app.set('view engine', 'hbs');
app.set('views', path.join(process.env.PWD, 'src', 'views'));
hbs.registerPartials(path.join(process.env.PWD, 'src', 'views', 'partials'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello')
})

app.use('/', indexRouter);
app.use('/login', loginRouter);



app.listen(PORT, () => {
  console.log(`started at port ${PORT}`);
})

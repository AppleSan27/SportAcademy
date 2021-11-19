const router = require('express').Router();
const bcrypt = require('bcrypt');
const saltRounds = 10; 
const { User } = require('../db/models');
const { validatePhone, validateName, validateSurname } = require('../help-funсtion/helpers');

router
  .route('/')

  .get((req, res) => {
    res.render('register')
  })

  .post(async (req, res) => {
    const {email, password, phone, first_name, last_name, role} = req.body;
console.log(req.body);
    try {
      const user = await User.findOne({
        where: {
          email: email,
        }
      })
      if (user) {
        res.render('error', {
          message: `Пользователь email: ${email} уже существует`,
          error: {}
        })
      }
      
      if(!validatePhone(phone)) {
        res.render('error', {
          message: `Проверьте правильность ввода номера телефона. Введите номер в формате: 89991112233, +79991112233 `
        })
      }

      if(!validateName(first_name)) {
        res.render('error', {
          message: `Имя пользователя может содержать только буквы латиницы/кириллицы `,
          error: {}
        })
      }

      if(!validateSurname(last_name)) {
        res.render('error', {
          message: `Фамилия пользователя может содержать только буквы латиницы/кириллицы и пробелы`,
          error: {}
        })
      }

      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = await User.create({first_name, last_name, email, password: hashedPassword, phone, role });
   
      req.session.userName = newUser.first_name;
      req.session.userEmail = newUser.email;
      req.session.userId = newUser.id;
      req.session.userStatus = newUser.status;
      req.session.userRole = newUser.role;

      res.redirect('/')
    }
    catch (err) {
      res.render('error', {
        message: `Ошибка записи в базу данных`,
        error: err
      })
    }
    
  })

  module.exports = router;

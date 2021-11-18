const router = require('express').Router();
const bcrypt = require('bcrypt');
const saltRounds = 10; 
const { User } = require('../db/models');
const { validatePhone, validateName, validateSurname } = require('../help-functions/helpers');


router
  .route('/')

  .get((req, res) => {
    res.render('register')
  })

  .post(async (req, res) => {
    const {email, password, phone, first_name, last_name} = req.body;
    try {
      const users = await User.findAll({
        where: {
          email: email,
        }
      })
      if (users) {
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

      const hashedPassword = bcrypt.hash(password, saltRounds);
      const newUser = await User.create({email, password: hashedPassword, phone, first_name, last_name });

      req.session.userName = newUser.first_name;
      req.session.userEmail = newUser.email;
      req.session.userId = newUser.id;

      res.redirect('/')
    }
    catch (err) {
      res.render('error', {
        message: `Ошибка записи в базу данных`,
        error: {}
      })
    }
    
  })

  module.exports = router;

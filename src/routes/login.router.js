const router = require('express').Router();
const { User } = require('../db/models');
const bcrypt = require('bcrypt');
const saltRounds = 10; 



router
    .route('/')
    .get(( req, res) => {
      res.render('login')
    })
    .post( async (req, res) => {
      const { email, password } = req.body;
      try {
        const currentUser = await User.findOne({
          where: {
            email: email,
          }
        })
        if(currentUser && (await bcrypt.compare(password, currentUser.password))) {
          req.session.userEmail = currentUser.email;
          req.session.userName = currentUser.name;
          req.session.userRole = currentUser.role;
          res.redirect('/');
        }
        res.render('error', {
        message: `Пожалуйста, проверьте правильность введенных данных или зарегистрируйтесь`,
        error: {}
        });
      } 
      catch (err) {
        res.render('error', {
          message: `Ошибка чтения базы данных`,
          error: {}
        })
      } 
    })

module.exports = router;


const router = require('express').Router();
const { Post } = require('../db/models');

router
  .route('/') 
  .get((req, res) => {
    res.render('addpost')
  })
  .post(async (req, res) => {
    const { title, body, img } = req.body;
    try {
      const newPost = await Post.create({ title, body, img });
      res.render('/')
 }
    catch (err) {
      res.render('error', {
        message: `Ошибка записи в базу данных`,
        error: {}
    })
   }
  })

  module.exports = router;

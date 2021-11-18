const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('policy')
})

module.exports = router;


const router = require('express').Router();
// const  { freeTreiner }  = require('../help-funсtion/listForClient')

router.get('/', async (req, res) => {
  // const scheduleClient = await freeTreiner;
  // console.log(scheduleClient);
  res.render('cabinet')
})


module.exports = router;

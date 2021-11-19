const router = require('express').Router();
const  freeTreiner  = require('../help-funсtion/listForClient')


router.get('/', async (req, res) => {
  console.log(req.session);
  
  const freescheduleClient = await freeTreiner(null);
  console.log(freescheduleClient);
  const scheduleClient = await freeTreiner(req.session.userId);

  res.render('cabinet', { freescheduleClient, scheduleClient })
})


module.exports = router;

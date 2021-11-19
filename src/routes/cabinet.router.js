let express = require('express');
let router = express.Router();
const {User, Sport, Pair} = require('../db/models')

router
.route('/')
.get( async(req, res) => {
  let list = await User.findAll({where:{status: "false"}})
  res.render('cabinet',{list});
})
.post(async (req, res) =>{
  const user = await User.findOne({where:{id:req.body.id}})
let statusUser =  await User.update({status:!user.status }, {where:{id:req.body.id}})

  console.log(user.status);
  res.json({statusUser :user.status})
})
router
.route('/update')
.post(async(req,res)=>{
  const user = await User.findOne({where:{first_name: req.body.first_name}},{where:{last_name: req.body.last_name}})
  const sport = await Sport.findOne({where:{name:req.body.name}})
  let user_id = user.id
  let sport_id = sport.id
  await Pair.create({user_id, sport_id})
  res.sendStatus(200)
})
module.exports = router;



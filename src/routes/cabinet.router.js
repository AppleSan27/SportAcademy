
let express = require('express');
let router = express.Router();
const {User, Sport, Pair, Schedule} = require('../db/models')
const  freeTreiner  = require('../help-funсtion/listForClient')

router
.route('/')
.get( async(req, res) => {
//Client

  const freescheduleClient = await freeTreiner(null);
  const scheduleClient = await freeTreiner(req.session.userId);

//Admin
  let listAdmin = await User.findAll({where:{status: "false"}})

  res.render('cabinet',{listAdmin,freescheduleClient, scheduleClient});

})
.post(async (req, res) =>{
  //Admin
  if (req.body.isClient){
    const list = await Schedule.findOne({where:{id:req.body.id}})
    const newList = await Schedule.update({user_id: req.session.userId})
    console.log(req.body.id);
     }else{
  const user = await User.findOne({where:{id:req.body.id}})
  let statusUser =  await User.update({status:!user.status }, {where:{id:req.body.id}})}
  //Client

  console.log(user.status);

  res.json({statusUser :user.status})
})
router
.route('/update')
.post(async(req,res)=>{//Client 
  
  //Admin
  const user = await User.findOne({where:{first_name: req.body.first_name}},{where:{last_name: req.body.last_name}})
  const sport = await Sport.findOne({where:{name:req.body.name}})
  let user_id = user.id
  let sport_id = sport.id
  await Pair.create({user_id, sport_id})
  
 

  res.sendStatus(200)
})

module.exports = router;



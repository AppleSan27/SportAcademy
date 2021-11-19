const { sequelize, User, Sport, Pair, Schedule } = require('../db/models');
const { Op } = require("sequelize");

async function TrainerList(id){
let n = await Pair.findAll({
    raw: true, where:
       { user_id: id},
          include: [{ model:Sport, as: "onePair"},
                  { model:Schedule, as: "treiner", 
                      where:{user_id: {[Op.ne]: null}}, 
                      include:{model:User}
                  },
               
            ]
    }
)

const data = n.map((el, i)=>{
  
  return {
      id:el.id,
      data: el.date,
      client: el['treiner.User.first_name']+' '+el['treiner.User.last_name'],
      sport: el['onePair.name'],
      phone: el['treiner.User.phone'],
      email: el['treiner.User.email']
  }
  
})
return data
}

module.exports = TrainerList;

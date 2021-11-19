const { sequelize, User, Sport, Pair, Schedule } = require('../db/models');

async function freeTreiner(users){
let n = await Schedule.findAll({
    raw: true, where:
       { user_id: users},
          include: {
             model:Pair, 
               include:[
               { model:User, as: "oneUser"},
               { model:Sport, as: "onePair"}
            ]}
            
    }
)

const data = n.map((el, i)=>{
  
  return {
      id:el.id,
      data: el.date,
      treiner: el['Pair.oneUser.first_name']+' '+el['Pair.oneUser.last_name'],
      sport: el['Pair.onePair.name'],
      phone: el['Pair.oneUser.phone'],
      email: el['Pair.oneUser.email']
  }
  
})
return data
}


module.exports = freeTreiner;

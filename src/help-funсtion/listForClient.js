const { sequelize, User, Sport, Pair, Schedule } = require('../db/models');

async function freeTreiner() {
  let n = Schedule.findAll({
    raw: true, where:
      { user_id: null },
    include: {
      model: Pair,
      include: [
        { model: User, as: "oneUser" },
        { model: Sport, as: "onePair" }
      ]
    }

  }
  )
    .then(data => data.map((el, i) => {

      el = {
        data: el.date,
        treiner: el['Pair.oneUser.first_name'] + ' ' + el['Pair.oneUser.last_name'],
        sport: el['Pair.onePair.name'],
        phone: el['Pair.oneUser.phone'],
        email: el['Pair.oneUser.email']
      }
      return el
    }))
    .then(data => console.log(data))
    .then(data => { return data })
}

module.exports = freeTreiner;

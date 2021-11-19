
function validatePhone(phone){
  let reg = /(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,11}(\s*)?/g
  return reg.test(phone);
}

function validateName(name){
  let reg = /^[a-zA-Z]{0,}|^[а-яА-Я]{0,}/g
  return reg.test(name);
}

function validateSurname(surname){
  let reg = /^[a-zA-Z ]{0,}|^[а-яА-Я ]{0,}/g
  return reg.test(surname);
}

module.exports = {
  validatePhone,
  validateName,
  validateSurname
}

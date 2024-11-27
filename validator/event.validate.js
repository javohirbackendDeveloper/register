


const joi = require("joi");

module.exports.elonValidate = function (data) {
  const schema = joi.object({
    text: joi.string().min(5).max(1000).required(),
    date: joi.string().required(),
    place: joi.string().required(),
    typeOfElon: joi.string().valid("work", "study", "business").required(),
    author: joi.string().required(),
  });

  return schema.validate(data);
};

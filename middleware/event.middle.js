const { elonValidate } = require("../validator/event.validate");

module.exports.elonValidator= (req, res, next) => {
  try {
    const { error } = elonValidate(req.body); 

    if (error) {
      return res.status(400).json({
        message: error.details[0].message, 
      });
    }
    next(); 
  } catch (error) {
    next(error); 
  }
};

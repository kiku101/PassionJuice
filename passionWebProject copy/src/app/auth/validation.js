const Joi = require('@hapi/joi');

// Register Validate

// Login Validate
const loginValidation = function(data){
    const schema = Joi.object ({
        username: Joi.string()
                   .min(4)
                   .required(),
        password: Joi.string()
                   .min(6)
                   .required(),   
    })
   return  schema.validate(data)
}
module.exports.loginValidation = loginValidation
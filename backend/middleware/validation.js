const {body,validationResult} = require("express-validator")

exports.registerValidation = [

body("name").notEmpty(),
body("email").isEmail(),
body("password").isLength({min:6})

]

exports.validate = (req,res,next)=>{

const errors = validationResult(req)

if(!errors.isEmpty()){
return res.status(400).json({errors:errors.array()})
}

next()

}
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.register = async (req,res)=>{

const {name,email,password} = req.body;

const existingUser = await User.findOne({email});

if(existingUser){
return res.status(400).json({message:"User exists"})
}

const hashed = await bcrypt.hash(password,10)

const user = await User.create({
name,
email,
password:hashed
})

res.status(201).json(user)

}

exports.login = async (req,res)=>{

const {email,password} = req.body

const user = await User.findOne({email})

if(!user){
return res.status(400).json({message:"Invalid credentials"})
}

const match = await bcrypt.compare(password,user.password)

if(!match){
return res.status(400).json({message:"Invalid credentials"})
}

const token = generateToken(user)

res.json({token})

}
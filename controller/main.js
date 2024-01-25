const jwt = require("jsonwebtoken")
const User = require("../model/user")
const register = async (req, res) => {
  const user = await User.create({...req.body})
  const token = user.createJWT()
  res.status(200).json({user:{name:user.name},token})
};
const login = async(req,res)=>{
  const {email,password} = req.body

  if(!email || !password){
    return res.status(400).json({msg:"Please Provide Correct Email Or Password"})
  }
  const user = await User.findOne({email})

  if(!user){
    return res.status(401).json({msg:"Invalid Credentials"})
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if(!isPasswordCorrect){
    return res.status(401).json({msg:"Invalid Credentials"})
  }
  const token = user.createJWT()
  res.status(200).json({user:{name:user.name},token})
}

module.exports = {register,login}
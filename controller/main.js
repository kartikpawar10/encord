const jwt = require("jsonwebtoken")
const UserSchema = require("../model/user")
const createJWT = (user,name,email)=>{
   return jwt.sign({userId:user._id,name:name,email:email},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME,})
}
const register = async (req, res) => {
  const {name,email,password} = req.body
  const user = await UserSchema.create({...req.body})
  const token = createJWT(user,name,email)
  user.token = token;
  user.save()
  res.status(200).json({user:{name:user.name},token})
};
const login = async(req,res)=>{
  const {email,password} = req.body

  if(!email || !password){
    return res.status(400).json({msg:"Please Provide Correct Email Or Password"})
  }
  const user = await UserSchema.findOne({email})

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
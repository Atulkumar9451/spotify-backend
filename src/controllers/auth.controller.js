//sare api jo routes folder ke andar create hui hain unke logic isi file me ayenge 


const userModel = require('../models/user.model.js')




const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');


async function registerUser(req, res) {
  const { username, email, password, role = 'user' } = req.body

  const isUserAlreadyExists = await userModel.findOne({
    $or: [
      { username },
      { email }
    ]
  })

  if (isUserAlreadyExists) {
    return res.status(409).json({
      message: "User already exists"
    })
  }

  const hash = await bcrypt.hash(password, 10)//password variable jo upar hai aur 10 kya hai salt ye delay time hota hai koi bhi security 100% safe nhi kar sakta hai but ek attecker ko attack karne ke liye delay kara sakte hai hajaro sal tak to ye ek tarah se thik hi hai

  const user = await userModel.create({
    username,
    email,
    password: hash,
    role
  })




  const token = jwt.sign({
    id: user._id,
    role: user.role
  }, process.env.JWT_SECRET)


  res.cookie('token', token)
  res.status(201).json({
    message: "User register Successfully",
    user: {
      id: user._id,
      userename: user.username,
      email: user.email,
      role: user.role
    }
  })
}

async function loginUser(req, res) {
  const { identifier, password } = req.body

  const user = await userModel.findOne({
    $or: [
      { username: identifier },
      { email: identifier }
    ]
  })

  if (!user) {
    return res.status(401).json({ message: "invalid credential" })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "invalid credential"
    })
  }

  const token = jwt.sign({
    id: user._id,
    role: user.role
  }, process.env.JWT_SECRET)

  res.cookie('token', token)

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    }
  })

}

async function logoutUser(req, res) {
  res.clearCookie("token")
  res.status(200).json({
    message: "User logged out successfully"
  })
}


module.exports = { registerUser, loginUser, logoutUser };

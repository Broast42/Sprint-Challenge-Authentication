const router = require('express').Router()
const bc = require('bcryptjs')
const db = require("./auth-model")
const jwt = require("jsonwebtoken")

router.post('/register', async (req, res, next) => {
  try{
    const { username } = req.body
    const user = await db.findBy({username}).first()

    if(user){
      return res.status(409).json({message: "Username is already taken"})
    }

    const newUser = await db.add(req.body)

    res.status(201).json(newUser)

  }catch(err){
    next(err)
  }

})

router.post('/login', async (req, res, next) => {
  const authError = {
    message: "You shall noy pass."
  }

  try {
    const { username, password } = req.body
    const user = await db.findBy({ username }).first()


    if(!user){
      return res.status(401).json(authError)
    }

    const validPass = await bc.compareSync(password, user.password)

    if(!validPass){
      return res.status(401).json(authError)
    }

    const token = {
      userId: user.id,
      username: user.department
    }

    res.cookie("token", jwt.sign(token, process.env.JWT_SECRET))
    res.json({message: `Welcome ${user.username}`})
      
  }catch(err){
    next(err)
  }
})

module.exports = router;

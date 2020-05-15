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
  // implement login
})

module.exports = router;

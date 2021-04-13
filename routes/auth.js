const router = require('express').Router();
const User = require('../models/userSchema')
const { registerValidation, loginValidation } = require('../util/validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//regiester new ueser
router.post('/register', async(req, res) => {

    //data validation
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)


    //chek if user exsist
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).send('Email alredy exist')

    const usernameExist = await User.findOne({ username: req.body.username })
    if (usernameExist) return res.status(400).send('username alredy exist')

    //has password
    const salt = await bcrypt.genSalt(10);
    const hasPassword = await bcrypt.hash(req.body.password, salt)

    //add new user
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hasPassword,
    })

    //try to add user to db
    try {
        const savedUser = await user.save();
        res.send({ user: user._id });
    } catch (err) {
        res.status(400).send(err);
    }
})


//login
router.post('/login', async(req, res) => {
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)
        //chek if user exsist
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Email or Password is wrong')

    //check password
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).send('Email or Password is wrong')

    //create token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)

    const data = {token:token, profile:user}
    res.header('auth-token', token).send(data);


})

module.exports = router;
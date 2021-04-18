const router = require("express").Router();
const verify = require("../verifyToken");
const User = require("../../models/userSchema");
const bcrypt = require('bcryptjs')
const ObjectId = require("mongoose").Types.ObjectId;

router.post('/update/bio', verify,async (req, res)=>{
    const bio = req.body.bio;
    const userId = req.body.userId;
    const user = await User.findOne({ _id: new ObjectId(userId) });
    user.bio = bio;
    try{
        user.save();
        res.send("user updated")
    }catch(err){
        res.status(400).send(err)
    }

})

router.post('/update/loveTag', verify,async (req, res)=>{
    const loveTag = req.body.loveTag;
    const userId = req.body.userId;
    const user = await User.findOne({ _id: new ObjectId(userId) });
    user.loveTag = loveTag;
    try{
        user.save();
        res.send("user updated")
    }catch(err){
        res.status(400).send(err)
    }
})

router.post('/update/email', verify,async (req, res)=>{
    const email = req.body.email;
    const userId = req.body.userId;
    const user = await User.findOne({ _id: new ObjectId(userId) });
    user.email = email;
    try{
        user.save();
        res.send("user updated")
    }catch(err){
        res.status(400).send(err)
    }
})
router.post('/update/profileImage', verify,async (req, res)=>{
    const profileImage = req.body.profileImage;
    const userId = req.body.userId;
    const user = await User.findOne({ _id: new ObjectId(userId) });
    user.profileImage = profileImage;
    try{
        user.save();
        res.send("user updated")
    }catch(err){
        res.status(400).send(err)
    }
})

router.post('/update/password', verify,async (req, res)=>{
   
    const userId = req.body.userId;
    const user = await User.findOne({ _id: new ObjectId(userId) });
    //has password
    const salt = await bcrypt.genSalt(10);
    const hasPassword = await bcrypt.hash(req.body.password, salt)

    user.password = hasPassword;
    try{
        user.save();
        res.send("user updated")
    }catch(err){
        res.status(400).send(err)
    }
})

router.post('/update/all', verify,async (req, res)=>{
   const name= req.body.name;
   const loveTag = req.body.loveTag;
   const password = req.body.password;
   const bornDate = req.body.birth;
   const bio = req.body.bio;
   const profileImage = req.body.profileImage;

    const userId = req.body.userId;
    const user = await User.findOne({ _id: new ObjectId(userId) });
    //has password
    const salt = await bcrypt.genSalt(10);
    const hasPassword = await bcrypt.hash(password, salt)

    user.name =name;
    user.loveTag = loveTag;
    user.password = hasPassword;
    user.bornDate = bornDate;
    user.bio = bio;
    user.profileImage = profileImage;
    try{
        user.save();
        res.send("user updated")
    }catch(err){
        res.status(400).send(err)
    }
})




module.exports = router;
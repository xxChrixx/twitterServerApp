const router = require("express").Router();
const verify = require("../verifyToken");
const User = require("../../models/userSchema");



router.post('/update', verify,async (req, res)=>{
    const bio = req.body.bio;
    const user = await User.findOne({ _id: new ObjectId(userId) });

})
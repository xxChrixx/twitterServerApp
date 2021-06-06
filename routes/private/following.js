const router = require("express").Router();
const verify = require("../verifyToken");
const User = require("../../models/userSchema");
const ObjectId = require("mongoose").Types.ObjectId;

router.post("/follow", verify,async (req, res) => {

  const userId = req.body.userId;
  const followId = req.body.followId;
  
 //if (userId === followId) return res.status(400).send('non puoi seguire te stesso')
  const user = await User.findOne({ _id: new ObjectId(userId) });
  //da controllare se è gia presente
  if (!user.following.includes(followId)) {
    user.following.push(followId);
  }
  try {
    user.save();
  } catch (err) {
    res.status(400).send(err);
  }
  const followUser = await User.findOne({ _id: new ObjectId(followId) });
  //da controllare se è gia presente
 
  if (!followUser.following.includes(userId)) {
    followUser.followers.push(userId);
  }

  try {
   
    followUser.save();
    res.send("follow");
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/unfollow", verify, async (req, res) => {
  const userId = req.body.userId;
  const followId = req.body.followId;

  const user = await User.findOne({ _id: new ObjectId(userId) });
  const followUser = await User.findOne({ _id: new ObjectId(followId) });

  user.following.remove(followId);
  followUser.followers.remove(userId);

  try {
    user.save();
    followUser.save();
    res.send("unfollow");
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;

const router = require("express").Router();
const verify = require("../verifyToken");
const User = require("../../models/userSchema");
const ObjectId = require("mongoose").Types.ObjectId;

router.get("/all/:id", async (req, res) => {
  // processo totalmente lento ma sono pigro e funziona quindi... :)  //


  try {
    const userId = req.params.id;
    const user = await User.findOne({ _id: new ObjectId(userId) });
    let homeTweets = [];
    const followingList = user.following;
  
    const users = await User.find({ _id: { $in: followingList } });
   // users.push(user);
  
    users.forEach((following) => {
      const tweetList = following.tweets.map((tweet) => {
        const copyTweet = tweet;
        profile = {
          _id: following._id,
          username: following.username,
          loveTag: following.loveTag,
          profileImage: following.profileImage,
          bornDate: following.bornDate,
          name: following.name,
        };
        profile.tweet = tweet;
  
        return profile;
      });
  
      homeTweets = [...homeTweets, ...tweetList];
    });
  

    
    const sortedTweet = homeTweets.sort((a,b) =>new Date( b.tweet.date) - new Date(a.tweet.date))
    
  
    res.send(sortedTweet);
  } catch (error) {
      res.status(400).send(error)
  }
});

module.exports = router;

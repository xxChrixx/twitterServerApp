const router = require('express').Router();
const verify = require('../verifyToken')
const User = require('../../models/userSchema')
const ObjectId = require('mongoose').Types.ObjectId; 

router.get('/all/:id', verify, async (req, res) => {

    // processo totalmente lento ma sono pigro e funziona quindi... :)  //

    const userId = req.params.id
    const user = await User.findOne({ _id: new ObjectId(userId) })
    let homeTweets = []
    const followingList = user.following;

   

    const users = await User.find({_id: {$in: followingList}})
   

    users.forEach(following => {
        homeTweets.push(following.tweets)
    });

    const tweets = homeTweets[0]

    tweets.sort((a,b)=>{
        return new Date(b.date) - new Date(a.date);
      });

    try {
     
        res.send(tweets);
    } catch (err) {
        res.status(400).send(err);
    }

})

module.exports = router
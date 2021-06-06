const router = require('express').Router();
const verify = require('../verifyToken')
const User = require('../../models/userSchema')
const ObjectId = require('mongoose').Types.ObjectId; 
//multer for images
const multer = require("multer");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      cb(new Error("Please upload an image."));
    }
    cb(undefined, true);
  },
});




router.post('/add',upload.single("tweetImage"), async (req, res) => {
    
    const userId = req.body.userId;
    const tweet =  JSON.parse(req.body.tweet);
  
     if(req.file){
       tweet.image = req.file.path;
   }
   

   const user = await User.findOne({ _id: new ObjectId(userId) })
   if(!user) return res.status(400).send(user);
   user.tweets.push(tweet) 

    try {
        const savedUser = await user.save();
        res.send({ user: user._id });
    } catch (err) {
        res.status(400).send(err);
    }

})

router.post('/like',verify, async (req, res)=>{

const userId = req.body.userId;
const tweetId = req.body.tweetId;
const userTweetId = req.body.userTweetId;

const user = await User.findOne({ _id: new ObjectId(userId) })


const userTweet = await User.findOne({_id: new ObjectId(userTweetId)})


//check if there is a same like user

const findInLikeList = user.tweetsLikes.find(tweetid => tweetId === tweetid )


const match = element => element._id == tweetId;

const index = userTweet.tweets.findIndex(match)

if(!findInLikeList){

    //increment like in the tweet
    if (index === undefined) {
   
      return  res.status(400).send('tweet not found')
    } else{
      
        userTweet.tweets[index].like += 1;

    }
  
}else{
    //remove like in tweet
    console.log('remove like');
   if (index === undefined) {
    
    return  res.status(400).send('tweet not found')
   } else{

       userTweet.tweets[index].like -= 1;
   }
}
console.log('save all');
try{
    await userTweet.save();

    //update list 
    const userList = await User.findOne({ _id: new ObjectId(userId) })

    let msg = "like added"
    if(findInLikeList)
    {
        userList.tweetsLikes.remove(tweetId);
        msg = "Like removed"
    }else{
        userList.tweetsLikes.push(tweetId);
    }

    await userList.save();
    

    res.send(msg)
}catch(err){
    console.log(err);
    res.status(400).send(err)
}

})


router.get("/all", verify,async (req, res) => {
  


  try {
    
  
    let homeTweets = [];
   
  
    const users = await User.find();
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
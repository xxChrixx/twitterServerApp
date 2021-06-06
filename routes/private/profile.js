const router = require("express").Router();
const verify = require("../verifyToken");
const User = require("../../models/userSchema");
const bcrypt = require('bcryptjs')
const ObjectId = require("mongoose").Types.ObjectId;

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


  
router.post('/update/banner',verify,upload.single("bannerImage"),async (req, res) => {
    
    const userId = req.body.userId;
    const user = await User.findOne({ _id: new ObjectId(userId) })
   if(!user) return res.status(400).send(user);
 
     if(req.file){
        user.banner = req.file.path;
     }
   

    try {
        const savedUser = await user.save();
        res.send({ user: user._id });
    } catch (err) {
        res.status(400).send(err);
    }

})
  
router.post('/update/avatar',verify,upload.single("avatarImage"), async (req, res) => {
    
    const userId = req.body.userId;
    const user = await User.findOne({ _id: new ObjectId(userId) })
   if(!user) return res.status(400).send(user);
    
     if(req.file){
        user.profileImage = req.file.path;
     }
   

    try {
        const savedUser = await user.save();
        res.send({ user: user._id });
    } catch (err) {
        res.status(400).send(err);
    }

})
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

router.get('/allInfo/:id', verify,async(req,res) =>{
    const userId = req.params.id;
    try{
        const user = await User.findOne({ _id: new ObjectId(userId) });
     
        const tweetList = user.tweets.map((tweet) => {
           
            profile = {
                _id: user._id,
              username: user.username,
              loveTag: user.loveTag,
              profileImage: user.profileImage,
              bornDate: user.bornDate,
              name: user.name,
            };
            profile.tweet = tweet;
      
            return profile;
          });

          const sortedTweet = tweetList.sort((a,b) =>new Date( b.tweet.date) - new Date(a.tweet.date))
      
        const info = {
            _id: user._id,
            username: user.username,
            name: user.name,
            followerNumber: user.followers.length,
            followingNumber: user.following.length,
            bio: user.bio,
            tweets: sortedTweet,
            profileImage: user.profileImage,
            banner: user.banner,
        }
        res.send(info)
    }catch (err){
        res.status(400).send(err)
    }
   
})

router.post('/login', verify,async(req, res) => {
   
    const user = await User.findOne({ _id: new ObjectId(req.body.id )})
    //create token
  
    res.send(user);


})





module.exports = router;
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tweetSchema = new Schema({

    body: { type: String, required: true },
    like: { type: Number, default: 0 },
    retweet: { type: Number, default: 0 },
    share: { type: Number, default: 0 },
    tags: { type: Array, default: [] },
    replayId: { type: String, default: "" },
    image: { type: String, default: "" },
    date: { type: Date, default: Date.now() },

});

const UserSchema = new Schema({

    name: { type: String, requred: true },
    username: { type: String, requred: true },
    loveTag: { type: String, default: "" },
    email: { type: String, requred: true },
    password: { type: String, requred: true },
    bornDate: { type: Date, requred: false },
    bio: { type: String, default: "" },
    profileImage: { type: String, default: "" },
    following: { type: Array },
    followers: { type: Array },
    notifications: { type: Array },
    tweets: [tweetSchema],
    tweetsLikes: { type: Array }

})

module.exports = mongoose.model('User', UserSchema)
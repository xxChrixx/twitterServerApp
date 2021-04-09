const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const UserSchema = new Schema({

    name: { type: String, requred: true },
    username: { type: String, requred: true },
    loveTag: { type: String },
    email: { type: String, requred: true },
    password: { type: String, requred: true },
    bornDate: { type: Date, requred: false },
    bio: { type: String },
    profileImage: { type: String },
    following: { type: Array },
    followers: { type: Array },
    notifications: { type: Array },
    tweets: { type: Array }

})

module.exports = mongoose.model('User', UserSchema)
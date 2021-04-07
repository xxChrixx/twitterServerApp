const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    _id: ObjectId,
    Name: { type: String, requred: true },
    Username: { type: String, requred: true },
    LoveTag: { type: String, requred: false },
    Email: { type: String, requred: true },
    Password: { type: String, requred: true },
    BornDate: { type: Date, requred: true },
    Bio: { type: String, requred: false },
    ProfileImage: { type: String },
    Following: { type: Array },
    Followers: { type: Array },
    Notifications: { type: Array },
    Tweets: { type: Array }
})

module.exports = mongoose.model('User', UserSchema)
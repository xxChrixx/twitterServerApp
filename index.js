const express = require("express");
const app = express();
const port = 3001;

const mongoose = require("mongoose");
require('dotenv/config')

//routes
const postRoute = require('./routes/post');
const authRoute = require('./routes/auth');
const tweetRoute = require('./routes/private/tweet');
const usersRoute = require('./routes/private/following');
const profileRoute = require('./routes/private/profile');
const imageRoute = require('./routes/private/imagesRoute');

app.use(express.json());


//db connections
const uri = process.env.DB_CONNECTION;
mongoose.connect(uri, { useNewUrlParser: true }, () => console.log("connect to db"));

app.use('/posts', postRoute);
app.use('/api/user', authRoute);
app.use('/api/private/tweet', tweetRoute);
app.use('/api/private/user', usersRoute);
app.use('/api/private/profile', profileRoute);
app.use('/api/private/images', imageRoute);

app.get("/", (req, res) => {});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
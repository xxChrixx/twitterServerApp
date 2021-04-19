const express = require("express");
const app = express();
const port = 3001;
const cors = require('cors')

const mongoose = require("mongoose");
require('dotenv/config')

//routes
const postRoute = require('./routes/post');
const authRoute = require('./routes/auth');
const tweetRoute = require('./routes/private/tweet');
const usersRoute = require('./routes/private/following');
const profileRoute = require('./routes/private/profile');
const imageRoute = require('./routes/private/imagesRoute');
const homeRoute = require('./routes/private/homePage')

app.use(express.json());
app.use(cors())

//db connections
const uri = process.env.DB_CONNECTION;
mongoose.connect(uri, { useNewUrlParser: true }, () => console.log("connect to db"));

app.use("/uploads", express.static('uploads'))
app.use('/posts', postRoute);
app.use('/api/user', authRoute);
app.use('/api/private/tweet', tweetRoute);
app.use('/api/private/user', usersRoute);
app.use('/api/private/profile', profileRoute);
app.use('/api/private/images', imageRoute);
app.use('/api/private/home', homeRoute);

app.get("/", (req, res) => {});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
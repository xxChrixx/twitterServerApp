const express = require("express");
const app = express();
const port = 3001;

const mongoose = require("mongoose");
require('dotenv/config')

//routes
const postRoute = require('./routes/post');
const authRoute = require('./routes/auth');
const privateRoot = require('./routes/private/test');

app.use(express.json());


//db connections
const uri = process.env.DB_CONNECTION;
mongoose.connect(uri, { useNewUrlParser: true }, () => console.log("connect to db"));

app.use('/posts', postRoute);
app.use('/api/user', authRoute);
app.use('/api/private', privateRoot);

app.get("/", (req, res) => {});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
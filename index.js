const express = require("express");
const app = express();
const port = 3000;

const mongoose = require("mongoose");
require('dotenv/config')

//routes
const postRoute = require('./routes/post');

app.use('/posts', postRoute);


app.get("/", (req, res) => {});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});





//db connections
const uri = process.env.DB_CONNECTION;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("connect to db"));
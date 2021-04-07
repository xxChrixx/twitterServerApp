const mongoose = require('mongoose');

const uri = "mongodb+srv://MongoUser:6CfMvBwXYSB5kS3F@cluster0.cpjzf.mongodb.net/Twitter?retryWrites=true&w=majority";

await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});


export const instance = await MyModel.findOne({});
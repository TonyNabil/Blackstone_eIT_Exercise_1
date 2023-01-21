import mongoose from "mongoose"

mongoose.Promise = global.Promise;
mongoose.set("useNewUrlParser", true); // use the new MongoDB driver connection string parser
mongoose.set("useCreateIndex", true);  // use the MongoDB driver createIndex() function instead of ensureIndex()
mongoose.set("useUnifiedTopology", true); // use the new MongoDB topology engine
mongoose.set("useFindAndModify", false); // use the MongoDB driver findOneAndUpdate() instead of findAndModify()

let connectionUrl = process.env.MONGO_URL || "127.0.0.1:27017"

console.log(process.env.MONGO_URL)
if (process.env.NODE_ENV === "test") {
    mongoose.connect(`mongodb://${connectionUrl}/tasks-test`, { useNewUrlParser: true }, function (err) {
        if (err) return console.error(err);
        console.log('*****************');
        console.log('connection succeeded to mongoDB >>> tasks-test');
    });

} else {
    mongoose.connect(`mongodb://${connectionUrl}/tasks`, { useNewUrlParser: true }, function (err) {
        if (err) return console.error(err);
        console.log('*****************');
        console.log('connection succeeded to mongoDB >>> tasks');
    });

}

export default mongoose




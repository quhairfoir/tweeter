"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let db;

// mongo db requirements and connection
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, mongoInstance) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  function getTweets(callback) {
    return db.collection("tweets").find().toArray(callback);
   };

  db = mongoInstance;

});



let data = {tweets: getTweets((err, tweets) => {
  if(err) throw err;
  return tweets;
})};
// const db = require("./lib/in-memory-db");

// The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
// so it can define routes that use it to interact with the data layer.
const DataHelpers = require(data);

const tweetsRoutes = require("./routes/tweets")(DataHelpers);

// Mount the tweets routes at the "/tweets" path prefix:
app.use("/tweets", tweetsRoutes);

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

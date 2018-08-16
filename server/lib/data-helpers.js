"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to mongo's "tweets" collection
    saveTweet: function(newTweet, callback) {
      db.collection('tweets').insertOne(newTweet, (err, results) => {
        if (err) throw err;
        callback(null, true);
      });
    },

    // Get all tweets in mongo's "tweets" collection, sorted by newest first
    getTweets: function(callback) {
      db.collection('tweets').find().sort({ created_at: -1 }).toArray((err, tweets) => {
        if (err) {
          return callback(err)
        }
        callback(null, tweets);
      }
      )}
  }
}
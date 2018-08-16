"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection('tweets').insertOne(newTweet, (err, results) => {
        if (err) throw err;
        callback(null, true);
      });
    },

    // getTweets: function(callback) {
    //   db.collection('tweets').find().toArray((err, tweets) => {
    //     if (err) {
    //       return callback(err)
    //     }
    //     callback(null, tweets);
    //   });
    // }

    // Get all tweets in `db`, sorted by newest first
    // getTweets: function(callback) {
    //   simulateDelay(() => {
    //     const sortNewestFirst = (a, b) => a.created_at - b.created_at;
    //     callback(null, db.tweets.sort(sortNewestFirst));
    //   });
    // }

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
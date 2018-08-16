"use strict";

const Mongo = require("mongodb");
const MongoClient = Mongo.MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

let db;

function initDb () {
  MongoClient.connect(MONGODB_URI, (err, mongoInstance) => {
    if (err) {
      console.log(`Failed to connect to mongodb: ${MONGODB_URI}`);
      throw err;
    };
    console.log(`Connected to mongodb: ${MONGODB_URI}`);
    
    db = mongoInstance;
  });
}

function getDb () {
  return db;
}

module.exports = {
  getDb,
  initDb
}


/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  
  const createTweetElement = function (tweetObj) {
  let $tweet = $("<article>").addClass("tweet");
    $tweet.append("<header>");
    $("<header>").append("<h2>");
    $("<header>").append("<img>");
    $("<header>").append("<p>");
    $tweet.append("<p>");
    $tweet.append("<footer>");
  return $tweet;
  };

  console.log(createTweetElement());
});
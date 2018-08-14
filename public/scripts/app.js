/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  
  const createTweetElement = function (tweetObj) {
  let $tweet = $("<article>").addClass("tweet");
    $tweet.append("<header>");
  return $tweet;
  };
});
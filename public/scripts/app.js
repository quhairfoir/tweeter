/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);
  var interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
};


$(document).ready(function() {

  function renderTweets(tweets) {
    for (let tweet in tweets) {
      let newTweet = createTweetElement(tweet);
      $('#tweet').append(newTweet);
    }
  }
  
  function createTweetElement (tweetObj) {
  let $tweet = $("<article>").addClass("tweet");
  let $header = $("<header>");
  $($header).append("<h2>" + tweetObj.user.name + "</h2>");
  $($header).append('<img src="'+ tweetObj.user.avatars.small + '">');
  $($header).append("<p>" + tweetObj.user.handle + "</p>");
  
  $tweet.append($header);
  $tweet.append("<p>" + tweetObj.content.text + "</p>");
  $tweet.append('<footer>' + timeSince(tweetObj.created_at) + ' ago<i class="fas fa-heart"></i><i class="fas fa-retweet"></i><i class="fas fa-flag"></i></footer>');
  return $tweet;
  };

  // Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

var $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweetholder').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});
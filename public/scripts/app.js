/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  
  const createTweetElement = function (tweetObj) {
  let $tweet = $("<article>").addClass("tweet");
  let $header = $("<header>");
  $($header).append("<h2>" + tweetObj.user.name + "</h2>");
  $($header).append('<img src="'+ tweetObj.user.avatars.small + '">');
  $($header).append("<p>" + tweetObj.user.handle + "</p>");
  
  $tweet.append($header);
  $tweet.append("<p>" + tweetObj.content.text + "</p>");
  $tweet.append('<footer>' + tweetObj.created_at + ' days ago <i class="fas fa-heart"></i><i class="fas fa-retweet"></i><i class="fas fa-flag"></i></footer>');
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
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});
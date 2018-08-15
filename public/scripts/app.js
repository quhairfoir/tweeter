/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 // function to convert js miliseconds to readable date
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

//jQuery functions and code
$(document).ready(function() {

  // creates properly formatted html object for tweet
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

  // appends tweets to DOM
  function renderTweets(tweets) {
    console.log(tweets);
    for (let tweet of tweets) {
      let newTweet = createTweetElement(tweet);
      $('#tweetholder').append(newTweet);
    }
  };
  
  //fetches tweets from /tweets page (JSON object)
  function loadTweets() {
    $.ajax({
      method: "GET",
      url: "/tweets"
    })
    .then(function (something){
      renderTweets(something);
    });
  }; 
  
  loadTweets();

  // AJAX "POST" request 
  $("form").on("submit", (event) => {
    event.preventDefault();
    $.post("/tweets", $("form").serialize());
  });

});
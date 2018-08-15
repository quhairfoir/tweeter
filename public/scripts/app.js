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

// escape function to prevent XSS
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

//jQuery functions and code
$(document).ready(function() {

  // creates properly formatted html object for tweet
  function createTweetElement (tweetObj) {
    let $tweet = $("<article>").addClass("tweet");
    // create and add header 
    let $header = $("<header>");
      let $name = $("<h2>").text(tweetObj.user.name);
      $($header).append($name);
      $($header).append('<img src="'+ tweetObj.user.avatars.small + '">');
      let $handle = $("<p>").text(tweetObj.user.handle);
      $($header).append($handle);
    $tweet.append($header);
    // create and add tweet body
    let $tweetText = $("<p>").text(tweetObj.content.text);
    $tweet.append($tweetText);
    // create and add footer
    $tweet.append('<footer>' + timeSince(tweetObj.created_at) + ' ago<i class="fas fa-heart"></i><i class="fas fa-retweet"></i><i class="fas fa-flag"></i></footer>');
    return $tweet;
  };

  // appends tweets from JSON to DOM
  function renderTweets(tweets) {
    for (let tweet of tweets) {
      let newTweet = createTweetElement(tweet);
      $('#tweetholder').append(newTweet);
    }
  };

  // prepends new tweet to DOM
  function renderSingleTweet(tweet) {
    $('#tweetholder').prepend(createTweetElement(tweet));
  }

  // fetches last tweet added to /tweets JSON object
  function loadNewTweet() {
    $.ajax({
      method: "GET",
      url: "/tweets"
    })
    .then(function (tweets){
      renderSingleTweet(tweets[tweets.length - 1]);
    });
  }; 

  //fetches tweets from /tweets page (JSON object)
  function loadTweets() {
    $.ajax({
      method: "GET",
      url: "/tweets"
    })
    .then(function (tweets){
      renderTweets(tweets);
    });
  }; 
  
  loadTweets();

  // AJAX "POST" request, includes validation for tweet body
  $("form").on("submit", (event) => {
    event.preventDefault();
    let text = event.target[0].value;
    if (text === null) {
      alert("Something's wrong!");
    } else if (!text) {
      alert("Can't post an empty tweet!");
    } else if (text.length > 140) {
      alert("Too long -- 140 characters max!")
    } else {
      $.post("/tweets", $("form").serialize());
      loadNewTweet();
    }
  });

});
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
}

//jQuery functions and code
$(document).ready(function() {
  // creates properly formatted html object for tweet
  function createTweetElement(tweetObj) {
    let $tweet = $("<article>").addClass("tweet");
    let $header = $("<header>");
    let $name = $("<h2>").text(tweetObj.user.name);
    $($header).append($name);
    $($header).append('<img src="' + tweetObj.user.avatars.small + '">');
    let $handle = $("<p>").text(tweetObj.user.handle);
    $($header).append($handle);
    $tweet.append($header);
    let $tweetText = $("<p>").text(tweetObj.content.text);
    $tweet.append($tweetText);
    $tweet.append(
      "<footer>" +
        timeSince(tweetObj.created_at) +
        ' ago<i class="fas fa-heart"></i><i class="fas fa-retweet"></i><i class="fas fa-flag"></i></footer>'
    );
    return $tweet;
  }

  // appends tweets from JSON to DOM
  function renderTweets(tweets) {
    for (let tweet of tweets) {
      let newTweet = createTweetElement(tweet);
      $("#tweetholder").append(newTweet);
    }
  }

  // prepends new tweet to DOM
  function renderSingleTweet(tweet) {
    $("#tweetholder").prepend(createTweetElement(tweet));
  }


  //fetches tweets from server
  function loadTweets() {
    $.ajax({
      method: "GET",
      url: "/tweets"
    })
    .done(function(tweets) {
      renderTweets(tweets);
    })
    .fail(function(err){
      console.log(err);
    })
  }

  loadTweets();

  // AJAX "POST" request, includes validation for tweet body
  $("form").on("submit", event => {
    event.preventDefault();
    let text = event.target[0].value;
    if ($("textarea").hasClass("error")) {
      toggleElementAndClass("#errorMessage", "textarea", "error");
      $("#errorMessage").val("");
    }
    if (!text) {
      $("#errorMessage").text("Tweets must contain text!");
      toggleElementAndClass("#errorMessage", "textarea", "error");
    } else if (text.length > 140) {
      $("#errorMessage").text("Your tweet is too long!");
      toggleElementAndClass("#errorMessage", "textarea", "error");
    } else {
      $.post("/tweets", $("form").serialize())
      .done(function (tweet) {
        renderSingleTweet(tweet);
      })
      $("form").trigger("reset");
      loadNewTweet();
    }
  });

  // reusable function to toggle class on an element
  function toggleClass(elem, className) {
    if (!$(elem).hasClass(className)) {
      $(elem).addClass(className);
    } else {
      $(elem).removeClass(className);
    }
  }

  //hides hidden elements
  $(".new-tweet").hide();
  $("#errorMessage").hide();

  // reusable function to toggle an element's visibility and second element's class
  function toggleElementAndClass(elem1, elem2, className) {
    if ($(elem1).is(":hidden")) {
      $(elem1).slideDown("slow");
      toggleClass(elem2, className);
    } else {
      $(elem1).hide();
      toggleClass(elem2, className);
    }
  }

  // hide compose tweet sectin when #compose button clicked
  $("#compose").on("click", event => {
    toggleElementAndClass(".new-tweet", "#compose", "clicked");
    $("textarea").focus();
    console.log("CLICK");
  });
});

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  //when the page is ready hide the error message from screen!
  $(".error").hide();

  //tweet element function, use escape to check for timeago to format the time & server side scipting .

  const createTweetElement = function (tweetObject) {
    let $tweet =
      `<article class="tweet">
      <header class="tweet-header">
        <div>
      <img src=${tweetObject.user.avatars}>
      <span class="username">${tweetObject.user.name}</span>
        </div>
        <span class="handle">${tweetObject.user.handle}<span>
      </header>
      <div class="contentTweet">${escape(tweetObject.content.text)}</div>
      <footer class="tweet-footer">
      <span>${timeago.format(tweetObject.created_at)}</span>
        <div>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-heart"></i>
          <i class="fas fa-retweet"></i>
        </div>
      </footer>
    </article>`


    return $tweet;
  }

  // instead of refreshing the page jsut submit form

  $("#tweet-form").on("submit", function (event) {
    //should prevent refresh & submit new tweet to the page!
    event.preventDefault();

    //more than 140 char error slide down!
    if ($("#tweet-text").val().length > 140) {
      $(".error").slideDown("slow").text("Text must be less than or equal to 140 characters");
      //empty form error with text
    } else if (!$("#tweet-text").val()) {
      $(".error")
        .slideDown("slow")
        .text("Please fill out the field!");
    } else {
      //error should go away
      $(".error").slideUp("slow");
      //data to more readable text
      const serialiedData = $(this).serialize();
      //ajax post method to post the form data.
      $.ajax({
        method: "POST",
        url: "http://localhost:8080/tweets/",
        data: serialiedData,
        success: function (data) {
          //empty form area after succesfull submit!
          console.log(data)
          $(".tweets-container").empty();
          $("#tweet-form").each(function () {
            this.reset();
          });
          //should load the tweets
          loadTweets();
          //should re start counter for char!
          $(".counter").text("140");
        },
      });
    }
  });

  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      const $tweetsContainer = $(".tweets-container");
      $tweetsContainer.prepend($tweet);
    }
  };

  //escape function that prevents and cheks for server side scripting!
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //function that loads the tweets to the get route
  function loadTweets() {
    $.get("http://localhost:8080/tweets/", function (data) {
      renderTweets(data);
    });
  }

  loadTweets();
});
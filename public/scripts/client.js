/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const $tweet = $(`<article class="tweet">Hello world</article>`);


$(document).ready(function () {
  const createTweetElement = function (tweetObject) {
    let $tweet =
      /* Your code for creating the tweet element */
      // ...

      `<article class="tweet">
      <header class="tweet-header">
        <div>
      <img src=${tweetObject.user.avatars}>
      <span class="username">${tweetObject.user.name}</span>
        </div>
        <span class="handle">${tweetObject.user.handle}<span>
      </header>
      <div class="contentTweet">${tweetObject.content.text}</div>
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



  $("#tweet-form").on("submit", function (event) {
    event.preventDefault();

    if ($("#tweet-text").val().length > 140) {
      $(".error").slideDown("slow").text("Come on try to make it 140 Char!!");

    } else if (!$("#tweet-text").val()) {
      $(".error")
        .slideDown("slow")
        .text("No empty tweet welcome here!.");
    } else {
      event.preventDefault();
      $(".error").slideUp("slow");
      const serialiedData = $(this).serialize();
      $.ajax({
        method: "POST",
        url: "http://localhost:8080/tweets/",
        data: serialiedData,
        success: function (data) {
          console.log(data)
          $("#tweets-container").empty();
          $("#tweet-form").each(function () {
            this.reset();
          });
          loadTweets();
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



  function loadTweets() {
    $.get("http://localhost:8080/tweets/", function (data) {
      renderTweets(data);
    });
  }

  loadTweets();
});
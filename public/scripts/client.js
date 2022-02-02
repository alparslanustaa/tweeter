/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    const $tweetsContainer = $("#tweets-container");
    $tweetsContainer.prepend($tweet);
  }
};



const createTweetElement = function (tweet) {
  let $tweet =
    /* Your code for creating the tweet element */
    // ...
    <article class="tweet">
      <header class="tweet-header">
        <div>

          <h4> Title Tweet </h4>
        </div>
        <span class="username">${tweetObject.user.name}</span>
      </header>
      <div>
        ${tweetObject.content.text}
      </div>
      <footer class="tweet-footer">
        <span>${timeago.format(tweetObject.created_at)}</span>
        <div>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-heart"></i>
          <i class="fas fa-retweet"></i>
        </div>
      </footer>
    </article>

  return $tweet;
}


renderTweets(data);

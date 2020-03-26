/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

const sendTweet = () => {
  const userInput = $('#tweet-text').val();
};

// Main logic
$(document).ready(function() {
  // sendTweet();

  $('.tweetForm').on('submit', function(event) {
    if ($('#tweet-text').val() === '' || $('#tweet-text').val() === null) {
      event.preventDefault();
      $('#error').slideDown(1, function() {
        $('#error').addClass('show# error');
        $('#error').text("🚩 It's empty 🚩");
      });
      // alert(`There's nothing there`);
      return;
    } else if ($('#tweet-text').val().length > 140) {
      event.preventDefault();
      $('#error').slideDown(1, function() {
        $('#error').addClass('show# error');
        $('#error').text('🚩 Too long 🚩');
      });
      return;
    }
    if ($('#error').text())
      $('#error').slideUp(1, function() {
        $('#error').empty();
      });

    console.log('before ajax call');
    event.preventDefault();
    console.log('Button clicked, performing ajax call...');

    const userInput = `text=${$('#tweet-text').val()}`; // another way to serialize
    // const userInput = $('.tweetForm').serialize();

    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: userInput
    })
      .then(function() {
        $('#tweet-container').empty();

        loadTweets();
        $('form').get(0).reset();
        $('.counter').val(0);
      })
      .catch(function(err) {
        console.log('failiure', err);
      });
  });

  const loadTweets = () => {
    $.get('/tweets', function(data) {
      for (let tweet of data) {
        const $tweetToAppend = createTweetElement(tweet);
        $('#tweet-container').prepend($tweetToAppend);
      }
    });
  };

  loadTweets();

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (let tweet of tweets) {
      const $tweetToAppend = createTweetElement(tweet);
      $('#tweet-container').append($tweetToAppend);
    }
  };

  const createTweetElement = (tweetData) => {
    const $tweet = $('<article>').addClass('tweet');
    const escape = function(str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const html = `
      <header>
        <img src="${tweetData.user.avatars}">
        <span>${tweetData.user.name}</span>
      <div class='float-right'>
        <span id='handle'>${tweetData.user.handle}</span>
      </div>
    </header>
    <p>${escape(tweetData.content.text)}</p>
    <footer>
      <div class='float-left'>
        <span>${tweetData.created_at}</span>
      </div>
      <div class='float-right social-media-imgs'>
        <img src="/images/tweet.png" alt="">
        <img src="/images/retweet.png" alt="">
        <img src="/images/hashtag.png" alt="">
      </div>
    </footer>`;

    let finalTweet = $tweet.append(html);

    return finalTweet;
  };

  // renderTweets(data);
});

// Dummy Data
// const data = [
//   {
//     user: {
//       name: 'Newton',
//       avatars: 'https://i.imgur.com/73hZDYK.png',
//       handle: '@SirIsaac'
//     },
//     content: {
//       text: 'If I have seen further it is by standing on the shoulders of giants'
//     },
//     created_at: 1461116232227
//   },
//   {
//     user: {
//       name: 'Descartes',
//       avatars: 'https://i.imgur.com/nlhLi3I.png',
//       handle: '@rd'
//     },
//     content: {
//       text: 'Je pense , donc je suis'
//     },
//     created_at: 1461113959088
//   },
//   {
//     user: {
//       name: 'HELLO0000',
//       avatars: 'https://i.imgur.com/nlhLi3I.png',
//       handle: '@rbbbbbb'
//     },
//     content: {
//       text: 'Hello Hello'
//     },
//     created_at: 1461113959088
//   }
// ];

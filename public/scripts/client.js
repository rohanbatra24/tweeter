const convertTimestampToDays = (timeStamp) => {
  // get total seconds between the times
  let diff = Math.abs(Date.now() - timeStamp) / 1000;

  // calculate (and subtract) whole days
  let days = Math.floor(diff / 86400);
  diff -= days * 86400;

  // calculate (and subtract) whole hours
  let hours = Math.floor(diff / 3600) % 24;
  diff -= hours * 3600;

  // calculate (and subtract) whole minutes
  let minutes = Math.floor(diff / 60) % 60;
  diff -= minutes * 60;

  if (days === 1) {
    return `1 day ago`;
  } else if (days > 1) {
    return `${days} days ago`;
  } else if (hours > 1) {
    return `$(hours) hours ago`;
  } else if (hours <= 1) {
    if (minutes === 1) {
      return `1 minute ago`;
    } else if (minutes === 0) {
      return `just now..`;
    } else if (minutes > 1) {
      return `${minutes} minutes ago`;
    }
  }
};

// Main logic
$(document).ready(function() {
  $('form').addClass('show');

  $('#nav-btn').on('click', () => {
    $('form').toggleClass('show');
  });

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

  const createTweetElement = (tweetData) => {
    const $tweet = $('<article>').addClass('tweet');
    const escape = function(str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    let timeStamp = tweetData.created_at;

    const html = `
      <header>
        <div class='float-left'>
          <img src="${tweetData.user.avatars}">
          <span>${tweetData.user.name}</span>
        </div>
      <div class='float-right'>
        <span id='handle'>${tweetData.user.handle}</span>
      </div>
    </header>
    <p>${escape(tweetData.content.text)}</p>
    <footer>
      <div class='float-left'>
        <span>${convertTimestampToDays(timeStamp)}</span>
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
});

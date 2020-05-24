'use strict';

const STREAM_CHANNEL = 'twitter-stream';

module.exports = (socket) => {
  const twitter = new require('twitter')({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

  twitter.stream('statuses/filter', { track: 'JavaScript' }, (stream) => {
    stream.on('data', (tweet) => {
      emit(tweet);
    });

    stream.on('error', (error) => {
        console.log(error);
    });
  });

  const emit = (message) => {
    socket.emit(STREAM_CHANNEL, message);
  }
}

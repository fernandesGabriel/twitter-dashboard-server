'use strict';


const TRACK_CHANNEL = 'twitter-track-for';
const STREAM_CHANNEL = 'twitter-stream';

module.exports = (socket) => {
  const twitter = new require('twitter')({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

  let twitterStream;

  socket.on(TRACK_CHANNEL, (from, track) => {
    if (twitterStream) 
      twitterStream.destroy();

    if (track)
      stream(track);
  });
  
  const stream = (track) => {
    twitter.stream('statuses/filter', { track: track }, (stream) => {
      stream.on('data', (data) => {
        emit(data);
      });

      stream.on('error', (error) => {
        console.log(error);
      });

      twitterStream = stream;
    });
  }

  const emit = (data) => {
    socket.emit(STREAM_CHANNEL, data);
  }
}

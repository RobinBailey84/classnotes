const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const Lyrics = function(){
  this.lyrics = [];
}

Lyrics.prototype.bindEvents = function(){
  PubSub.subscribe('FormView:song-ready', (event) => {
    const title = event.detail.title;
    const artist = event.detail.artist;
    const request = new Request(`https://api.lyrics.ovh/v1/${ artist }/${ title }`)
    request.get().then((data) => {
      this.lyrics = data.lyrics
      PubSub.publish('Lyrics:request-complete', this.lyrics);
    });


  });
};

module.exports = Lyrics;

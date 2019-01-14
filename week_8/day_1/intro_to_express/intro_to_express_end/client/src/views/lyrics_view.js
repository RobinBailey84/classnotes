const PubSub = require('../helpers/pub_sub.js');

const LyricsView = function (container) {
  this.container = container;
}

LyricsView.prototype.bindEvents = function(){
  PubSub.subscribe('Lyrics:request-complete', (event) => {
    this.render(event.detail);
  });
}

LyricsView.prototype.render = function (lyrics) {
  this.container.innerHTML = '';
  this.container.innerText = lyrics;
}

module.exports = LyricsView;

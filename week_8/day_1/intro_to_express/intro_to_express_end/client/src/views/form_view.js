const PubSub = require('../helpers/pub_sub.js');

const FormView = function (element) {
  this.element = element;
}

FormView.prototype.bindEvents = function () {
  this.element.addEventListener('submit', function (evt) {
    evt.preventDefault();

    const song = {
      artist: evt.target.artist.value,
      title: evt.target.title.value
    }

    PubSub.publish('FormView:song-ready', song);

    evt.target.artist.value = '';
    evt.target.title.value = '';
});
}

module.exports = FormView;

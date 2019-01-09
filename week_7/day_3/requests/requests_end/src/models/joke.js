const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Joke = function () {
  this.joke = null;
}

Joke.prototype.getData = function () {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    if (xhr.status !== 200) return;
    const jsonString = xhr.responseText;
    const data = JSON.parse(jsonString);
    this.joke = data.joke;
    PubSub.publish('Joke:joke-loaded', this.joke);
  });

  xhr.open('GET', this.url);
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.send();
}

module.exports = Joke;

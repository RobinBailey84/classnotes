const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Games = function (url) {
  this.url = url;
};

Games.prototype.bindEvents = function () {
  PubSub.subscribe('GameView:game-delete-clicked', (evt) => {
    this.deleteGame(evt.detail);
  });

  PubSub.subscribe('GameView:game-submitted', (evt) => {
    this.postGame(evt.detail);
  });

  PubSub.subscribe('GameView:game-edit-clicked', (evt) => {
    this.publishGame(evt.detail);
  });

  PubSub.subscribe('GameView:game-updated', (evt) => {
    this.updateGame(evt.detail);
  })
};

Games.prototype.getData = function () {
  const request = new Request(this.url);
  request.get()
    .then((games) => {
    this.publishGames(games);
    })
    .catch(console.error);
};

Games.prototype.postGame = function (game) {
  const request = new Request(this.url);
  request.post(game)
    .then((games) => {
      this.publishGames(games);
    })
    .catch(console.error);
};

Games.prototype.updateGame = function(details){
  const request = new Request(this.url);
  request.put(details.id, details.game)
    .then((games) => {
      this.publishGames(games);
    })
    .catch(console.error);
};

Games.prototype.deleteGame = function (gameId) {
  const request = new Request(this.url);
  request.delete(gameId)
    .then((games) => {
      this.publishGames(games);
    })
    .catch(console.error);
};

Games.prototype.publishGame = function(gameId){
  const request = new Request(this.url);
  request.show(gameId)
  .then((game) => {
    PubSub.publish('Games:game-loaded', game);
  })
  .catch(console.error);
}

Games.prototype.publishGames = function(games){
  PubSub.publish('Games:data-loaded', games);
}

module.exports = Games;

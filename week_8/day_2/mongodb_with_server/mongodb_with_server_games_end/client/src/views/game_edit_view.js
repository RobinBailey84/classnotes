const PubSub = require('../helpers/pub_sub.js');
const GameView = require('./game_view.js');

const GamesEditView = function (container, form) {
  this.container = container;
  this.form = form;
  this.game = null;
};

GamesEditView.prototype.bindEvents = function () {
  PubSub.subscribe('Games:game-loaded', (evt) => {
    this.game = evt.detail;
    this.renderForm(this.game);
    this.form.addEventListener('submit', (evt) => {
      this.handleSubmit(evt);
    })
  });
};

GamesEditView.prototype.handleSubmit = function (evt) {
  evt.preventDefault();
  const updatedGame = this.updateGame(evt.target);
  const details = {id: this.game._id, game: updatedGame};
  PubSub.publish('GameView:game-updated', details);
};

GamesEditView.prototype.updateGame = function (form) {
  const updatedGame = {
    name: form.name.value,
    playingTime: form.playingTime.value,
    players: {
      min: form.minNumPlayers.value,
      max: form.maxNumPlayers.value
    }
  };

  return updatedGame;
};


GamesEditView.prototype.renderForm = function (game) {
  this.container.innerHTML = '';
  this.form.innerHTML = '';

  const header = document.createElement('h3');
  header.textContent = 'Edit game';
  this.container.appendChild(header);

  this.createInput('text', 'name', game.name);

  this.createInput('number', 'playingTime', game.playingTime);

  this.createInput('number', 'minNumPlayers', game.players.min);

  this.createInput('number', 'maxNumPlayers', game.players.max);

  const submitButton = document.createElement("input");
  submitButton.setAttribute('type',"submit");
  submitButton.setAttribute('value',"Update");
  this.form.appendChild(submitButton);

  this.container.appendChild(this.form);

}

GamesEditView.prototype.createInput = function (type, name, value) {
  const input = document.createElement("input"); //input element, text
  input.setAttribute('type', type);
  input.setAttribute('name',name);
  input.setAttribute('value', value);
  this.form.appendChild(input);
}

module.exports = GamesEditView;

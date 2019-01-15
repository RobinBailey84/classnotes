const GameFormView = require('./views/game_form_view.js')
const GameGridView = require('./views/games_grid_view.js');
const GamesEditView = require('./views/game_edit_view.js');
const Games = require('./models/games.js');

document.addEventListener('DOMContentLoaded', () => {
  const gamesForm = document.querySelector('form#games-form');
  const gamesFormView = new GameFormView(gamesForm);
  gamesFormView.bindEvents();

  const gamesContainer = document.querySelector('div#games');
  const gamesGridView = new GameGridView(gamesContainer);
  gamesGridView.bindEvents();

  const editForm = document.createElement("form");
  editForm.setAttribute('id', 'games-form')
  const gamesEditView = new GamesEditView(gamesContainer, editForm);
  gamesEditView.bindEvents();

  const gamesUrl = 'http://localhost:3000/api/games';
  const games = new Games(gamesUrl);
  games.bindEvents();
  games.getData();
});

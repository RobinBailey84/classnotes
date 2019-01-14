const FormView = require('./views/form_view.js');
const LyricsView = require('./views/lyrics_view.js');
const Lyrics = require('./models/lyrics.js');
const PubSub = require('./helpers/pub_sub.js');

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const formView = new FormView(form);
  formView.bindEvents();

  const lyricsContainer = document.querySelector('#lyrics-container');
  const lyricsView = new LyricsView(lyricsContainer);
  lyricsView.bindEvents();

  const lyrics = new Lyrics();
  lyrics.bindEvents();
});

const BreedFormView = require('./views/breed_form_view.js');
const DogView = require('./views/dog_view.js');
const Dogs = require('./models/dogs.js');

document.addEventListener('DOMContentLoaded', () => {
  const breedForm = document.querySelector('#breed-form')
  const breedFormView = new BreedFormView(breedForm);
  breedFormView.bindEvents();

  const dogContainer = document.querySelector('#dog-container');
  const dogView = new DogView(dogContainer);
  dogView.bindEvents();

  const dogs = new Dogs();
  dogs.bindEvents();
});

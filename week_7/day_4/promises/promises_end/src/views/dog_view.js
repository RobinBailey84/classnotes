const PubSub = require('../helpers/pub_sub.js');

const DogView = function (container) {
  this.container = container;
}

DogView.prototype.bindEvents = function () {
  PubSub.subscribe('Dogs:dog-data-loaded', (evt) => {
    const dogs = evt.detail;
    this.render(dogs);
  });
}

DogView.prototype.render = function (dogs) {
  this.clearDogs();

  dogs.forEach((dog) => {
    const img = this.createImage(dog);
    this.container.appendChild(img);
  });
}

DogView.prototype.clearDogs = function () {
  this.container.innerHTML = '';
}

DogView.prototype.createImage = function (imageUrl) {
  const img = document.createElement('img');
  img.src = imageUrl;
  return img;
}

module.exports = DogView;

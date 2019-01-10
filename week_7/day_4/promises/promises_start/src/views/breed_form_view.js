const PubSub = require('../helpers/pub_sub.js');

const BreedFormView = function (element) {
  this.element = element;
}

BreedFormView.prototype.bindEvents = function () {
  this.element.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const breed = event.target['breed-input'].value;
    PubSub.publish('BreedFormView:form-submitted', breed);
    this.element.reset();
  });
}

module.exports = BreedFormView;

const PubSub = require('../helpers/pub_sub.js');

const NumberInputView = function () {

};

NumberInputView.prototype.bindEvents = function () {
  const form = document.querySelector('#prime-checker-form');
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const inputtedNumber = evt.target.number.value;
    PubSub.publish('NumberInputView:number-submitted', inputtedNumber);
  });
};

module.exports = NumberInputView;

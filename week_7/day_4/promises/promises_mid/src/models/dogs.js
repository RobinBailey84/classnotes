const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Dogs = function () {
  this.data = null;
};

Dogs.prototype.bindEvents = function () {
  PubSub.subscribe('BreedFormView:form-submitted', (event) => {
    const breed = event.detail;
    this.getData(breed);
  });
};

Dogs.prototype.getData = function (breed) {
  const url = `https://dog.ceo/api/breed/${ breed }/images`;
  const request = new RequestHelper(url);
  request.get()
    .then((data) => {
      this.data = data.message;
      PubSub.publish('Dogs:dog-data-loaded', this.data);
    })
    .catch((message) => {
      console.error(message);
    });
};

module.exports = Dogs;

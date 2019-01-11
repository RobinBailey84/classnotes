const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Munros = function () {
  this.munrosData = [];
  this.regions = [];
};

Munros.prototype.getData = function () {
  const request = new RequestHelper('https://munroapi.herokuapp.com/api/munros')
  request.get((data) => {
    PubSub.publish('Munros:munros-ready', data);
  });
};

module.exports = Munros;

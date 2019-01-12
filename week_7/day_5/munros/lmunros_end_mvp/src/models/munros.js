const Request = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Munros = function () {
  this.munrosData = [];
  this.regions = [];
};


Munros.prototype.getData = function(){
  const request = new Request('https://munroapi.herokuapp.com/munros');
  request.get().then((data) => {
    this.munrosData = data;
    PubSub.publish('Munros:munros-ready', this.munrosData);
  });
}

module.exports = Munros;

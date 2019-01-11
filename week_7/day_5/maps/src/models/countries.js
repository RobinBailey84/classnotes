const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/requests.js');

const Countries = function(){
  this.countries = [];
}

Countries.prototype.bindEvents = function(){
  PubSub.subscribe('SelectView:country-index-selected', (event) => {
    const index = event.detail;
    const country = this.countries[index];
    PubSub.publish('Countries:country-ready', country);
  })
}

Countries.prototype.getData = function(){
  const request = new Request('https://restcountries.eu/rest/v2/all');
  request.get().then((data) => {
    this.countries = data;
    PubSub.publish('Countries:countries-loaded', this.countries);
  });

}

module.exports = Countries;

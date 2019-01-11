const PubSub = require('../helpers/pub_sub.js');

const CountryDetailView = function(container){
this.container = container;
}

CountryDetailView.prototype.bindEvents = function(){
  PubSub.subscribe('Countries:country-ready', (event) => {
    const country = event.detail;
    this.render(country);
  })
}

CountryDetailView.prototype.render = function(country){

  this.container.innerHTML = '';

  const header = this.addElement('h2', country.name);

  const regionHeader = document.createElement('h3');
  regionHeader.textContent = country.region;
  this.container.appendChild(regionHeader);

  const flagImage = document.createElement('img');
  flagImage.src = country.flag;
  flagImage.alt = `${country.name}'s flag'`;

  flagImage.id = 'flag';

  this.container.appendChild(flagImage);

  const list = this.createList(country)

  this.container.appendChild(list)

}

CountryDetailView.prototype.addElement = function(type, text){
  const element = document.createElement(type);
  element.textContent = text;
  this.container.appendChild(element);
}

CountryDetailView.prototype.createList = function(country){
  const detailsList = document.createElement('ul');

  country.languages.forEach((language) => {
    const listItem = document.createElement('li')
    listItem.textContent = language.name;
    detailsList.appendChild(listItem);
  });
  return detailsList;
}

module.exports = CountryDetailView;

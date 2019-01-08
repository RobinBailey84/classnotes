const PubSub = require('../helpers/pub_sub.js');

const PlanetsMenuView = function(menu) {
  this.menu = menu;
};

PlanetsMenuView.prototype.bindEvents = function() {

  PubSub.subscribe('Planets:all-planets-ready', (event) => {
    console.log(event.detail);
    this.populate(event.detail);
  });

  this.menu.addEventListener('click', (evt) => {
    const selectedPlanetName = evt.target.id;
    PubSub.publish('PlanetsMenuView:selected', selectedPlanetName);
  });
};

PlanetsMenuView.prototype.populate = function(planets){
  planets.forEach((planet) => {
    const planetLink = document.createElement('a');
    planetLink.id = planet.name;
    planetLink.classList.add('planet-menu-item');
    planetLink.innerText = planet.name;
    this.menu.appendChild(planetLink);
  })
}

module.exports = PlanetsMenuView;

const planetsData = require('./data/planets.js');
const SolarSystem = require('./models/solar_system.js');
const PlanetsMenuView = require('./views/planets_menu_view.js');
const PlanetInfoView = require('./views/planet_info_view.js');

document.addEventListener('DOMContentLoaded', () => {

  const menu = document.querySelector('nav.planets-menu');
  const menuView = new PlanetsMenuView(menu);
  menuView.bindEvents();

  const planetsDataModel = new SolarSystem(planetsData);
  planetsDataModel.bindEvents();

  const detailsContainer = document.querySelector('section.planet-details');
  const planetDetailsView = new PlanetInfoView(detailsContainer);
  planetDetailsView.bindEvents();
});

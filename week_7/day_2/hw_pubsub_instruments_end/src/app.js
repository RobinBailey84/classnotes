const instrumentFamilyData = require('./data/instrument_family_data.js');
const InstrumentFamilies = require('./models/instrument_families.js');
const SelectView = require('./views/select_view.js');
const InstrumentFamilyView = require('./views/instrument_family_view.js');


document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');

  const selectElement = document.querySelector('#instrument-families');
  const selectView = new SelectView(selectElement);
  selectView.bindEvents();

  const instrumentFamilyView = new InstrumentFamilyView();
  instrumentFamilyView.bindEvents();

  const instrumentFamilies = new InstrumentFamilies(instrumentFamilyData);
  instrumentFamilies.bindEvents();

});

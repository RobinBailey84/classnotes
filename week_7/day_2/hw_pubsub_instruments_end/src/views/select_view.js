const PubSub = require('../helpers/pub_sub.js');

const SelectView = function(element){
  this.element = element
}

SelectView.prototype.bindEvents = function(){
  PubSub.subscribe('InstrumentFamilies:all-data-ready', (event) => {
    this.populate(event.detail);
  });

  this.element.addEventListener('change', (event) => {
    const selectedIndex = event.target.value;
    PubSub.publish('SelectView:family-selected', selectedIndex);
  })
}

SelectView.prototype.populate = function(families){
  families.forEach((family, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = family.name;
    this.element.appendChild(option);
  })

}

module.exports = SelectView;

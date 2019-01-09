const PubSub = require('../helpers/pub_sub.js');

const InstrumentFamilyView = function(){

};

InstrumentFamilyView.prototype.bindEvents = function(){
  PubSub.subscribe('InstrumentFamilies:family-selected', (event) => {
    const instrumentFamily = event.detail;
    this.render(instrumentFamily);
  });
}

InstrumentFamilyView.prototype.render = function (instrumentFamily) {
  const container = document.querySelector('#instrument-family');
  container.innerHTML = '';

  const header = this.addElement('h2', instrumentFamily.name);

  const description = this.addElement('p', instrumentFamily.description);

  const listTitle = this.addElement('h3', 'Instruments include:');

  const list = this.createList(instrumentFamily.instruments);


  container.appendChild(header);
  container.appendChild(description);
  container.appendChild(listTitle);
  container.appendChild(list);

};

InstrumentFamilyView.prototype.addElement = function(type, text){
  const element = document.createElement(type);
  element.textContent = text;
  return element;
}

InstrumentFamilyView.prototype.createList = function(instruments) {
    const list = document.createElement('ul');
    instruments.forEach((instrument) => {
      const listItem = this.addElement('li', instrument);
    list.appendChild(listItem);
  });
  return list

}

module.exports = InstrumentFamilyView;

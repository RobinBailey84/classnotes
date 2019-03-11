import Vue from 'vue';

document.addEventListener("DOMContentLoaded", () => {
  new Vue({
    el: "#app",
    data: {
      beers: [],
      selectedBeerIndex: null,
      selectedBeer: null,
      favouritesList: [],
      selectedBeerIngredients: {}
    },
    mounted(){
      this.getBeers()
    },
    methods: {
      getBeers: function(){
        fetch("https://api.punkapi.com/v2/beers")
        .then(res => res.json())
        .then(beers => this.beers = beers)
      },
      beerSelect: function(){
        this.selectedBeer = this.beers[this.selectedBeerIndex];
        this.generateBeerIngredients(this.selectedBeer);
      },
      addToFavourites: function(){
        this.favouritesList.push(this.selectedBeer)
      },
      removeFromFavourites: function(index){
        this.favouritesList.splice(index, 1);
      },
      generateBeerIngredients: function(beer){
        const ingredientData = {};
        for(let ingredientKey in beer.ingredients){
          if(typeof beer.ingredients[ingredientKey] === 'string'){
            ingredientData[ingredientKey] = [beer.ingredients[ingredientKey]]
          } else {
            let ingredientsList = beer.ingredients[ingredientKey]
                                  .map(ingredient => ingredient.name)
                                  .filter((ingredientName, index, array) => array.indexOf(ingredientName) === index);
            ingredientData[ingredientKey] = ingredientsList;
          }
        }
        this.selectedBeerIngredients = ingredientData;
      }
    }
  })
})

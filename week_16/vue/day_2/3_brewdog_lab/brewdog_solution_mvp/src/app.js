import Vue from 'vue';

document.addEventListener("DOMContentLoaded", () => {
  new Vue({
    el: "#app",
    data: {
      beers: [],
      selectedBeerIndex: null,
      selectedBeer: null,
      favouritesList: []
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
      },
      addToFavourites: function(){
        this.favouritesList.push(this.selectedBeer)
      },
      removeFromFavourites: function(index){
        this.favouritesList.splice(index, 1);
      }
    }
  })
})

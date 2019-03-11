import Vue from 'vue';

document.addEventListener("DOMContentLoaded", () => {
    new Vue({
      el: "#app",
      data: {
        countries: [],
        selectedCountryIndex: '',
        selectedCountry: null,
        favouriteCountries: []
      },
      mounted(){
        this.getCountries()
      },
      methods: {
        getCountries: function(){
          fetch("https://restcountries.eu/rest/v2/all")
          .then(res => res.json())
          .then(countries => this.countries = countries)
        },
        countrySelect: function(){
          this.selectedCountry = this.countries[this.selectedCountryIndex];
        },
        addToFavourites: function(){
          this.favouriteCountries.push(this.selectedCountry)
        }
      }
    })
})

<template lang="html">
  <div>
    <h1>Countries</h1>
    <input type="text" v-model="search" placeholder="search for country..." v-on:keyup="searchForCountry">
    <country-select :countries="countries"></country-select>
    <country-detail :country="selectedCountry"></country-detail>
  </div>
</template>

<script>
import { eventBus } from './main.js'
import CountrySelect from './components/CountrySelect.vue'
import CountryDetail from './components/CountryDetail.vue'

export default {
  data(){
    return {
      countries: [],
      selectedCountry: null,
      search: ''
    }
  },
  components: {
    countrySelect: CountrySelect,
    countryDetail: CountryDetail
  },
  mounted(){
    fetch('https://restcountries.eu/rest/v2/all')
    .then(res => res.json())
    .then(countries => this.countries = countries)

    eventBus.$on('country-selected', (index) => {
      this.selectedCountry = this.countries[index]
    })
  },
  methods: {
    searchForCountry: function(){
      let foundCountry = this.countries.find((country) => {
        // return country.name.toLowerCase() === this.search.toLowerCase()
        return country.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      })
      this.selectedCountry = foundCountry
    }
  }
}
</script>

<style lang="css" scoped>
</style>

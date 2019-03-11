<template lang="html">
  <div>
    <h1>Countries</h1>
    <div class="main-container">
      <countries-list :countries="countries"></countries-list>
      <country-detail :country="selectedCountry"></country-detail>
    </div>
  </div>
</template>

<script>
import { eventBus } from './main.js'
import CountryDetail from './components/CountryDetail.vue'
import CountriesList from './components/CountriesList.vue'

export default {
  data(){
    return {
      countries: [],
      selectedCountry: null    }
  },
  components: {
    countriesList: CountriesList,
    countryDetail: CountryDetail
  },
  mounted(){
    fetch('https://restcountries.eu/rest/v2/all')
    .then(res => res.json())
    .then(countries => this.countries = countries)

    eventBus.$on('country-selected', (country) => {
      this.selectedCountry = country
    })
  }
}
</script>

<style lang="css" scoped>
  .main-container {
    display: flex;
    justify-content: space-between;
  }
</style>

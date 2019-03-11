<template lang="html">
  <div>
    <h1>Countries</h1>
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
      selectedCountry: null
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

}
</script>

<style lang="css" scoped>
</style>

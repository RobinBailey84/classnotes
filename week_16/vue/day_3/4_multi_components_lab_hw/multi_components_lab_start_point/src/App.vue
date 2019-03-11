<template lang="html">
  <div>
    <h1>Countries</h1>
    <div class="main-container">

    </div>
  </div>
</template>

<script>


export default {
  data(){
    return {
      countries: [],
      selectedCountry: null
    }
  },
  components: {

  },
  mounted(){
    fetch('https://restcountries.eu/rest/v2/all')
    .then(res => res.json())
    .then(countries => this.countries = countries)
  }
}
</script>

<style lang="css" scoped>
  .main-container {
    display: flex;
    justify-content: space-between;
  }
</style>

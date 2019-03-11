<template lang="html">
  <div v-if="country">
    <h1>{{country.name}}</h1>
    <p>Capital: {{country.capital}}</p>
    <p>Population: {{country.population}}</p>
    <p>Languages:</p>
    <ul v-for="language in country.languages">
      <li>{{language.name}}</li>
    </ul>
    <img :src="country.flag" :alt="country.name">
  </div>
</template>

<script>
export default {
  name: 'country-detail',
  props: ['country']
}
</script>

<style lang="css" scoped>
  img {
    width: 50%
  }
</style>

<template lang="html">
  <select v-on:change="handleSelect" v-model="selectedCountryIndex">
    <option disabled value="">Select a country...</option>
    <option v-for="(country, index) in countries" :value="index">{{country.name}}</option>
  </select>
</template>

<script>
import { eventBus } from '../main.js'

export default {
  name: 'country-select',
  data(){
    return {
      selectedCountryIndex: ''
    }
  },
  props: ['countries'],
  methods: {
    handleSelect: function(){
      eventBus.$emit('country-selected', this.selectedCountryIndex)
    }
  }
}
</script>

<style lang="css" scoped>
</style>

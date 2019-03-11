<template>
  <form>
    <h1>Mortgage calculator</h1>
    <p>Enter your annual salary</p>

    <input type="number" v-model="salary" />

    <loan-calculator v-bind:salary="salary" />
  </form>
</template>

<script>
import LoanCalculator from './LoanCalculator';

export default {
  name: 'HelloWorld',
  data () {
    return {
      salary: 0
    }
  },
  components: {
    LoanCalculator
  }
}
</script>

<style scoped>

</style>

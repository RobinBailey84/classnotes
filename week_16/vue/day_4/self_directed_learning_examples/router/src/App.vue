<template>
  <div id="app">
    <ul>
      <li> <router-link :to="{ name: 'Home', params: {} }">Home</router-link></li>
      <li> <router-link :to="{ name: 'AboutUs', params: {} }">About</router-link></li>
      <li> <router-link :to="{ name: 'ContactUs', params: {} }">Contact</router-link></li>
    </ul>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

</style>

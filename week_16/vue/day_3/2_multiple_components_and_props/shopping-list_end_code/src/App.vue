<template lang="html">
  <div class="">
    <h1>My Shopping List</h1>
    <ul>
      <list-item v-for="(item, index) in items" :key="index" :item="item" ></list-item>
    </ul>
  </div>
</template>

<script>
import ListItem from './components/ListItem.vue';

export default {
  name: 'app',
  data() {
    return {
      items: [
        {name: 'Milk', purchased: false},
        {name: 'Cheese', purchased: true},
        {name: 'Beans', purchased: false},
      ]
    };
  },
  components: {
    'list-item': ListItem
  }
}
</script>

<style lang="css" scoped>
</style>

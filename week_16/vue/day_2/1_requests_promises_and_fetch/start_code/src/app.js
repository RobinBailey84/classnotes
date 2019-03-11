import Vue from 'vue';

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    data: {
      dogImgLink: null
    },
    methods: {
      fetchDog: function(){
        console.log('Hello from fetchDog!');
      }
    }
  })
})

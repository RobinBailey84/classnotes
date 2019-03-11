import Vue from 'vue';

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    data: {
      dogImgLink: null
    },
    methods: {
      fetchDog: function(){
        fetch("https://dog.ceo/api/breeds/image/random")
          .then(response => response.json())
          .then(data => this.dogImgLink = data.message);
      }
    }
  })
})

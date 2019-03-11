import Vue from "vue";
import WordCounter from "./models/wordCounter"

window.addEventListener("DOMContentLoaded", () => {
  new Vue({
    el: "#app",
    data: {
      title: 'WORD COUNTER',
      phrase: '',
      resultDisplay: ''
    },
    methods: {
      countWords:function(){
        const totalWords = WordCounter(this.phrase);
        this.resultDisplay = `This phrase contains ${totalWords} words`;
        this.phrase = '';
      }
    }
  });
});

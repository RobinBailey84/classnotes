import Vue from 'vue';

document.addEventListener('DOMContentLoaded', () => {

  new Vue({
    el: '#app',
    data: {
      rates: {},
      euroValue: null,
      currencyValue: null,
      selectedCurrency: null,
      fromEurosResult: null,
      toEurosResult: null,
      baseCurrency: null,
      toCurrency: null,
      exchangeValue: null,
      exchangeResult: null
    },
    mounted(){
      fetch('https://api.exchangeratesapi.io/latest')
      .then(res => res.json())
      .then(res => this.rates = res.rates)
    },
    methods: {
      calcFromEuros(e){
        e.preventDefault()
        let rate = this.rates[this.selectedCurrency]
        this.fromEurosResult = (this.euroValue * rate).toFixed(2)
        this.euroValue = null
      },
      calcToEuros(e){
        e.preventDefault()
        let rate = this.rates[this.selectedCurrency]
        this.toEurosResult = (this.currencyValue / rate).toFixed(2)
        this.currencyValue = null
      },
      calcExchange(e){
        e.preventDefault()
        this.exchangeResult = ((this.rates[this.toCurrency] / this.rates[this.baseCurrency]) * this.exchangeValue).toFixed(2)
        this.exchangeValue = null
      }
    }
  })


})

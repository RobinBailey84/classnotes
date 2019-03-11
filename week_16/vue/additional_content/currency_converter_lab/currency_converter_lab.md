# Currency Converter Lab

## Learning Objectives

- Practice setting up a Vue application
- Read data from an API
- Handle user interaction and practice business logic

### Brief

Today's task is to build a currency exchange calculator.

Use the data from [this url](https://api.exchangeratesapi.io/latest) to allow the user to convert from Euro to any of the listed currencies.

## MVP

The app should load the exchange rates when the page loads.

```
  mounted(){
    // ...
  }
```

Then, the user should be able to enter an integer - which must be greater than zero - and when a button is clicked, the amount should be converted to the target currency.

Make sure you appropriately format any currencies displayed to the user.

### Extensions

- Allow conversions from any of the other currencies back to the base currency (Euro).
- Style the app

### Advanced Extensions

- Allow cross-currency conversions - from non-base to non-base currencies. (e.g. from GBP to USD)

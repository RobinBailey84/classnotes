# Countries - Multi Components Lab

**Lab Duration: 180 mins**

### Learning Objectives

- Be able to create a Vue app with multiple components and templates

## Brief

Your task is to create an app that shows info for all the countries using multiple components. Use the [Countries API](https://restcountries.eu/rest/v2/all) to make a request to get the data.

### MVP

- Display a list of country names.
- Add a click event to the list item which should then render more detail about that country (name, capital, population).
- Use reusable components.


### Extensions

- Instead of rendering a list, populate a dropdown with all of the countries names.
- Add a change event to the select that renders information about the selected country.

### Advanced Extensions

- Add the countries flag and languages spoken in the country to the country detail component.
- Add a search bar to the page so that when a user enters the countries name the country detail component renders.  Try to achieve this without the user having to enter the whole name.


## Planning

Draw a diagram of your files, detailing:

- the data, props, components and methods for each component.
- the flow of data throughout the application.

**Expected Components for MVP**
- CountriesList
- ListComponent
- CountryDetail


**Expected Components for Extensions**
- CountrySelect
- CountryDetail

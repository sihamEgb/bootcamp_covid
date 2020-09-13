# Covis 19 Stats App 
### Pseudo Code and Feature Breakdown

## Submitted 
- Github
https://github.com/sihamEgb/bootcamp_covid
- Netlify
https://cranky-wing-6f3ff4.netlify.app/
- free text

## What is this app?
It is a Covid 19 statistic webapp.
,using multiple APIs
API for Covid 19 stats:
- https://about-corona.net/
API for countries in continents
- https://github.com/hengkiardo/restcountries
API for styling charts
- https://www.chartjs.org/
npm install chart.js --save

## Stuff I found Hard to Implement:

## Known Bugs

## My Review of this assignment


## My Pseudo Code 


### Different Functionalities
video Example of the functionalities
https://www.youtube.com/watch?v=vFHQOUn4ie4&feature=youtu.be&ab_channel=PinchasHodadad

1. We want the ability for the user to choose statistics between continents

2. The statistics we want from each country is the following:
- Confirmed Cases
- Number of Deaths
- Number of recovered
- Number of critical condition
We want the ability to choose what statistics we want to see and display them
on a graph.

3. When you click on a specific continent, you also have the ability to choose
an individual countries statistics of that particular continent. Stats should
include at least the following:
- total cases
- new cases
- total deaths
- new deaths
- total recovered
- in critical condition

### Things that should be in HTML
-  logo
- header 
- graph area
- actions area
	- - specefic data
	- - by continent
- list of countries area

- footer

### Things that should be generated in js

get all regions => local storage
divide countries by regions => local storage

get data by country
get data by regions => iterate over all counties in regions + LOADING page until calculation is done
console.log("hello world");

const basePoint = `http://openweathermap.org/img/wn/`;
const proxy = `https://cors-anywhere.herokuapp.com/`;
//const proxy = 'https://api.allorigins.win/raw?url='; 

const coronaAPIBasePoint = 'http://corona-api.com/countries/'
const countriesByRegion = {};
const WORLD_WIDE = 'worldwide';
const CONTINENT = 'continent';
const OTHER = 'other';
let regionsObj = {
	// 'Africa': [],
	// 'Asia':[],
	// 'Europe':[],
};
// all countries array

let allCountries = [];
// all data fields for each country
const dataPerCountry = ['total cases','new cases','total deaths','new deaths','total recovered','in critical condition'];
// all data fields for each continent
const dataPerRegion = ['Confirmed cases','Number of Deaths','Number of recovered','Number of critical condition'];
//['Africa','Asia','Europe','North America','South America','Antarctica','Oceania'];
// local storage keys
const REGIONS = "regions";
// What I Do
startApp();

// How I Do it
function startApp(){
		// getAllCountries();
		const region = 'africa';
		const countryCode = 'IS';
		initAllCountries();
		addRegionButtons();
		// drawChart('Asia');
	// 	getCountryByRegion(WORLD_WIDE);
	// try{
	// }catch(err){
	// 	console.log(err);
	// }
}

/**
 * 
 *  DOM FUNCTIONS
 * 
 **/

function drawChart2(){
	var ctx = document.getElementById('myChart').getContext('2d');
	console.log("in draw chart function",ctx);
	var myChart = new Chart(ctx, {
			type: 'bar',
			data: {
					labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
					datasets: [{
							label: '# of Votes',
							data: [12, 19, 3, 5, 2, 3],
							backgroundColor: [
									'rgba(255, 99, 132, 0.2)',
									'rgba(54, 162, 235, 0.2)',
									'rgba(255, 206, 86, 0.2)',
									'rgba(75, 192, 192, 0.2)',
									'rgba(153, 102, 255, 0.2)',
									'rgba(255, 159, 64, 0.2)'
							],
							borderColor: [
									'rgba(255, 99, 132, 1)',
									'rgba(54, 162, 235, 1)',
									'rgba(255, 206, 86, 1)',
									'rgba(75, 192, 192, 1)',
									'rgba(153, 102, 255, 1)',
									'rgba(255, 159, 64, 1)'
							],
							borderWidth: 1
					}]
			},
			options: {
					scales: {
							yAxes: [{
									ticks: {
											beginAtZero: true
									}
							}]
					}
			}
	});
 }

function drawChart(region , dataType = dataPerRegion[0] ){
	var ctx = document.getElementById('myChart').getContext('2d');
	console.log("in draw chart function",ctx);
	// variables for the chart
	// chart type
	const chartType = 'bar';
	// data for X axis
	const countries = regionsObj[region];
	// label - name of data
	const labelName = dataType;
	// actual data for Y axis
	const dataPerCountry = getAllDataByRegion(region);
	const customDataPErCountry = dataPerRegion.map(data => data.confirmed);
	// [12, 19, 3, 5, 2, 3];
	var myChart = new Chart(ctx, {
			type: chartType,
			data: {
					labels: [...countries],
					datasets: [{
							label: labelName,
							data: customDataPErCountry,
					}]
			},
			options: {
					scales: {
							yAxes: [{
									ticks: {
											beginAtZero: true
									}
							}]
					}
			}
	});

}
function handleCountry(e){
	console.log(e.currentTarget);
	const country = e.target.dataset.country;
	const countryCode = getCountryCodeByName(country);
	console.log(countryCode);
	const dataPromise = getCovidByCountry(countryCode).then(
		data => {
			console.log(data);
			createCountryData(data);
	});
}
function createButton(text,handler,dataAttribute , className){
	const button = document.createElement('button');
	button.innerHTML = text;
	button.classList.add(dataAttribute);
	if(className)
	{
		button.classList.add(className);
	}
	button.dataset[dataAttribute] = text;
	button.addEventListener('click',handler);
	return button;
}
function updateSelected(element){

	const parent = element.parentElement;
	for(let i=0;i<parent.children.length;i++)
	{
		parent.children[i].classList.remove('selected');
	}
}
function handleDataType(e){
	console.log(e.target);
	const dataType = e.target.dataset.subdata;
	updateSelected(e.target);
	e.target.classList.add('selected');
	console.log(dataType);

	// TODO refine chart to show only sub section of data
	// drawChart(region);
}
function createCountryData(data){
	const container = document.querySelector('.dataContainer');
	console.log('inside create country data');
	console.log(data);
	
	//dataPerCountry = ['total cases','new cases','total deaths','new deaths','total recovered','in critical condition'];
	// TODO in timeline or latest data??
	const confirmed = data.data.latest_data.confirmed;
	const newConfirmed = data.data.today.confirmed;
	const deaths = data.data.latest_data.deaths;
	const newDeaths = data.data.today.deaths;
	const recovered = data.data.latest_data.recovered;
	const critical = data.data.latest_data.critical;
	container.innerHTML = `confirmed: ${confirmed},
												${dataPerCountry[1]}: ${newConfirmed},
												deaths: ${deaths}, 
												${dataPerCountry[3]}: ${newDeaths},
												recovered: ${recovered}, 
												critical: ${critical}`


}
function handleRegion(e){
	console.log("button region",e.target.dataset.region);
	updateSelected(e.target);
	e.target.classList.add('selected');
	const container = document.querySelector('.countriesContainer');
	const region = e.target.dataset.region;
	const countriesArr = regionsObj[region];
	container.innerHTML = "";
	for(let i=0;i<countriesArr.length;i++)
	{
		console.log(countriesArr[i]);
		const myButton = createButton(countriesArr[i],handleCountry,'country');
		container.appendChild(myButton);
	}
	// TODO no need to load again!
	const dataTypeContainer = document.querySelector('.dataTypeContainer');
	dataTypeContainer.innerHTML = "";
	for(let i=0;i<dataPerRegion.length;i++)
	{
		let className = null;
		console.log(countriesArr[i]);
		if(i=== 0)
		{
			className = 'selected';
		}
		const myButton = createButton(dataPerRegion[i],handleDataType,'subdata',className);
		dataTypeContainer.appendChild(myButton);

	}	
	// TODO uncomment
	drawChart(region);
}
function addRegionButtons(){
	const container = document.querySelector('.continentsContainer');
	// add all regions
	Object.keys(regionsObj).forEach( key =>{
		// TODO remove this
		if(key === "")
		{
			key = OTHER;
		}
		// add default selected classes
		let className = null;
		// if(key === WORLD_WIDE)
		// {
		// 	className = "selected";
		// }
		const myButton = createButton(key,handleRegion,'region',className);
		container.appendChild(myButton);
		console.log("button added",myButton);
	});
	// add worldwide
	// const myButton = createButton(WORLD_WIDE,handleRegion,'region');
	// container.appendChild(myButton);
	// console.log("button added",myButton);
	
}
function handleErrorMessage(err){
	console.log("error message ",err);
}

// get all continents names
async function initAllCountries(){

	if(localStorage.getItem(WORLD_WIDE)){
		allCountries = JSON.parse(localStorage.getItem(WORLD_WIDE));
	}
	// init allCountries
	else
	{
		const url = `${proxy}https://restcountries.herokuapp.com/api/v1`;		
		const response = await fetch(url);
		const data = await response.json();
		console.log(data);
		for(let i=0;i<data.length;i++)
		{
			const countyObj = {
				name: data[i].name.common,
				region: data[i].region,
				code: data[i].cca2,
			}
			allCountries.push(countyObj);
		}
		const allCountriesObject = JSON.stringify(allCountries);
		localStorage.setItem(WORLD_WIDE,allCountriesObject);
	}

	console.log("Countries Object",allCountries);

	if(localStorage.getItem(REGIONS))
	{
		console.log("no need to call api");
		regionsObj = JSON.parse(localStorage.getItem(REGIONS));
		return;
	}
	else{
		// init allRegions objects with country arrays;
		regionsObj[WORLD_WIDE] = [];
		for(let i=0;i<allCountries.length;i++)
		{
			console.log(allCountries[i])
			let region = allCountries[i].region;
			if(region === "")
			{
				region = OTHER;
			}
			if(!regionsObj[region])
			{
				regionsObj[region] = [];
			}
			regionsObj[WORLD_WIDE].push(allCountries[i].name);
			regionsObj[region].push(allCountries[i].name);
		}
		const regionsObject = JSON.stringify(regionsObj);
		localStorage.setItem(REGIONS,regionsObject);
	}
	
}

function getCountryCodeByName(countryName){
	for(let i=0;i<allCountries.length;i++)
	{
		if(allCountries[i].name === countryName)
		{
			console.log("found country",allCountries[i].code);
			return allCountries[i].code;
		}
	}
	return null;
}
async function getCovidByCountry(countryCode){

	try{
		const url = `${proxy}${coronaAPIBasePoint}/${countryCode}`;
		console.log(url);
		const response = await fetch(url);
		const data = await response.json();
		return data;
	}catch(err){
		console.log(err);
	}
	
}
function getCustomData(data){
	const customData = {};
	//['Confirmed cases','Number of Deaths','Number of recovered','Number of critical condition'];

	customData[dataPerRegion[0]] = data.data.latest_data.confirmed;
	customData[dataPerRegion[1]] = data.data.latest_data.deaths;
	customData[dataPerRegion[2]] = data.data.latest_data.recovered;
	customData[dataPerRegion[3]] = data.data.latest_data.critical;
	return customData;
}
function getAllDataByRegion(region){
	console.log("in getAllDataByRegion");
	const dataArray = [];
	for(let i =0;i<regionsObj[region].length;i++)
	{
		const country = regionsObj[region][i];
		const countryCode = getCountryCodeByName(country);
		getCovidByCountry(countryCode).then(
			data =>
			{
				const customData = getCustomData(data);
				dataArray.push(customData);
			}
		);

	}

}

// get countries in continent
// url = `${proxy}https://restcountries.herokuapp.com/api/v1/region/${regionName}`


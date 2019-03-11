import Vue from 'vue';
import { GChart } from 'vue-google-charts';
import { map, sumBy, flatten, groupBy } from 'lodash';

document.addEventListener("DOMContentLoaded", () => {
	new Vue({
		el: "#app",
		components: {
			"gchart": GChart
		},
		data: {
			chartTypes: ["Column", "Bar", "Pie"],
			chartType: "ColumnChart",
			from: null,
			to: null,
			fuelMix: [],
			chartData: [],
			chartOptions: {
				width: 800,
				height: 240,
				title: 'Generation Mix for the GB power system',
				colors: ['#084887', '#f58a07', '#f9ab55', '#f7f5fb', '#909cc2', '#C1BB8F', '#A176BC']
			},
			filterFrom: null,
			filterTo: null
		},
		methods: {
			getData: function(url){
				fetch(url)
				.then(response => response.json())
				.then(json => {
					json.data.from ? this.handleSingleResponse(json) : this.handleMultipleResponse(json)
				})
				.then(() => {
					this.generateChartData();
				})
			},
			handleSingleResponse: function(json){
				this.from = new Date(json.data.from);
				this.to = new Date(json.data.to);
				this.fuelMix = json.data.generationmix;
			},
			handleMultipleResponse: function(json){
				this.from = new Date(this.filterFrom);
				this.to = new Date(this.filterTo);

				const fuelData = map(json.data, 'generationmix');

				//Turns our array of arrays of objects into one array of objects
				// e.g. [[{a: 1}, {b: 2}], [{c: 3}, {d: 4}}]] => [{a:1}, {b:2}, {c:3}, {d:4}]
				const flattenedFuelData = flatten(fuelData);

				//Groups all our data together as an object by property name
				// e.g. [{a:1}, {b:2}, {a: 3}, {b: 4}] => {a: [{a:1}, {a:3}], b: [{b:2}, {b:4}]}
				const groupedFuelData = groupBy(flattenedFuelData, 'fuel');

				const averagedFuelData = map(groupedFuelData, (array, fuelType) => {
					//sumBy allows us to reduce an array by a specific property
					const totalPercentage = sumBy(array, 'perc');
					const averagePercentage = (totalPercentage/array.length).toFixed(2);
					return {'fuel': fuelType, 'perc': parseInt(averagePercentage)}
				})
				this.fuelMix = averagedFuelData;
			},
			dateSearch: function(){
				this.loading = true;
				const url = `https://api.carbonintensity.org.uk/generation/${this.filterFrom}/${this.filterTo}`;
				this.getData(url);
			},
			generateChartData: function(){
				const chartData = map(this.fuelMix, mix => Object.values(mix))
				chartData[0] = Object.keys(this.fuelMix[0]);
				this.chartData = chartData;
			}
		},
		mounted: function() {
			this.getData("https://api.carbonintensity.org.uk/generation");
		}
	});
});

import Vue from 'vue';
import { GChart } from 'vue-google-charts';

document.addEventListener("DOMContentLoaded", () => {
	new Vue({
		el: "#app",
		components: {
			"gchart": GChart
		},
		data: {
			from: null,
			to: null,
			fuelMix: [],
			chartData: [],
			chartOptions: {
				width: 800,
				height: 240,
				title: 'Generation Mix for the GB power system',
				colors: ['#084887', '#f58a07', '#f9ab55', '#f7f5fb', '#909cc2', '#C1BB8F', '#A176BC']
			}
		},
		methods: {
			getData: function(){
				fetch("https://api.carbonintensity.org.uk/generation")
				.then(response => response.json())
				.then(json => {
					this.from = new Date(json.data.from);
					this.to = new Date(json.data.to);
					this.fuelMix = json.data.generationmix
				})
				.then(() => {
					this.generateChartData();
				})
			},
			generateChartData: function(){
				const chartData = this.fuelMix.map(mix => Object.values(mix));
				chartData[0] = Object.keys(this.fuelMix[0]);
				this.chartData = chartData;
			}
		},
		mounted: function() {
			this.getData();
		}
	});
});

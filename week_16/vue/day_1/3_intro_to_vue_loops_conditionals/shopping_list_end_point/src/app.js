import Vue from 'vue';

document.addEventListener('DOMContentLoaded', () => {
	new Vue({
		el: "#app",
		data: {
			items: [
				{name: "Milk", purchased: false},
				{name: "Cheese", purchased: true},
				{name: "Beans", purchased: false}
			],
			newItem: ""
		},
		methods: {
			saveNewItem(){
				this.items.push({
					name: this.newItem,
					purchased: false
				});
				this.newItem = '';
			},
			buyItem(index){
				this.items[index].purchased = true;
			}
		}
	});
});

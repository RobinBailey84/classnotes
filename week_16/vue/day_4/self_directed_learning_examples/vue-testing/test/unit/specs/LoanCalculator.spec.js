import Vue from 'vue';
import LoanCalculator from '@/components/LoanCalculator';

describe("LoanCalculator", () => {
	it("should perform the calculation correctly", () => {
		const Constructor = Vue.extend(LoanCalculator);
		const vm = new Constructor({ propsData: {salary: 30000} }).$mount();

		expect(vm.$el.textContent).to.be("You can afford a mortgage of £105000.");
	});
});

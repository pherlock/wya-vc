import { createVue } from '@tests/helper';
import Comp from '..';

describe('Component', () => {
	it('adds 1 + 2 to equal 3', () => {
		expect(typeof Comp).to.equal('object');
		expect(typeof Comp.data()).to.equal('object');
	});
});
import React from 'react';
import DevTools from '../DevTools';
import FusionAdapter from '../FusionAdapter';
import {shallow, mount, render} from 'enzyme';

it('Renders initial DevTools', () => {
	const wrapper = shallow(<DevTools storeAdapter={new FusionAdapter()}/>);
	const title = <h2>Flux DevTools</h2>;
	expect(wrapper.contains(title)).toEqual(true);
	expect(wrapper.find('.devtools-container').length).toEqual(1);
});

// TODO: better tests!

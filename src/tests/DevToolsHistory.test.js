import React from 'react';
import DevToolsHistory from '../components/DevToolsHistory';
import {shallow, mount, render} from 'enzyme';

describe('DevToolsHistory', () => {
	it('Renders empty History', () => {
		const wrapper = shallow(<DevToolsHistory historyItems={[]} onSelected={() => {
		}} selectedItemIndex={0}/>);
		const body = <div className="devtools-history"/>;
		expect(wrapper.contains(body)).toEqual(true);
		expect(wrapper.find('.devtools-state-item').length).toEqual(0); // no items
	});


	it('Renders some History', () => {

		const mockedHistory = [ {a:1}, {a:0} ];

		const wrapper = mount(<DevToolsHistory historyItems={mockedHistory} onSelected={() => {}} selectedItemIndex={0}/>);

		const stateItems = wrapper.find('.devtools-state-item');
		expect(stateItems.length).toEqual(2); // no items
		expect(stateItems.first().hasClass('selected')).toEqual(true);

	});

	it('Renders some History and clicks an item', () => {

		const mockedHistory = [ {a:1}, {a:0} ];

		const wrapper = mount(<DevToolsHistory historyItems={mockedHistory} onSelected={(index) => {
			expect(index).toEqual(1);
		}} selectedItemIndex={0}/>);

		wrapper.find('.devtools-state-item').last().simulate('click');
		wrapper.setProps({selectedItemIndex:1});
		wrapper.find('.devtools-state-item').last().hasClass('selected');
	})
});

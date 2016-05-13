import React from 'react';
import {
    shallow
} from 'enzyme';
import Tab from '../../src/components/Tab/Tab.js';

describe('Tab', () => {
    const wrapper = shallow(<Tab />);
    it('should renders', () => {
        expect(wrapper.type()).to.eql('div');
    });
    it('should contains a nav menu', () => {
        expect(wrapper.find('#myTab')).to.have.length(1);
    });
});
import React from 'react';
import {
    shallow
} from 'enzyme';

import Recommend from '../../src/components/Recommend/Recommend.js';

describe('Recommend', () => {
    it('should renders', () => {
        const wrapper = shallow(<Recommend />);
        expect(wrapper.type()).to.eql('div');
    });

});
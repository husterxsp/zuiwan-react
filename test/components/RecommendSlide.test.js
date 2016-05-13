import React from 'react';
import TestUtils from 'react-addons-test-utils';

import RecommendSlide from '../../src/components/Recommend/RecommendSlide/RecommendSlide.js';

function shallowRender(Component, props) {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Component {...props}/>);
    return renderer.getRenderOutput();
}

describe('RecommendSlide', () => {
    it('should render slide-old', () => {
        const slide = shallowRender(RecommendSlide, {
            slide: [],
            index: 0,
        });
        expect(slide.props.id).to.equal('slide-hold');
    });
});
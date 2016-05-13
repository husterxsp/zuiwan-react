import React from 'react';
import {
    Link
}
from 'react-router';
import './RecommendSlide.less';

export default class RecommendSlide extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let slide = this.props.slide;
        let slideIndex = this.props.index;
        const slideComps = slide.map(item =>
            <Link key={item.id} to={`/article/${item.id}`} style={{backgroundImage: `url(${item.article_img})`}}>
                <div className="content">
                    <div className="title">{item.article_title}</div>
                    <span><i className="icon-media"></i>{item.article_media_name}</span>
                    <span><i className="icon-topic"></i>{item.article_topic_name}</span>
                    <p>{item.article_intro}</p>
                </div>
            </Link>
        );
        const dotComps = [1, 2, 3].map((item, index) =>
            <span key={index} className={ slideIndex == index ? 'active' : '' }></span>
        );
        return (
            <div id="slide-hold">
                <div id="slide">
                    <div className="slideList">
                        {slideComps}
                    </div>
                    <div className="dot">
                    {dotComps}
                    </div>
                </div>
            </div>
        );
    }

}
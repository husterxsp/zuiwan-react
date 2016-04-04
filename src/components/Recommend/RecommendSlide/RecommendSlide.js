var React = require('react');
import {
    Link
}
from 'react-router'
import './RecommendSlide.less'

module.exports = React.createClass({

    render: function() {
        var slide = this.props.slide;
        var slideIndex = this.props.index;
        var slideComps = slide.map(function(item) {
            return (
                <Link key={item.id} to={'/article/'+item.id} style={{backgroundImage: 'url('+item.article_img+')'}}>
                    <div className="content">
                        <div className="title">{item.article_title}</div>
                        <span><i className="icon-media"></i>{item.article_media_name}</span>
                        <span><i className="icon-topic"></i>{item.article_topic_name}</span>
                        <p>{item.article_intro}</p>
                    </div>
                </Link>
            );
        });
        var dotComps = [1, 2, 3].map(function(item, index) {
            return (<span key={index} className={ slideIndex == index ? 'active' : '' }></span>);
        });
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

});
import React from 'react'
import {
    Link
}
from 'react-router'

import './Topic.less';

module.exports = React.createClass({

    getInitialState: function() {
        return {
            showLoading: true,
            topic: [],
        };
    },
    componentDidMount: function() {
        var that = this;
        $.get("/zuiwan-backend/index.php/topic/get_topic")
            .done(function(res) {
                that.setState({
                    showLoading: false,
                    topic: res
                });
                //隐藏加载gif
                $(".loading").hide();
            })
            .fail(function(res) {
                console.log(res);
            });
    },
    render: function() {
        var topic = this.state.topic;
        var topicComps = topic.map(function(item) {
            return <Link key={item.id} to={"/topic/"+item.id} style={{backgroundImage: 'url(' + item.topic_img + ')'}}>
                        <div className="content">
                            <div className="title">
                                <span className="title-h">{item.topic_name}</span>
                                <span><span className="number">{item.article_count}</span>篇</span>
                            </div>
                            <p>{item.topic_intro}</p>
                        </div>
                    </Link>
        });
        return (
            <div className="topicList">
                {topicComps}
            </div>
        )
    }

});
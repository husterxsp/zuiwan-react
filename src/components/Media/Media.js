import React from 'react'
import {
    Link
}
from 'react-router'

import './Media.less';


module.exports = React.createClass({

    getInitialState: function() {
        return {
            showLoading: true,
            media: [],
        };
    },
    componentDidMount: function() {
        var that = this;
        $.get("/zuiwan-backend/index.php/media/get_media")
            .done(function(res) {
                that.setState({
                    showLoading: false,
                    media: res
                });
                //隐藏加载gif
                $(".loading").hide();
            })
            .fail(function(res) {
                console.log(res);
            });
    },
    render: function() {
        var media = this.state.media;
        var mediaComps = media.map(function(item, i) {
            return (
                <li key={i}>
                    <Link to={"/media/"+item.id}>
                        <img className="media-logo" src={item.media_avatar} />
                        <div className="content">
                            <div className="title">{item.media_name}</div>
                            <div className="intro">{item.media_intro}</div>
                        </div>
                    </Link>
                </li>
            )
        });
        return (
            <ul className="media">
                {mediaComps}
            </ul>
        )
    }

});
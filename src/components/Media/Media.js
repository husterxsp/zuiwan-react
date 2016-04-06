import React from 'react';
import {
    Link
}
from 'react-router';
import './Media.less';

export default class Media extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoading: true,
            media: [],
        };
    }
    componentDidMount() {
        let that = this;
        $.get("http://zuiwant.com/zuiwan-backend/index.php/media/get_media")
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
    }
    render() {
        let media = this.state.media;
        let mediaComps = media.map((item, index) => {
            return (
                <li key={index}>
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

}
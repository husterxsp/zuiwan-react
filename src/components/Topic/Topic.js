import React from 'react';
import {
    Link
}
from 'react-router';
import './Topic.less';

export default class Topic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoading: true,
            topic: [],
        };
    }
    componentDidMount() {
        fetch('http://zuiwant.com/zuiwan-backend/index.php/topic/get_topic')
            .then((res) => {
                res.json().then((data) => {
                    this.setState({
                        showLoading: false,
                        topic: data
                    });
                    //隐藏加载gif
                    $('.loading').hide();
                });
            }, (res) => {
                console.log(res.status);
            })
    }
    render() {
        const topic = this.state.topic;
        const topicComps = topic.map(item =>
            <Link key={item.id} 
                to={"/topic/"+item.id} 
                style={{backgroundImage: `url(${item.topic_img})`}}>
                <div className="content">
                    <div className="title">
                        <span className="title-h">{item.topic_name}</span>
                        <span><span className="number">{item.article_count}</span>篇</span>
                    </div>
                    <p>{item.topic_intro}</p>
                </div>
            </Link>
        );
        return (
            <div className="topicList">
                {topicComps}
            </div>
        )
    }

}
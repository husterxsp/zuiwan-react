import React from 'react';
import {
    Link
}
from 'react-router';
import './TopicDetail.less';

export default class TopicDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoading: true,
            topicInfo: {
                article_count: 2,
                articles: [],
                topic_img: "",
                topic_intro: "",
                topic_name: "",
            }
        };
    }
    componentDidMount() {
        let that = this;
        $.get("http://zuiwant.com/zuiwan-backend/index.php/topic/get_one_topic", {
                id: that.props.params.id
            })
            .done(function(res) {
                that.setState({
                    showLoading: false,
                    topicInfo: res
                });
                //隐藏加载gif
                $(".loading").hide();
            })
            .fail(function(res) {
                console.log(res);
            });
    }
    render() {
        let topicInfo = this.state.topicInfo;
        let articleComps = topicInfo.articles.map((item) => {
            return (
                <div className="topic-article" key={item.id}>
                    <Link to={'/article/'+item.id} className="title-image" style={{backgroundImage: 'url('+item.article_img+')'}}>
                        <div className="title-content">
                            <div className="article-title">{item.article_title}</div>
                            <div className="topic-name"><i className="icon-topic"></i>{topicInfo.topic_name}</div>
                        </div>
                    </Link>
                    <div className="topic-media"><i className="icon-media"></i>{item.article_media_name}</div>
                    <div className="topic-content">
                        <div className="date">
                            <div className="day">{}</div>
                            <div className="month">{}</div>
                        </div>
                        <div className="summary"><p>{item.article_intro}</p></div>
                    </div>
                </div>
            )
        });
        return (
            <div className="topic-detail">
        <div className="topic-intro" style={{backgroundImage: 'url('+topicInfo.topic_img+')'}}>
                    <div className="intro-content">
                        <div className="title">{topicInfo.topic_name}</div>
                        <p>{topicInfo.topic_intro}</p>
                        <div className="article-num"><span className="number">{topicInfo.article_count}</span>篇</div>
                    </div>
                </div>
                {articleComps}
            </div>
        );
    }

}
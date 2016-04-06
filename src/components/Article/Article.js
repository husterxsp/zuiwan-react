import React from 'react';
import {
    Link
}
from 'react-router';
import './Article.less';

export default class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            article: {
                article_author: "",
                article_content: "",
                article_img: "",
                article_title: "",
                create_time: "",
                is_focus: "",
                media: {
                    id: "",
                    media_avatar: "",
                    media_name: "",
                },
                topic: {
                    article_count: 0,
                    id: "",
                    topic_img: "",
                    topic_intro: "",
                    topic_name: "",
                }
            }
        }
    }
    componentDidMount() {
        let that = this;
        $.get("http://zuiwant.com/zuiwan-backend/index.php/article/get_one_article", {
                id: that.props.params.id
            })
            .done(function(res) {
                that.setState({
                    article: res
                });
                //隐藏加载gif
                $(".loading").hide();
            })
            .fail(function(res) {
                console.log(res);
            });
    }
    render() {
        let article = this.state.article;
        return (
            <div className="article">
                <div className="intro">
                    <img src={article.media.media_avatar}/>
                    <div className="media-author">
                        <div className="article-media">{article.media.media_name}</div>
                        <div className="article-author"><span>author</span><p>{article.article_author}</p></div>
                    </div>
                </div>
                <div className="article-img" style={{backgroundImage: 'url('+article.article_img+')'}}>
                </div>
                <div className="article-content">
                    <div className="date">{article.create_time}</div>
                    <div className="title">{article.article_title}</div>
                    <div className="content" dangerouslySetInnerHTML={{__html: article.article_content}}></div>
                </div>
                <div className="line"></div>
                <Link to={"/topic/"+article.topic.id} className="article-topic" style={{backgroundImage: 'url('+article.topic.topic_img+')'}}>
                    <div className="content">
                        <div className="title">
                            <span className="title-h">{article.topic.topic_name}</span>
                            <span><span className="number">{article.topic.article_count}</span>篇</span>
                        </div>
                        <p>{article.topic.topic_intro}</p>
                    </div>
                </Link>
            </div>
        );
    }

}
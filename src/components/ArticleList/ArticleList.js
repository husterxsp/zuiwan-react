import React from 'react';
import {
    Link
}
from 'react-router';
import './ArticleList.less';

export default class ArticleList extends React.Component {
    render() {
        let list = this.props.list;
        let articleComps = list.map((item) => {
            return <Link key={item.id} to={"/article/"+item.id} className="articleItem" style={{backgroundImage: 'url(' + item.article_img + ')'}}>
                        <div className="article-content" style={{backgroundColor: item.article_color}}>
                            <p className="title">{item.article_title}</p>
                            <div className="type">
                                <div><i className="icon-media"></i>{item.article_media_name}</div>
                                <div><i className="icon-topic"></i>{item.article_topic_name}</div>
                            </div>
                        </div>
                    </Link>
        });
        return (
            <div style={{overflow: "hidden"}}>
                {articleComps}
            </div>
        )
    }

}
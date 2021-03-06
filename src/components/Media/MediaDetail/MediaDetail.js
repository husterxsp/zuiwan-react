import React from 'react';
import ArticleList from '../../ArticleList/ArticleList.js';
import './MediaDetail.less';

export default class MediaDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoading: true,
            mediaInfo: {
                article_count: 0,
                articles: [],
                fans_num: 0,
                is_focus: 0,
                media_avatar: '',
                media_intro: '',
                media_name: '',
            }
        };
    }
    componentDidMount() {
        $.get('http://zuiwant.com/zuiwan-backend/index.php/media/get_one_media', {
                id: this.props.params.id
            })
            .done(res => {
                this.setState({
                    showLoading: false,
                    mediaInfo: res,
                });
                //隐藏加载gif
                $('.loading').hide();
            })
            .fail(res => {
                console.log(res);
            });
    }
    render() {
        const mediaInfo = this.state.mediaInfo;
        return (
            <div className="media-detail">
                <div className="intro">
                    <div className="img" style={{backgroundImage: `url(${mediaInfo.media_avatar})`}}></div>
                    <div className="name">{mediaInfo.media_name}</div>
                    <p>{mediaInfo.media_intro}</p>
                    <div className="activity">
                        <div className="article-num">
                            <div className="circle">
                                <span>{mediaInfo.articles.length}</span>
                            </div>
                            <span>文章</span>
                        </div>
                        <div className="fans-num">
                            <div className="circle">
                                <span>{mediaInfo.fans_num}</span>
                            </div>
                            <span>粉丝</span>
                        </div>
                        <div className="focus">
                            <div className="circle">
                                <i className="icon-heart-empty"></i>
                            </div>
                            <span>关注</span>
                        </div>     
                    </div>
                </div>
                <ArticleList list={mediaInfo.articles}/>
            </div>
        );
    }

}
import React from 'react';
import {
    Link,
    History,
    router,
    context
}
from 'react-router';

import './Account.less';
import ArticleList from '../ArticleList/ArticleList.js';

export default class Account extends React.Component {
    static contextTypes = {
        router: React.PropTypes.func.isRequired
    }
    constructor(props) {
        super();
        this.state = {
            userInfo: {
                articles: [],
                medias: [],
                user_avatar: '',
                username: '',
            }
        };
    }
    getCookie(name) {
        let cookieName = encodeURIComponent(name) + '=';
        let cookieStart = document.cookie.indexOf(cookieName);
        let cookieValue = '';

        if (cookieStart > -1) {
            let cookieEnd = document.cookie.indexOf(';', cookieStart);
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
        }
        return cookieValue;
    }
    exit() {
        document.cookie = 'zw_username=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
        this.context.router.push('/me/login');
    }
    componentDidMount() {
        if (!this.getCookie('zw_username')) {
            console.log('test');
            this.context.router.push('/me/login');
            return;
        }
        $.get('/zuiwan-backend/index.php/user/get_detail')
            .done(res => {
                this.setState({
                    userInfo: res
                });
                //隐藏加载gif
                $('.loading').hide();
            }).fail(res => {
                console.log(res);
            });
    }
    render() {
        const userInfo = this.state.userInfo;
        const attentionComps = userInfo.medias.map((item, index) => (
            <li key={index}>
                <Link to={`/media/${item.id}`}>
                    <img src={item.media_avatar} alt="头像" />
                    <p>{item.media_name}</p>
                </Link>
            </li>
        ));

        const faviconURL = require('../../img/favicon.png');
        return (
            <div className="account">
                <div className="me">
                    <img className="avatar" src={faviconURL} />
                    <div className="name">{userInfo.username}</div>
                    <div className="exit" onClick={e => this.exit(e)}>退出</div>
                    <div className="mode"></div>
                    <a className="feedback" href="mailto:advice@sicun.org">意见吐槽</a>
                </div>
                <div className="attention">
                    <div className="title">
                        <i className="icon-heart-empty"></i>
                        <span>我关注的媒体</span>
                    </div>
                    <div className="scroll-list">
                        <ul className="attention-list" style={{width:`${9.78 * userInfo.medias.length}rem`}}>
                            {attentionComps}
                        </ul>
                    </div>
                </div>
                <div className="collect">
                    <div className="title">
                        <i className="icon-star-empty"></i>
                        <span>我收藏的文章</span>
                    </div>
                    <ArticleList list={userInfo.articles}/>
                </div>
            </div>
        );
    }

}
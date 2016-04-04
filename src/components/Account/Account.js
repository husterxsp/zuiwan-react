import React from 'react'
import {
    Link, History, router, context
}
from 'react-router'

import './Account.less';
import ArticleList from '../ArticleList/ArticleList.js'

module.exports = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {
            userInfo: {
                articles: [],
                medias: [],
                user_avatar: "",
                username: "",
            }
        }
    },
    get: function(name) {
        var cookieName = encodeURIComponent(name) + "=";
        var cookieStart = document.cookie.indexOf(cookieName);
        var cookieValue = "";

        if (cookieStart > -1) {
            var cookieEnd = document.cookie.indexOf(";", cookieStart);
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
        }
        return cookieValue;
    },
    exit: function() {
        document.cookie = 'zw_username=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
        this.context.router.push("/me/login")
    },
    componentDidMount: function() {
        if (!this.get("zw_username")) {
            this.context.router.push("/me/login")
        }
        var that = this;
        $.get("/zuiwan-backend/index.php/user/get_detail")
            .done(function(res) {
                that.setState({
                    userInfo: res
                });
                //隐藏加载gif
                $(".loading").hide();
            }).fail(function(res) {
                console.log(res);

            });
    },
    render: function() {
        var userInfo = this.state.userInfo;
        var attentionComps = userInfo.medias.map(function(item, index) {
            return (
                <li key={index}>
                    <Link to={'/media/'+item.id}>
                        <img src={item.media_avatar} alt="头像" />
                        <p>{item.media_name}</p>
                    </Link>
                </li>
            )
        });

        var faviconURL = require('../../img/favicon.png');
        return (
            <div className="account">
                <div className="me">
                    <img className="avatar" src={faviconURL} />
                    <div className="name">{userInfo.username}</div>
                    <div className="exit" onClick={this.exit}>退出</div>
                    <div className="mode"></div>
                    <a className="feedback" href="mailto:advice@sicun.org">意见吐槽</a>
                </div>
                <div className="attention">
                    <div className="title">
                        <i className="icon-heart-empty"></i>
                        <span>我关注的媒体</span>
                    </div>
                    <div className="scroll-list">
                        <ul className="attention-list" style={{width: (9.78 * userInfo.medias.length) + "rem"}}>
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

});
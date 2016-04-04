import React from 'react'
import ReactDOM from 'react-dom'
import {
    Router, Route, Redirect, browserHistory, IndexRoute, IndexRedirect, hashHistory
}
from 'react-router'

import Tab from './components/Tab/Tab.js'
import Recommend from './components/Recommend/Recommend.js'
import Topic from './components/Topic/Topic.js'
import TopicDetail from './components/Topic/TopicDetail/TopicDetail.js'
import Media from './components/Media/Media.js'
import MediaDetail from './components/Media/MediaDetail/MediaDetail.js'
import Account from './components/Account/Account.js'
import Login from './components/Login/Login.js'
import Register from './components/Register/Register.js'
import Article from './components/Article/Article.js'


import "./css/main.less";
import "./css/day.less";
import "./css/fontello.css";

function showLoading() {
    $(".loading").show();
}

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Tab}>
            <IndexRedirect to="recommend" />
            <Route path="recommend" component={Recommend} onEnter={showLoading}/>
            <Route path="topic" component={Topic} onEnter={showLoading}/>
            <Route path="media" component={Media} onEnter={showLoading}/>
            <Route path="me">
                <IndexRedirect to="account" />
                <Route path="account" onEnter={showLoading} component={Account}/>
                <Route path="login" component={Login} />
                <Route path="register" component={Register} />
            </Route>
        </Route>
        <Route path='topic/:id' component={TopicDetail} onEnter={showLoading}></Route>
        <Route path='media/:id' component={MediaDetail} onEnter={showLoading}></Route>
        <Route path='article/:id' component={Article} onEnter={showLoading}></Route>
    </Router>,
    document.getElementById('App')
)
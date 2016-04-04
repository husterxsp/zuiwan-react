import React from 'react'

var LinkedStateMixin = require('react/lib/LinkedStateMixin');
var md5 = require('md5');
var Link = require('react-router').Link;

import './Login.less'

module.exports = React.createClass({
    mixins: [LinkedStateMixin],
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {
            username: '',
            password: '',
        }
    },
    componentDidMount: function() {
        //隐藏加载gif
        $(".loading").hide();
    },
    login: function() {
        var that = this;
        $.post("/zuiwan-backend/index.php/user/login", {
                username: that.state.username,
                password: md5(that.state.password)
            })
            .done(function(res) {
                if (res.status == 1) {
                    that.context.router.push("/me/account");
                } else {
                    alert(res.message);
                }
            })
            .fail(function(res) {
                console.log(res);
            });
    },
    render: function() {
        return (
            <div className="login">
                <div className="login-content">
                    <div className="title">ZuiWan</div>
                    <input type="text" placeholder="邮箱" valueLink={this.linkState('username')}  />
                    <input type="password" placeholder="密码" valueLink={this.linkState('password')}/>
                    <div className="to-register"><Link to="/me/register">注册</Link></div>
                    <div className="login-button" onClick={this.login}>登录</div>
                </div>
            </div>
        );
    }

});
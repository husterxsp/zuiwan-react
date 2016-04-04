import React from 'react'

var LinkedStateMixin = require('react/lib/LinkedStateMixin');
var md5 = require('md5');

import './Register.less'

var Register = React.createClass({
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
    register: function() {
        var that = this;
        $.post("/zuiwan-backend/index.php/user/register", {
                username: that.state.username,
                password: md5(that.state.password)
            })
            .done(function(res) {
                if (res.status == 1) {
                    this.context.router.push("/me/account");
                } else {
                    alert(res.message);
                }
            })
            .fail(function(res) {
                console.log(res);
            });
    },
    render: function() {
        var faviconURL = require('../../img/favicon.png');
        return (
            <div className="register">
                <div className="register-content">
                    <div className="add-avatar">
                        <img src={faviconURL} alt="" />
                    </div>
                    <input type="text" placeholder="邮箱" valueLink={this.linkState('username')}/>
                    <input type="password" placeholder="密码" valueLink={this.linkState('password')}/>
                    <div className="register-button" onClick={this.register}>注册</div>
                </div>
            </div>
        );
    }

});

module.exports = Register;
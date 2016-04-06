import React from 'react';
import md5 from 'md5';
import {
    Link
}
from 'react-router';
import './Login.less';

export default class Login extends React.Component {
    static contextTypes = {
        router: React.PropTypes.func.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }
    handleChange(e) {
        // var type = e.target.name;
        // this.setState({
        //     type: e.target.value
        // });
        let newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }
    componentDidMount() {
        //隐藏加载gif
        $(".loading").hide();
    }
    login() {
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
            })
    }
    render() {
        return (
            <div className="login">
                <div className="login-content">
                    <div className="title">ZuiWan</div>
                    <input type="text" name="username" placeholder="邮箱" defaultValue={this.state.username} onChange={this.handleChange.bind(this)}  />
                    <input type="password" name="password" placeholder="密码" defaultValue={this.state.password} onChange={this.handleChange.bind(this)} />
                    <div className="to-register"><Link to="/me/register">注册</Link></div>
                    <div className="login-button" onClick={this.login.bind(this)}>登录</div>
                </div>
            </div>
        );
    }

}
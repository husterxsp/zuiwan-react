import React from 'react';
import md5 from 'md5';
import './Register.less';

export default class Register extends React.Component {
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
    componentDidMount() {
        //隐藏加载gif
        $('.loading').hide();
    }
    handleChange(e) {
        let newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }
    register() {
        $.post('/zuiwan-backend/index.php/user/register', {
                username: that.state.username,
                password: md5(that.state.password)
            })
            .done(res => {
                if (res.status == 1) {
                    this.context.router.push('/me/account');
                } else {
                    alert(res.message);
                }
            })
            .fail(res => {
                console.log(res);
            });
    }
    render() {
        const faviconURL = require('../../img/favicon.png');
        return (
            <div className="register">
                <div className="register-content">
                    <div className="add-avatar">
                        <img src={faviconURL} alt="" />
                    </div>
                    <input type="text" name="username" placeholder="邮箱" defaultValue={this.state.username} onChange={this.handleChange.bind(this)}  />
                    <input type="password" name="password" placeholder="密码" defaultValue={this.state.password} onChange={this.handleChange.bind(this)} />
                    <div className="register-button" onClick={this.register.bind(this)}>注册</div>
                </div>
            </div>
        );
    }

}
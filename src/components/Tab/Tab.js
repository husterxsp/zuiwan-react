import React from 'react';
import {
    Link
}
from 'react-router';
import './Tab.less';

export default class Tab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoading: true,
            hideTab: false,
            lastScrollTop: 0,
        };
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }
    handleScroll(e) {
        var scrollTop = e.srcElement.body.scrollTop;
        if (scrollTop > this.state.lastScrollTop) {
            this.setState({
                hideTab: true
            });
        } else {
            this.setState({
                hideTab: false
            });
        }
        this.setState({
            lastScrollTop: scrollTop
        });
    }
    render() {
        return (
            <div>
                {this.props.children}
                <div role="nav" id="myTab" className={this.state.hideTab ? 'hidden' : ''} >
                    <Link to="/recommend" activeClassName={"active"}><i className="icon-recommend"></i>推荐</Link>
                    <Link to="/topic" activeClassName={"active"}><i className="icon-topic"></i>专题</Link>
                    <Link to="/media" activeClassName={"active"}><i className="icon-media"></i>媒体</Link>
                    <Link to="/me" activeClassName={"active"}><i className="icon-user"></i>我</Link>
                </div>
            </div>
        );
    }
}
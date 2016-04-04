import React from 'react'
import {
    Link
}
from 'react-router'

import './Tab.less';

module.exports = React.createClass({

    getInitialState: function() {
        return {
            showLoading: true,
            hideTab: false,
            lastScrollTop: 0
        };
    },
    componentDidMount: function() {
        window.addEventListener('scroll', this.handleScroll);
    },
    componentWillUnmount: function() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    handleScroll: function(e) {
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
    },
    render: function() {
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
});
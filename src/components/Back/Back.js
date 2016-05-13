import React from 'react';
import './Back.less';

export default class Back extends React.Component {
    constructor(props) {
        super(props);
    }
    backHistory() {

    }
    render() {
        return (
            <div className="history-back" onClick={this.backHistory.bind(this)}>
                <i className="icon-back"></i>
            </div>
        );
    }
}
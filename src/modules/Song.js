import React, { Component } from 'react';

export default class Song extends Component {

    render() {
        return (
            <li>{this.props.data.title}</li>
        );
    }
}

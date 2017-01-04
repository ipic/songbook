import React, { Component } from 'react';
import songs from '../data/songs.json';


export default class Song extends Component {
    titleStyle = {
       textAlign: 'center'
    }
    constructor() {
        super();
        this.song = {}
    }

    getSongData() {
        for (let song of songs) {
            if (song.slug === this.props.params.slug) {
                this.song = song;
                this.song.text = this.song.text.replace(/\n/g, "<br />");
                break;
            }
        }
    }

    render() {
        this.getSongData();
        return (
            <div>
                <h1 style={this.titleStyle}>{this.song.title}</h1>
                <p style={this.textStyle} dangerouslySetInnerHTML={{__html: this.song.text}} />
            </div>
        );
    }
}

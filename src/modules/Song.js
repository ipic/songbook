import React, { Component } from 'react';
import songs from '../data/songs.json';


export default class Song extends Component {

    constructor() {
        super();
        this._song = {}
    }

    getSongData() {
        for (let song of songs) {
            if (song.slug === this.props.params.slug) {
                this._song = song;
                this._song.text.replace(/\n/g, "<br />");
                break;
            }
        }
    }

    render() {
        this.getSongData();
        return (
            <div>
                <h1>{this._song.title}</h1>
                <p>{this._song.text}</p>
            </div>
        );
    }
}

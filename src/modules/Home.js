import React, { Component } from 'react';
import { Link } from 'react-router';
import songs from '../data/songs.json';
import { List, ListItem } from 'material-ui';


export default class Home extends Component {
    state = {
        songs: songs
    }

	renderSongs() {
		return this.state.songs.map((song) => (
            <ListItem
                key={song.slug}
                containerElement={<Link to={"/" + song.slug} />}
                primaryText={song.title}
            />
        ));
	}

    render() {
        return (
            <List>
                {this.renderSongs()}
            </List>
        )
    }
}

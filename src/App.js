import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import injectTapEventPlugin from 'react-tap-event-plugin';
import songs from './data/songs.json';

injectTapEventPlugin();

export default class App extends Component {
    state = {
        songs: songs
    }

    appBarStyle = {
        'textAlign': 'center'
    }

	getSongs() {
		return this.state.songs;
	}

	renderSongs() {
		return this.getSongs().map((song) => (
			<ListItem key={song.slug} primaryText={song.title} />
		));
	}

	render() {
		return (
			<MuiThemeProvider>
                <div>
                    <AppBar showMenuIconButton={false} style={this.appBarStyle} title="Songbook"/>
                    <List>
                        {this.renderSongs()}
                    </List>
                </div>
			</MuiThemeProvider>
		);
	}
}

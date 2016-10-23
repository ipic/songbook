import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

import SongList from './SongList';

class Songbook extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar
                        showMenuIconButton={false}
                        title="Songbook"
                    />
                    <SongList />
                </div>
            </MuiThemeProvider>
        )
    }
}

export default Songbook;

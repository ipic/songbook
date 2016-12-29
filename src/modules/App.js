import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

export default class App extends Component {
    appBarStyle = {
        'textAlign': 'center'
    }

	render() {
		return (
			<MuiThemeProvider>
                <div>
                    <AppBar
                        showMenuIconButton={false}
                        style={this.appBarStyle}
                        title="Songbook"
                    />
                    {this.props.children}
                </div>
			</MuiThemeProvider>
		);
	}
}

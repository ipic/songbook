import React from 'react';
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import Data from './data/Data';


const MIN_SIZE = 2;
const iconStyle = {verticalAlign: 'middle'};
const textFieldStyle = {textAlign: 'center', width: '70%'};

var data = new Data();

/*
*/
export default class SongList extends React.Component {
    state = {
        rows: data.rows,
        resultsStyle: {}
    }

    _resetRows() {
        this.setState({rows: data.rows});
    }

    handleChange = (evt) => {
        if (evt.target.value.length > MIN_SIZE) {
            this.setState({rows: data.search(evt.target.value)});
        } else {
            this._resetRows();
        }
    }

    handleToggle = (event, toggled) => {
        event.preventDefault();
		this.setState({
			[event.target.name]: toggled,
		});
	}

    handleCellClick = (rowNumber, rowId) => {
        console.log('click')
    }

	render() {
		return (
            <div>
                <div id="test">
                    <FontIcon className="material-icons" style={iconStyle}>search</FontIcon>
                    <TextField hintText="Buscar" style={textFieldStyle} onChange={this.handleChange} />
                </div>
                <Table onCellClick={this.handleCellClick}>
                    <TableBody displayRowCheckbox={false}>
                    {this.state.rows.map( (row, index) => (
                        <TableRow key={row._id['$oid']} selected={row.selected}>
                            <TableRowColumn>{row.title}</TableRowColumn>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </div>
		)
	}
}

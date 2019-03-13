import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogForm from './dialogForm';
import Button from '@material-ui/core/Button';

import EditForm from './editForm';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	rightIcon: {
		marginLeft: theme.spacing.unit
	},
	grow: {
		flexGrow: 1,
	},
});

class EditRecord extends Component {

	state = {
        open: false,
        id: '',
        record: '',
        album: '',
        artist: '',
        date: '',
        imageUrl: ''
	}

	handleOpen = () => {
		const { value } = this.props;
		this.setState({
			...this.state,
            open: true,
            id: value.id,
            record: 0,
            album: value.album,
            artist: value.artist,
            date: value.date,
            imageUrl: value.imageUrl
        });                
	}

    // handle changes in the form inputs
    handleChange = (event) => {
        console.log('edit handleChange', event.target.value);
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value,
        });
    }
    
    onSubmit = (event) => {

        const { id, record, album, artist, date, imageUrl } = this.state;

        fetch("https://vv2qx5zqb7.execute-api.us-east-1.amazonaws.com/Dev", {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },   
            body: JSON.stringify({records: id, record, album, artist, date, imageUrl})
        });

        console.log('Submitted PUT update');

        this.handleClose();	
    }

	handleClose = () => {
		this.setState({
			open: false,
                id: '',
				record: '',
				album: '',
				artist: '',
				date: '',
				imageUrl: ''
		});
	}

		render() {
		    const { state, open } = this.state;
		return (
			<div>
				<Button color="primary" onClick={() => this.handleOpen(state)}>
					Edit
				</Button>
				<DialogForm
					open={open}
					dialogTitle={'Edit Action Card'}
					formId={'edit-action'}
					formFields={
						<EditForm
							handleChange={this.handleChange}
							newRecord={this.state}
							editMode={false}
						/>
					}
					onSubmit={this.onSubmit}
					handleClose={this.handleClose}
				/>
			</div>
		);
  }
}

EditRecord.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditRecord);
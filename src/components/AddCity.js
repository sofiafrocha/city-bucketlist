import React, { Component } from 'react';

class AddCity extends Component {
	// * Component Internal State
	state = {
		cityName: '',
	};

	// * Component Methods
	onChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.addCity(this.state.cityName);
		this.setState({
			cityName: '',
		});
	}

	// * Component Render Function
	render() {
		return (
			<form className="c-AddCity"
				onSubmit={ this.handleSubmit }>
				<input type="text"
					name="cityName" id="add"
					placeholder="Enter the name of a City"
					value={ this.state.cityName }
					onChange={ this.onChange }
				/>
			</form>
		);
	}
}

export default AddCity;
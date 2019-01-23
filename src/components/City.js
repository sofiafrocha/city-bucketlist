import React, { Component } from 'react';
import PropTypes from 'prop-types';

class City extends Component {
	// * Component Internal State
	state = {
		deleting: false,
	}

	// * Component CSS Class Functions
	componentClasses = () => {
		let result = 'c-City';

		if (this.props.night) {
			result += ' c-City--night';
		}

		if (this.state.deleting) {
			result += ' c-City--done';
		}

		return result;
	}

	weatherClasses = () => {
		if (this.props.weather) {
			return `c-City__weather icon ion-md-${this.props.weather}`;
		}
		return 'c-City__weather';
	}

	temperatureClasses = () => {
		if (this.props.temperature) {
			return `c-City__temperature`;
		}
		return `h-hide`;
	}

	// * Component Methods
	handleClick = () => {
		this.setState({
			deleting: true,
		});
		setTimeout(() => {
			this.props.removeCity(this.props.id);
		}, '250');
	}

	// * Component Render Function
	render() {
		return (
			<li className={ this.componentClasses() }
				onClick={ this.handleClick }>
				<h3 className="c-City__name">
					{ this.props.name }
				</h3>
				<i className={ this.weatherClasses() }></i>
				<span className={ this.temperatureClasses() }>
					{ this.props.temperature }º
				</span>
			</li>
		);
	}
}

// * Component Prop Types
City.propTypes = {
	name: PropTypes.string.isRequired,
	weather: PropTypes.string,
	temperature: PropTypes.number,
	night: PropTypes.bool,
	id: PropTypes.string.isRequired,
}

export default City;
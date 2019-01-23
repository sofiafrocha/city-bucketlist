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
			const weather = this.props.weather.toLowerCase();
			const isSunny = weather.indexOf('sunny') !== -1 || weather.indexOf('clear') !== -1;
			const isCloudy = weather.indexOf('clouds') !== -1;
			const isFoggy = weather === 'mist';
			const isRainy = weather.indexOf('drizzle') !== -1;

			if (isCloudy) {
				return `c-City__weather wi wi-cloudy`;
			} else if (isFoggy) {
				return `c-City__weather wi wi-fog`;
			} else if (isRainy) {
				return `c-City__weather wi wi-rain`;
			} else if (isSunny) {
				return `c-City__weather wi wi-day-sunny`;
			}
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
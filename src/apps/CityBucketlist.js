import React, { Component } from 'react';
import axios from 'axios';
import uuidv4 from 'uuid/v4';
import City from '../components/City';
import AddCity from '../components/AddCity';

const weatherAPIKey = process.env.OPEN_WEATHER_API_KEY;

class CityBucketlist extends Component {
	// * Component Internal State
	state = {
		cities: [
			/*
			{
				id: uuidv4(),
				name: 'London',
				weather: null,
				temperature: null,
				night: false,
			},
			{
				id: uuidv4(),
				name: 'Lisbon',
				weather: null,
				temperature: null,
				night: false,
			},
			{
				id: uuidv4(),
				name: 'Tokyo',
				weather: null,
				temperature: null,
				night: true,
			}
			*/
		]
	};

	// * Component Methods
	removeCity = (id) => {
		this.setState({
			cities: this.state.cities.filter((city) => {
				return city.id !== id;
			}),
		});
	}

	addCity = (name) => {
		const id = uuidv4();
		const newCity = {
			id,
			weather: null,
			temperature: null,
			night: false,
			name,
		}
		const newCities = this.state.cities.slice();
		newCities.push(newCity);
		this.setState({
			cities: newCities,
		});
		this.getWeatherAndTemperature(name, id);
	}

	getWeatherAndTemperature = (name, id) => {
		axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${weatherAPIKey}&units=metric`)
		.then((response) => {
			let temperature = response.data.main.temp;
			let weather = response.data.weather[0].main;
			let newCities = this.state.cities.slice();

			newCities.forEach((city) => {
				if (city.id === id) {
					city.temperature = temperature;
					city.weather = weather;
				}
			});

			this.setState({
				cities: newCities,
			});
		});
	}

	// * onMount
	componentDidMount() {
		this.state.cities.forEach((city) => {
			if (!city.temperature) {
				this.getWeatherAndTemperature(city.name, city.id);
			}
		});

		fetch('/api/firebase')
      		.then(response => response.json())
			.then(json => console.log('beep', json));
	}

	// * Component Render Function
	render() {
		return (
			<React.Fragment>
				<h2 className="c-Helper">
					Where would you like to go?
				</h2>

				<AddCity addCity={ this.addCity } />

				<ol className="c-CityList">
				{
					this.state.cities.map((city) => {
						return (
							<City
								key={ city.id }
								name={ city.name }
								weather={ city.weather }
								temperature={ city.temperature }
								night={ city.night }
								id={ city.id }
								removeCity={ this.removeCity }
							/>
						)
					})
				}
				</ol>
			</React.Fragment>
		);
	}
}

export default CityBucketlist;

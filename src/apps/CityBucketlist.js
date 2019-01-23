import React, { Component } from 'react';
import axios from 'axios';
import uuidv4 from 'uuid/v4';
import City from '../components/City';
import AddCity from '../components/AddCity';
import endpoints from '../../.env.js';

class CityBucketlist extends Component {
	// * Component Internal State
	state = {
		cities: [
			{
				id: uuidv4(),
				name: 'London',
				weather: 'rainy',
				temperature: 7,
				night: false,
			},
			{
				id: uuidv4(),
				name: 'Lisbon',
				weather: 'sunny',
				temperature: 12,
				night: false,
			},
			{
				id: uuidv4(),
				name: 'Tokyo',
				weather: 'cloud',
				temperature: 20,
				night: true,
			}
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
		this.getWeather(name, id);
	}

	getWeather = (name, id) => {
		console.log('gonna get the weather!');
	}

	// * onMount
	componentDidMount() {
		axios.get(endpoints.citiesIndex)
		.then((res) => {
			this.setState({
				// stuff will go there
			})
		});
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

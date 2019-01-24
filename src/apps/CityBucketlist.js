import React, { Component } from 'react';
import axios from 'axios';
import db from '../Firestore';
import City from '../components/City';
import AddCity from '../components/AddCity';

const weatherAPIKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

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
		db.collection('cities').doc(id).delete().then(function() {
			console.log("Document successfully deleted!");

			this.setState({
				cities: this.state.cities.filter((city) => {
					return city.id !== id;
				}),
			});
		}).catch(function(error) {
			console.error("Error removing document: ", error);
		});
	}

	addCityToState = (name, id) => {
		const newCity = {
			id,
			weather: null,
			temperature: null,
			night: false,
			name,
		}
		const newCities = this.state.cities.slice();
		newCities.unshift(newCity);
		this.setState({
			cities: newCities,
		});
		this.getWeatherAndTemperature(name, id);
	}

	addCityToServer = (name) => {
		const callback = this.addCityToState;

		db.collection('cities').add({
			name,
		})
		.then(function(docRef) {
			console.log("Document successfully written!", docRef.id);

			callback(name, docRef.id);
		})
		.catch(function(error) {
			console.error("Error writing document: ", error);
		});
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

		db.collection('cities').get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				const name = doc.data().name;
				const id = doc.id;

				console.log('here we go', doc.id);

				this.addCityToState(name, id);
			});
		});
	}

	// * Component Render Function
	render() {
		return (
			<React.Fragment>
				<h2 className="c-Helper">
					Where would you like to go?
				</h2>

				<AddCity addCity={ this.addCityToServer } />

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

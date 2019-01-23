import React, { Component } from 'react';
import City from '../components/City';

class CityBucketlist extends Component {
	state = {
		cities: [
			{
				id: 1,
				name: 'London',
				weather: 'rainy',
				temperature: 7,
				night: false,
			},
			{
				id: 2,
				name: 'Lisbon',
				weather: 'sunny',
				temperature: 12,
				night: false,
			},
			{
				id: 3,
				name: 'Tokyo',
				weather: 'cloud',
				temperature: 20,
				night: true,
			}
		]
	};

	// Component Methods
	removeCity = (id) => {
		this.setState({
			cities: this.state.cities.filter((city) => {
				return city.id !== id;
			}),
		});
	}

	render() {
		return (
			<React.Fragment>
				<h2 className="c-Helper">
					Where would you like to go?
				</h2>

				<form className="c-AddCity">
					<input type="text" name="add" id="add" placeholder="Enter the name of a City" />
				</form>

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

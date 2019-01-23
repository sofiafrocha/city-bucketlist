import React, { Component } from 'react';

class CityBucketlist extends Component {
	render() {
		return (
			<React.Fragment>
				<h2 class="c-Helper">
					Where would you like to go?
				</h2>

				<form class="c-AddCity">
					<input type="text" name="add" id="add" placeholder="Enter the name of a City" />
				</form>

				<ol class="c-CityList">
					<li class="c-City c-City--done">
						<h3 class="c-City__name">London</h3>
						<i class="c-City__weather icon ion-md-sunny"></i>
						<span class="c-City__temperature">34º</span>
					</li>
					<li class="c-City">
						<h3 class="c-City__name">Lisbon</h3>
						<i class="c-City__weather icon ion-md-cloud"></i>
						<span class="c-City__temperature">11º</span>
					</li>
					<li class="c-City c-City--night">
						<h3 class="c-City__name">Tokyo</h3>
						<i class="c-City__weather icon ion-md-moon"></i>
						<span class="c-City__temperature">16º</span>
					</li>
				</ol>
			</React.Fragment>
		);
	}
}

export default CityBucketlist;

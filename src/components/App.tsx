import { Component } from 'react';
import WeatherMain from './WeatherMain';
import Header from './Header';
import { cities } from '../constants/cities';

interface Props { };
interface State {
	currentCity: string;
}

class App extends Component<Props, State>{
	constructor(props: any) {
		super(props);
		this.state = {
			currentCity: cities[0]
		};
		this.handleChangeCity = this.handleChangeCity.bind(this)
	}
	
	handleChangeCity(currentCity: string) {		
		this.setState({currentCity})
	}

	render() {
		return (
			<div className="App">
				<Header changeCity={this.handleChangeCity} currentCity={this.state.currentCity} />
				<WeatherMain currentCity={this.state.currentCity} />
			</div>
		);
	}
}

export default App;
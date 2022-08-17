import { Component } from 'react';
import WeatherMain from './WeatherMain';
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
	}
	
	changeCity(e: any) {
		const target = e.target;
		const currentCity = target.textContent;
		this.setState({currentCity})
	}

	render() {
		return (
			<div className="App">
				<header>
					{cities.map((city: string) => {
						const cityClassName = city === this.state.currentCity 
							? 'App--cities App--citiesCurrent' 
							: 'App--cities';
						return (
							<span 
								key={city} 
								className={cityClassName}
								onClick={e => this.changeCity(e)}>
								{city}
							</span>
						)
					})}
				</header>

				<WeatherMain currentCity={this.state.currentCity} />
			</div>
		);
	}
}

export default App;
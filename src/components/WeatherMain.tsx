import { Component } from 'react';
import { API, APIKEY } from '../config';
import { WeatherData } from '../types';
import { createWeatherData } from '../utils/dateConverter';
import WeatherDisplay from './WeatherDisplay';


interface Props {
    currentCity: string
}

interface State {
	loading: boolean;
	weatherData?: Array<WeatherData>;
}

export default class WeatherMain extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			loading: true,
			weatherData: undefined
		};
	}

	getCurrentWeather(): void {
		const { currentCity } = this.props;	

		fetch(`${API}?q=${currentCity}&units=metric&APPID=${APIKEY}`)
			.then(res => res.json())
			.then(data => {
				const weatherData = createWeatherData(data.list);
				this.setState({ weatherData, loading: false });
			})
			.catch(err => console.log(err));
	}

	componentDidMount() {
		this.getCurrentWeather();
	}
	componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>): void {
		if (prevProps.currentCity !== this.props.currentCity) {
			this.setState({ ...prevState, loading: true });
			this.getCurrentWeather();
		}
	}

	render() {
		const loading = this.state.loading && <div className='loader'><img src='/loading.svg' alt='loading' /></div>;
		const weatherToday = this.state.weatherData?.length && <WeatherDisplay weatherData={this.state.weatherData.splice(0,1)} />;
		const forecastData = (this.state.weatherData?.length)  && this.state.weatherData.splice(1,4);
		const weatherForecast = forecastData && <WeatherDisplay weatherData={forecastData} />;

		return (
				<section className="weather">
					{loading}
					{!this.state.loading && <div className="weather weather-container">
							<div className="weather weather--today">
								{weatherToday}
							</div>
							<div className="weather weather--forecast">
								{weatherForecast}
							</div>
					</div>}
				</section>
		);
	}
}
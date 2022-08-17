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
		const loading = this.state.loading && <img src='/loading.svg' alt='loading' />;

		const weatherDisplay = !this.state.loading && this.state.weatherData && (
			<WeatherDisplay weatherData={this.state.weatherData} />
		);

		return (
			<>
				{loading}
				{weatherDisplay}
			</>
		);
	}
}
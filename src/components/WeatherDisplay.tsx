import { Component } from 'react';
import { ICON } from '../config';

import { WeatherData } from '../types';

interface Props {
	weatherData: Array<WeatherData>;
}

export default class WeatherDisplay extends Component<Props> {

    currentWeatherBlock(data: any) {
        const weatherData= data.Today
        const iconUrl = `${ICON}${weatherData.icon}@4x.png`
        return (
            <>
                <h3>Today</h3>
                <img src={iconUrl} alt="today weather" />
                <div>
                    <span>{weatherData.temp}</span>
                    <span>{weatherData.description}</span>
                </div>
            </>
        )
    }
	

	render() {
		const { weatherData } = this.props;
		const currentWeather = weatherData[0];
        const forecastWeather = weatherData.slice(1,5)

		return (
			<>
                {this.currentWeatherBlock(currentWeather)}
			</>
		);
	}
}
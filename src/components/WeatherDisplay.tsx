import { Component } from 'react';
import { ICON } from '../config';

import { WeatherData } from '../types';

interface Props {
	weatherData: Array<WeatherData>;
}

export default class WeatherDisplay extends Component<Props> {

    todayWeatherItem(data: any) {                
        const iconUrl = `${ICON}${data.icon}.svg`
        return (
            <div className='todayWeather todayWeather--main'>
                <h3>{data.day}</h3>
                <div className='todayWeather todayWeather--container'>
                    <img src={iconUrl} alt='today weather' />
                    <div className='todayWeather todayWeather--info'>
                        <div className='todayWeather todayWeather--temp'>{data.temp}&deg;</div>
                        <div className='todayWeather todayWeather--description'>{data.description}</div>
                    </div>
                </div>
            </div>
        )
    }

    forecatsWeatherItem(data: any) {        
        return (
            data.map((dayWeather: any, key: number) => {
                const iconUrl = `${ICON}${dayWeather.icon}.svg`
                return (
                    <div className='forecastWeather forecastWeather--main' key={key}>
                        <h2>{dayWeather.day}</h2>
                        <div className='forecastWeather forecastWeather--container'>
                            <img src={iconUrl} alt='forecast weather' />
                            <div className='forecastWeather forecastWeather--info'>
                                <div className='forecastWeather forecastWeather--temp'>{dayWeather.temp}&deg;</div>
                            </div>
                        </div>
                    </div>
                )
            })
            
        )
    }
	

	render() {
		const { weatherData } = this.props;
		if (weatherData[0].day === 'Today') {
            return this.todayWeatherItem(weatherData[0])
        }

		return this.forecatsWeatherItem(weatherData);
	}
}
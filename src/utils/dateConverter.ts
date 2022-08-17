const dateToWeekConvert = (time: number) => new Date(time * 1000).toLocaleDateString('en', { weekday: 'short', });

export const createWeatherData = (data: any) => {
    const weatherAllData: any = [];
    const checkingObj: any = {};
    let currentDay = '';

    data.forEach((item: any) => {
        const weekDay = dateToWeekConvert(item.dt);
        if (!currentDay) currentDay = weekDay;
        if (!checkingObj[weekDay] 
            && currentDay !== checkingObj[weekDay] 
            || !checkingObj['Today']) {
            const temp = item.main.temp.toFixed(0);
            const icon = item.weather[0].icon;
            const description = item.weather[0].main;
            const dayName = !checkingObj['Today'] ? 'Today' : weekDay;
            const weatherData = { [dayName]: { temp, icon, description }};
            weatherAllData.push(weatherData);
            checkingObj[dayName] = 1;
        }
    });

    return weatherAllData;
}

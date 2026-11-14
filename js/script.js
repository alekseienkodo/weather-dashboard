console.log('script.js підключено')
const forecast = [
    { day: 'Понеділок', temp: 10 },
    { day: 'Вівторок', temp: 13 },
    { day: 'Середа', temp: 7 },
    { day: 'Четвер', temp: 12 },
    { day: "П'ятниця", temp: 19 },
    { day: 'Субота', temp: 23 },
    { day: 'Неділя', temp: 27 },
];
// Перетворює градуси Цельсія на градуси Фаренгейта.
const toFahrenheit = c => c * 9 / 5 + 32;
// Виводить прогноз у консоль і позначає морозні дні.
function printForecast(days) {
    for (const entry of days) {
        const tempF = toFahrenheit(entry.temp).toFixed(1);
        let message = `${entry.day} — ${entry.temp} °C (${tempF} °F)`;

        if (entry.temp < 0) {
            message += ' — морозно';
        }

        console.log(message);
    }
}

printForecast(forecast);
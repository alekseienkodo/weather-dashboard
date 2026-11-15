console.log('script.js підключено')
const forecast = [
    { day: 'Понеділок', tempC: 10, description: 'Дощ' },
    { day: 'Вівторок', tempC: 13, description: 'Хмарно' },
    { day: 'Середа', tempC: 7, description: 'Злива' },
    { day: 'Четвер', tempC: 12, description: 'Ясно' },
    { day: "П'ятниця", tempC: 19, description: 'Хмарно' },
    { day: 'Субота', tempC: 23, description: 'Хмарно' },
    { day: 'Неділя', tempC: 27, description: 'Ясно' },
];
const listContainer = document.querySelector('#forecast');
// Перетворює градуси Цельсія на градуси Фаренгейта.
const toFahrenheit = c => c * 9 / 5 + 32;
// Виводить прогноз у консоль і позначає морозні дні.
function printForecast(days) {
    for (const entry of days) {
        const tempF = toFahrenheit(entry.tempC).toFixed(1);
        let message = `${entry.day} — ${entry.tempC} °C (${tempF} °F)`;

        if (entry.tempC < 0) {
            message += ' — морозно';
        }

        console.log(message);
    }
}

printForecast(forecast);
// Створює картки прогнозу й додає їх до сітки.
function renderForecast(days) {
    const cardsContainer = listContainer.querySelector('.cards');
    cardsContainer.replaceChildren();

    for (const entry of days) {
        const card = document.createElement('article');

        const title = document.createElement('h3');
        title.textContent = entry.day;

        const details = document.createElement('p');
        const temperature = document.createElement('strong');
        const sign = entry.tempC > 0 ? '+' : '';
        temperature.textContent = `${sign}${entry.tempC} °C`;

        details.append(temperature, document.createElement('br'), entry.description);
        card.append(title, details);
        
        card.dataset.tempC = entry.tempC;
        card.classList.add('card');
        temperature.classList.add('temperature');

        if (entry.tempC < 0) {
            card.classList.add('cold');
        } else if (entry.tempC < 20) {
            card.classList.add('mild');
        } else {
            card.classList.add('warm');
        }
        cardsContainer.append(card);
    }
    const avgTempElement = document.querySelector('#avg-temp');
    let totalTemp = 0;

    for (const entry of days) {
        totalTemp += entry.tempC;
    }

    const averageTemp = totalTemp / days.length;
    avgTempElement.textContent =
        `Середня температура за тиждень: ${averageTemp.toFixed(1).replace('.', ',')} °C`;
}

renderForecast(forecast);

const form = document.querySelector('#forecast-form');

const tempInput = form.elements.namedItem('tempC');
// Перевіряє діапазон температури під час введення.
tempInput.addEventListener('input', () => {
    const tempC = tempInput.valueAsNumber;

    if (tempC < -50 || tempC > 50) {
        tempInput.setCustomValidity('Температура поза реалістичним діапазоном');
    } else {
        tempInput.setCustomValidity('');
    }
});
// Додає запис до прогнозу без перезавантаження сторінки.
form.addEventListener('submit', event => {
    event.preventDefault();

    const day = form.elements.namedItem('day').value.trim();
    const tempC = Number(form.elements.namedItem('tempC').value);
    const description = form.elements.namedItem('description').value.trim();

    forecast.push({ day, tempC, description });
    renderForecast(forecast);
    form.reset();
});

const warmestDayButton = document.querySelector('#warmest-day-button');
const warmestDayResult = document.querySelector('#warmest-day-result');
// Знаходить і показує найтепліший день.
warmestDayButton.addEventListener('click', () => {
    let warmestDay = forecast[0];

    for (const entry of forecast) {
        if (entry.tempC > warmestDay.tempC) {
            warmestDay = entry;
        }
    }

    warmestDayResult.textContent = `Найтепліший день — ${warmestDay.day}`;
});
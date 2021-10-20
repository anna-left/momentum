let userLang, schortUserLang;
if (!userLang) {
    userLang = navigator.language || navigator.userLanguage;
}
if (!schortUserLang) {
    schortUserLang = userLang.slice(0, 2);
}

const userName = document.querySelector('.name');
const body = document.querySelector('body');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');

const city = document.querySelector('.city');
let timeOfDay;

const langSet = [{ lang: 'ru', wind: 'Скорость ветра', windUnits: 'м/с', humidity: 'Влажность', city: 'Минск', error: 'ошибка' },
{ lang: 'by', wind: 'Хуткасць ветру', windUnits: 'м/с', humidity: 'Вільготнасць', city: 'Мiнск', error: 'памылка' },
{ lang: 'en', wind: 'Wind', windUnits: 'm/s', humidity: 'Humidity', city: 'Minsk', error: 'error' }];

// let cities = [{ id: 121, name: 'г. Урюпинск' }, { id: 122, name: 'г. Париж' }, { id: 123, name: 'г. Москва' }, { id: 124, name: 'г. Штормград' }];
// let searchTerm = 'г. Москва';
// let cityId = cities.find(city => city.name === searchTerm).id
// console.log(cityId);

// ******************************
// установка начальных параметров
// ******************************
switch (schortUserLang) {
    case 'ru':
        userName.placeholder = "[Введите имя]";
        city.value = 'Минск';
        break;
    case 'by':
        userName.placeholder = "[Увядзіце імя]";
        city.value = 'Мiнск';
        break;
    default:
        userName.placeholder = "[Enter name]"
        city.value = 'Minsk';
        break;
}
// ****************************
// время суток
// ****************************
const arrGreeting = [{ time: 6, lang: 'ru', greet: 'Доброй ночи', timeOfDay: 'night' },
{ time: 12, lang: 'ru', greet: 'Доброе утро', timeOfDay: 'morning' },
{ time: 18, lang: 'ru', greet: 'Добрый день', timeOfDay: 'day' },
{ time: 24, lang: 'ru', greet: 'Добрый вечер', timeOfDay: 'evening' },
{ time: 6, lang: 'en', greet: 'Good night', timeOfDay: 'night' },
{ time: 12, lang: 'en', greet: 'Good morning', timeOfDay: 'morning' },
{ time: 18, lang: 'en', greet: 'Good afternoon', timeOfDay: 'day' },
{ time: 24, lang: 'en', greet: 'Good evening', timeOfDay: 'evening' },
{ time: 6, lang: 'by', greet: 'Доброй ночи', timeOfDay: 'night' },
{ time: 12, lang: 'by', greet: 'Добрай раніцы', timeOfDay: 'morning' },
{ time: 18, lang: 'by', greet: 'Добры дзень', timeOfDay: 'day' },
{ time: 24, lang: 'by', greet: 'Добры вечар', timeOfDay: 'evening' }];

function updateTime() {

    const myTime = document.getElementById('time');
    const myDate = document.querySelector('date');
    const greeting = document.querySelector('.greeting');

    let date = new Date();
    const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC' };
    const currentDate = date.toLocaleDateString(userLang, options);

    let hours = String(date.getHours()).padStart(2, "0");
    myTime.children[0].innerHTML = hours;

    let minutes = String(date.getMinutes()).padStart(2, "0");
    myTime.children[2].innerHTML = minutes;

    let seconds = String(date.getSeconds()).padStart(2, "0");
    myTime.children[4].innerHTML = seconds;

    myDate.innerHTML = currentDate;

    for (let i = 0; i < arrGreeting.length; i++) {
        const el = arrGreeting[i];
        if (el.lang === schortUserLang && hours < el.time) {
            greeting.innerText = el.greet;
            timeOfDay = el.timeOfDay;
            break;
        }
    }
}

setInterval(updateTime, 1000);
updateTime();

userName.addEventListener('change', () => { localStorage.setItem('userName', userName.value) });

function getLocalStorage() {
    if (localStorage.getItem('userName')) {
        userName.value = localStorage.getItem('userName');
    }
    if (localStorage.getItem('curCity')) {
        city.value = localStorage.getItem('curCity');
    }
}
window.addEventListener('DOMContentLoaded', getLocalStorage);

// ****************************
// слайдер фонового изображения
// ****************************

function getRandomArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

let curIndImg = getRandomArbitrary(1, 21);
changeImg();

function changeImg() {
    const img = new Image();
    const fileName = timeOfDay + "/" + String(curIndImg).padStart(2, "0");
    // const src = "url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${fileName}.jpg')";
    // const src1 = "url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/18.jpg')";
    // img.src = src;
    // img.onload = () => {
    //     body.style.backgroundImage = src;
    // };

    const src = "./assets/img/" + timeOfDay + "/" + String(curIndImg).padStart(2, "0") + '.jpg';
    img.src = src;
    img.onload = () => {
        body.style.backgroundImage = `url(${src})`;
    };
}

document.querySelector(".slide-prev").addEventListener("click", function (e) {
    curIndImg--;
    if (curIndImg === 0) curIndImg = 20;
    changeImg(curIndImg)
});

document.querySelector(".slide-next").addEventListener("click", function (e) {
    curIndImg++;
    if (curIndImg === 21) curIndImg = 1;
    changeImg(curIndImg)
});

// ****************************
// погода
// ****************************
async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${schortUserLang}&appid=245f0e84ab651e933a14b1d48e39eae1&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    let tWindUnits = langSet.find(e => e.lang === schortUserLang).windUnits;
    let tWind = langSet.find(e => e.lang === schortUserLang).wind;
    let tHumidity = langSet.find(e => e.lang === schortUserLang).humidity;


    if (data.code >= 400 && data.code <= 600) {
        let tError = langSet.find(e => e.lang === schortUserLang).error;
        weatherIcon.className = '';
        temperature.textContent = tError;
        weatherDescription.textContent = '';
        humidity.textContent = '';
        wind.textContent = '';
    }
    else {

        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        humidity.textContent = `${tHumidity}: ${data.main.humidity} %`;
        wind.textContent = `${tWind}: ${Math.round(data.wind.speed)} ${tWindUnits}`;
    }
}


function setCity() {
    getWeather();
    city.blur();
    localStorage.setItem('curCity', city.value);
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('change', setCity);
// https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=ru&appid=245f0e84ab651e933a14b1d48e39eae1&units=metric



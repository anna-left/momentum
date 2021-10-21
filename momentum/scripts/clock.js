let schortUserLang;
const userName = document.querySelector('.name');
const body = document.querySelector('body');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');

if (localStorage.getItem('schortUserLang')) {
    schortUserLang = localStorage.getItem('schortUserLang');
} else {
    if (!schortUserLang) {
        const userLang = navigator.language || navigator.userLanguage;
        schortUserLang = userLang.slice(0, 2);
    }
}

const city = document.querySelector('.city');
let timeOfDay;

const langSet = [{ lang: 'ru', wind: 'Скорость ветра', windUnits: 'м/с', humidity: 'Влажность', city: 'Минск', error: 'ошибка' },
{ lang: 'en', wind: 'Wind', windUnits: 'm/s', humidity: 'Humidity', city: 'Minsk', error: 'error' }];


function translationSettings() {
    if (schortUserLang === 'en') {
        const arrSet = ['time', 'date', 'greeting', 'quote', 'weather', 'player'];
        for (let i = 0; i < arrSet.length; i++) {
            const elForm = document.querySelector(`#form__${arrSet[i]}-label`);
            elForm.innerText = arrSet[i];
        }
        const tSet = ['Settings', 'Language', 'Photo source', 'Display:'];
        for (let i = 0; i < tSet.length; i++) {
            const elForm = document.querySelector(`.t${i}`);
            elForm.innerText = tSet[i];
        }
        userName.placeholder = "[Enter name]";
        document.querySelector('#tag').placeholder = "tag";

    } else {
        const arrSet = ['time', 'date', 'greeting', 'quote', 'weather', 'player'];
        const arrSetRu = ['время', 'дата', 'приветствие', 'цитата', 'погода', 'плеер'];
        for (let i = 0; i < arrSet.length; i++) {
            const elForm = document.querySelector(`#form__${arrSet[i]}-label`);
            elForm.innerText = arrSetRu[i];
        }
        const tSetRu = ['Настройки', 'Язык', 'Источник фото', 'Отображать:'];
        for (let i = 0; i < tSetRu.length; i++) {
            const elForm = document.querySelector(`.t${i}`);
            elForm.innerText = tSetRu[i];
        }
        userName.placeholder = "[Введите имя]";
        document.querySelector('#tag').placeholder = "тег";
    }
}


// ******************************
// установка начальных параметров
// ******************************
switch (schortUserLang) {
    case 'ru':
        userName.placeholder = "[Введите имя]";
        city.value = 'Минск';
        break;
    // case 'by':
    //     userName.placeholder = "[Увядзіце імя]";
    //     city.value = 'Мiнск';
    //     break;
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
{ time: 18, lang: 'ru', greet: 'Добрый день', timeOfDay: 'afternoon' },
{ time: 24, lang: 'ru', greet: 'Добрый вечер', timeOfDay: 'evening' },
{ time: 6, lang: 'en', greet: 'Good night', timeOfDay: 'night' },
{ time: 12, lang: 'en', greet: 'Good morning', timeOfDay: 'morning' },
{ time: 18, lang: 'en', greet: 'Good afternoon', timeOfDay: 'afternoon' },
{ time: 24, lang: 'en', greet: 'Good evening', timeOfDay: 'evening' }
];

function updateTime() {

    const myTime = document.getElementById('time');
    const myDate = document.querySelector('date');
    const greeting = document.querySelector('.greeting');

    let date = new Date();
    const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC' };
    const currentDate = date.toLocaleDateString(schortUserLang, options);

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


// ****************************
// слайдер фонового изображения
// ****************************

function getRandomArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


function changeImg() {

    if (document.querySelector('#GitHub').checked) {
        const img = new Image();
        const fileName = String(curIndImg).padStart(2, "0");

        const src = `https://raw.githubusercontent.com/anna-left/stage1-tasks/assets/images/${timeOfDay}/${fileName}.jpg`;

        img.src = src;
        img.onload = () => {
            body.style.backgroundImage = `url(${src})`;
        };
    } else if (document.querySelector('#Unsplash').checked) {
        let curTag = document.querySelector('#tag').value;
        if (!curTag) {
            curTag = timeOfDay;
        }
        const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${curTag}&client_id=IXRydqpLBebyu-wRT6-yOn38qX-nGiQsFGTRRTcDK6w`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const img = new Image();
                const src = data.urls.regular;
                img.src = src;
                img.onload = () => {
                    body.style.backgroundImage = `url(${src})`;
                };
            });
    }
    else if (document.querySelector('#Flickr').checked) {
        let curTag = document.querySelector('#tag').value;
        if (!curTag) {
            curTag = timeOfDay;
        }
        const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=8e7d2810e3378a8180845c690b076b3f&tags=${curTag}&per_page=100&page=1&format=json&nojsoncallback=1`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const sizeSuffix = 'b';
                const { server, id, secret } = data.photos.photo[curIndImg];
                const img = new Image();
                const src = `https://live.staticflickr.com/${server}/${id}_${secret}_${sizeSuffix}.jpg`;
                img.src = src;
                img.onload = () => {
                    body.style.backgroundImage = `url(${src})`;
                };
            });
    }
}

document.querySelector(".slide-prev").addEventListener("click", function (e) {
    curIndImg--;
    if (curIndImg === 0) curIndImg = 20;
    changeImg()
});

document.querySelector(".slide-next").addEventListener("click", function (e) {
    curIndImg++;
    if (curIndImg === 21) curIndImg = 1;
    changeImg()
});

// ****************************
// погода
// ****************************
async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${schortUserLang}&appid=245f0e84ab651e933a14b1d48e39eae1&units=metric`;
    try {

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

    } catch (err) {

        let tError = langSet.find(e => e.lang === schortUserLang).error;
        weatherIcon.className = '';
        temperature.textContent = tError;
        weatherDescription.textContent = '';
        humidity.textContent = '';
        wind.textContent = '';
    }
}

function setCity() {
    getWeather();
    city.blur();
    localStorage.setItem('city', city.value);
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('change', setCity);

function getLocalStorage() {
    if (localStorage.getItem('userName')) {
        userName.value = localStorage.getItem('userName');
    }
    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
    }
    if (localStorage.getItem('schortUserLang')) {
        schortUserLang = localStorage.getItem('schortUserLang');
    } else {
        if (!schortUserLang) {
            const userLang = navigator.language || navigator.userLanguage;
            schortUserLang = userLang.slice(0, 2);
        }
    }

    if (localStorage.getItem('GitHub')) {
        const curValue = (localStorage.getItem('GitHub') === 'true') ? true : false;
        document.querySelector('#GitHub').checked = curValue;
    }
    if (localStorage.getItem('Unsplash')) {
        const curValue = (localStorage.getItem('Unsplash') === 'true') ? true : false;
        document.querySelector('#Unsplash').checked = curValue;
    }
    if (localStorage.getItem('Flickr')) {
        const curValue = (localStorage.getItem('Flickr') === 'true') ? true : false;
        document.querySelector('#Flickr').checked = curValue;
    }
    if (document.querySelector('#GitHub').checked === false && document.querySelector('#Unsplash').checked === false && document.querySelector('#Flickr').checked === false) {
        document.querySelector('#GitHub').checked = true;
    }

    for (let i = 0; i < arrSet.length; i++) {
        const curElArr = `form__${arrSet[i]}`;
        const curElArrF = `#form__${arrSet[i]}`;
        const elForm = document.querySelector(curElArrF);
        if (localStorage.getItem(curElArr)) {
            const curValue = (localStorage.getItem(curElArr) === 'true') ? true : false;
            elForm.checked = curValue;
        } else {
            elForm.checked = true;
        }

        const el = document.querySelector(`#${arrSet[i]}`);
        if (elForm.checked) {
            el.classList.remove('invisible');
            el.classList.add('visible');
        } else {
            el.classList.remove('visible');
            el.classList.add('invisible');
        }
    }

    if (localStorage.getItem('tag')) {
        document.querySelector('#tag').value = localStorage.getItem('tag');
    }

}

window.addEventListener('DOMContentLoaded', function e() {
    getLocalStorage();
    translationSettings();
    setCity();
    updateTime();
    curIndImg = getRandomArbitrary(1, 21);
    changeImg();

    if (localStorage.getItem('schortUserLang')) {
        schortUserLang = localStorage.getItem('schortUserLang');
    }
    if (schortUserLang === 'en') {
        document.querySelector('#en').checked = "checked";
        document.querySelector('#ru').checked = "";
    } else {
        document.querySelector('#ru').checked = "checked";
        document.querySelector('#en').checked = "";
    }
    getObjQuotes();

    settingsFrm.classList.add('settings__form__no');
});

function saveLocalStorage() {
    localStorage.setItem('city', city.value);
    localStorage.setItem('userName', userName.value);
    localStorage.setItem('schortUserLang', schortUserLang);

    localStorage.setItem('GitHub', document.querySelector('#GitHub').checked);
    localStorage.setItem('Unsplash', document.querySelector('#Unsplash').checked);
    localStorage.setItem('Flickr', document.querySelector('#Flickr').checked);

    localStorage.setItem('form__time', document.querySelector('#form__time').checked);
    localStorage.setItem('form__date', document.querySelector('#form__date').checked);
    localStorage.setItem('form__greeting', document.querySelector('#form__greeting').checked);
    localStorage.setItem('form__quote', document.querySelector('#form__quote').checked);
    localStorage.setItem('form__weather', document.querySelector('#form__weather').checked);
    localStorage.setItem('form__player', document.querySelector('#form__player').checked);
}

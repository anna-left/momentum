let schortUserLang;
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


if (!schortUserLang) {
    const userLang = navigator.language || navigator.userLanguage;
    schortUserLang = userLang.slice(0, 2);
}
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
// translationSettings();


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

// function getLocalStorage() {
//     if (localStorage.getItem('userName')) {
//         userName.value = localStorage.getItem('userName');
//     }
//     if (localStorage.getItem('City')) {
//         city.value = localStorage.getItem('City');
//     }
// }
// window.addEventListener('DOMContentLoaded', getLocalStorage);

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
                // console.log(data.urls.regular)
            });
    }
    else if (document.querySelector('#Flickr').checked) {

    }


    // getLinkToImage();
    // function getLinkToImage() {
    //     const url = 'https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=IXRydqpLBebyu-wRT6-yOn38qX-nGiQsFGTRRTcDK6w';
    //     fetch(url)
    //         .then(res => res.json())
    //         .then(data => {
    //             const img = new Image();
    //             // const fileName = String(curIndImg).padStart(2, "0");
    //             const src = data.urls.regular;
    //             img.src = src;
    //             img.onload = () => {
    //                 body.style.backgroundImage = `url(${src})`;
    //             };
    //             console.log(data.urls.regular)
    //         });


    // }

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
    // localStorage.setItem('City', city.value);
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('change', setCity);

function getLocalStorage() {
    if (localStorage.getItem('userName')) {
        userName.value = localStorage.getItem('userName');
    }
    if (localStorage.getItem('City')) {
        city.value = localStorage.getItem('City');
    }
    if (localStorage.getItem('schortUserLang')) {
        schortUserLang = localStorage.getItem('schortUserLang');
    }
    if (localStorage.getItem('GitHub')) {
        document.querySelector('#GitHub').checked = localStorage.getItem('GitHub');
    }
    if (localStorage.getItem('Unsplash')) {
        document.querySelector('#Unsplash').checked = localStorage.getItem('Unsplash');
    }
    if (localStorage.getItem('Flickr')) {
        document.querySelector('#Flickr').checked = localStorage.getItem('Flickr');
    }

    if (localStorage.getItem('form__time')) {
        document.querySelector('#form__time').checked = localStorage.getItem('form__time');
    }
    if (localStorage.getItem('form__date')) {
        document.querySelector('#form__date').checked = localStorage.getItem('form__date');
    }
    if (localStorage.getItem('form__greeting')) {
        document.querySelector('#form__greeting').checked = localStorage.getItem('form__greeting');
    }
    if (localStorage.getItem('form__quote')) {
        document.querySelector('#form__quote').checked = localStorage.getItem('form__quote');
    }
    if (localStorage.getItem('form__weather')) {
        document.querySelector('#form__weather').checked = localStorage.getItem('form__weather');
    }
    if (localStorage.getItem('form__player')) {
        document.querySelector('#form__player').checked = localStorage.getItem('form__player');
    }

}

window.addEventListener('DOMContentLoaded', function e() {
    getLocalStorage();
    translationSettings();
    setCity();
    updateTime();
    if (schortUserLang === 'en') {
        document.querySelector('#en').checked = "checked";
        document.querySelector('#ru').checked = "";
    } else {
        document.querySelector('#ru').checked = "checked";
        document.querySelector('#en').checked = "";
    }

}

);


//window.addEventListener('beforeunload', saveLocalStorage());
function saveLocalStorage() {
    localStorage.setItem('City', city.value);
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

document.addEventListener('DOMContentLoaded', () => {
    'use strict'

    function pageInit() {
        const footer = document.querySelector('.footer');

        musicPlayer();
        weatherInfo();
        clockOut();
        dateOut();
        showGreeting();
        getQuotes(footer);
        listenerForBgChange();

    };

    pageInit();





    // page music player
    function showGreeting() {
        const playListMusic = ['night', 'morning', 'day', 'evening'];

        const player = document.querySelector('.player');
    }





    // page music player
    function musicPlayer() {
        const playListMusic = [
            {
                title: 'Aqua Caelestis',
                src: './assets/sounds/Aqua Caelestis.mp3',
                duration: '00:58'
            }, {
                title: 'River Flows In You',
                src: './assets/sounds/River Flows In You.mp3',
                duration: '03:50'
            },
            {
                title: 'Summer Wind',
                src: './assets/sounds/Summer Wind.mp3',
                duration: '05:05'
            },
            {
                title: 'Ennio Morricone',
                src: './assets/sounds/Ennio Morricone.mp3',
                duration: '05:03'
            }
        ]
        const player = document.querySelector('.player');
        const playerBtnsParrent = player.querySelector('.player-controls');
        const pageListSongs = player.querySelector('.play-list');

        drawMusicList(playListMusic, pageListSongs);

        listenerBtsPlayer(playerBtnsParrent, playListMusic, pageListSongs);
    }

    // draw list music songs
    function listenerBtsPlayer(playerBtnsParrent, playListMusic, pageListSongs) {
        const playBtn = playerBtnsParrent.querySelector('.play');
        const pagePlayer = addMusicPlayer(playListMusic[0]);
        const lengthSongs = playListMusic.length;
        let activeSong = 0;

        playerBtnsParrent.addEventListener('click', (e) => {
            let target = e.target;

            if (!target.classList.contains('player-icon')) return;

            if (target.classList.contains('play-prev')) {
                activeSong = changeActiveSongMark(activeSong, lengthSongs, 'prev');
            };

            if (target.classList.contains('play-next')) {
                activeSong = changeActiveSongMark(activeSong, lengthSongs, 'next');
            };


            if (target.classList.contains('pause')) {
                playBtn.classList.remove('pause');
                pagePlayer.pause();
            } else {
                playBtn.classList.add('pause');
                playSong(activeSong, playListMusic, pagePlayer, pageListSongs, playBtn);
            };
        })
    }

    // play song and add active class in list songs
    function playSong(activeSong, playListMusic, pagePlayer, pageListSongs) {
        const oldSrc = pagePlayer.getAttribute('src');
        const newSrc = playListMusic[activeSong].src;

        if (oldSrc !== newSrc) {
            pagePlayer.setAttribute('src', newSrc);

            pageListSongs.childNodes.forEach((element, ind) => {
                ind === activeSong
                    ? element.classList.add('item-active')
                    : element.classList.remove('item-active');
            });
        }

        pagePlayer.play();
    }

    // add music player to page
    function addMusicPlayer(firstMusic) {
        const audio = document.createElement('audio');
        audio.classList.add('page__player');
        audio.setAttribute('src', firstMusic.src);
        document.body.appendChild(audio);

        return document.querySelector('.page__player');
    }

    // change active index
    function changeActiveSongMark(activeSong, lengthSongs, direction = 'next') {
        let current = activeSong;

        direction === 'next'
            ? current++
            : current--;

        if (current > lengthSongs - 1) current = 0;
        if (current < 0) current = lengthSongs - 1;

        return current;
    }

    // draw list music songs
    function drawMusicList(playListMusic, musicList) {
        let stringOut = ''

        for (let i in playListMusic) {
            stringOut += `<li class="play-item">${playListMusic[i].title}</li>`;
        }

        musicList.innerHTML = stringOut;
    }

    // page weather info
    async function weatherInfo() {
        const weatherContainer = document.querySelector('.weather');
        const weatherInput = weatherContainer.querySelector('input[type="text"]');
        let weatherInfo = await getWeatherForCity(weatherContainer, 'Brest');

        drawWeather(weatherContainer, weatherInfo);

        weatherInput.addEventListener('change', async (e) => {
            let weatherInfo = await getWeatherForCity(weatherContainer, e.target.value);

            console.log(weatherInfo);

            drawWeather(weatherContainer, weatherInfo);
        })

    }

    // return info about weather for city
    async function getWeatherForCity(weatherContainer, city) {
        let responce = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=8e161825a316f5542ed49cc61f125f91&units=metric`)
            .then(data => data.json())
            .catch((error) => {
                console.log(error)
            });


        if (responce.cod === '404') {
            return { name: 'error', city, errorName: 'notInfo' };
        } else if (responce.cod === '400') {
            return { name: 'error', city, errorName: 'clear' };
        }

        return await responce;
    }

    // output weather info
    function drawWeather(weatherContainer, data) {
        const inputCity = weatherContainer.querySelector('.city');
        const weatherIcon = weatherContainer.querySelector('.weather-icon');
        const temperature = weatherContainer.querySelector('.temperature');
        const weatherDescription = weatherContainer.querySelector('.weather-description');
        const wind = weatherContainer.querySelector('.wind');
        const humidity = weatherContainer.querySelector('.humidity');
        const weatherError = weatherContainer.querySelector('.weather-error');

        weatherIcon.classList = 'weather-icon owf';

        if (data.name === 'error') {
            if (data.errorName === 'notInfo') {
                weatherError.textContent = `Error! city not found for '${data.city}'!`;

            } else {
                inputCity.placeholder = '[Enter sity]'
                weatherError.textContent = 'Error! Nothing to geocode for ""!';
            }

            temperature.textContent = '';
            weatherDescription.textContent = '';
            wind.textContent = '';
            humidity.textContent = '';
            return;
        }

        weatherError.textContent = '';
        inputCity.value = data.name
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = Math.floor(data.main.temp) + '°C';
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = 'Wind speed: ' + Math.floor(data.wind.speed) + ' m/s';
        humidity.textContent = 'Humidity: ' + data.main.humidity + '%';
    }

    // listener for slide button
    function drawNewQuote(quotes, outParent) {
        if (quotes === {}) return;

        const quoteText = outParent.querySelector('.quote');
        const authorQuote = outParent.querySelector('.author');

        let s = Math.floor(Math.random() * (1642 - 0 + 1)) + 0;

        quoteText.textContent = quotes[s].text;
        authorQuote.textContent = quotes[s].author;
    }

    // out current time
    function clockOut() {
        const watchOut = document.querySelector('.time');

        setInterval(() => updateTime(watchOut), 1000);
    }

    // update time
    function updateTime(out) {
        const date = new Date();

        const hour = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        out.textContent = `${checkDateValue(hour)}.${checkDateValue(minutes)}.${checkDateValue(seconds)}`;
    }

    // check need zero for value or not
    function checkDateValue(val) {
        return val > 9 ? val : '0' + val;
    }
    // out current date
    function dateOut() {
        const date = new Date();
        const dateOut = document.querySelector('.date');

        const day = date.toLocaleString('en-US', { day: 'numeric' });
        const dayWeek = date.toLocaleString('en-US', { weekday: 'long' });
        const month = date.toLocaleString('en-US', { month: 'long' });

        dateOut.textContent = `${dayWeek}, ${month} ${day}`
    }

    // listener for slide button
    function listenerForBgChange() {
        const body = document.querySelector('body');
        const slideBtnsParrent = document.querySelector('.slider-icons');
        let activeBg = 0;
        const bgImgs = ['bg.jpg', 'cat.jpg', 'car.jpg', 'bird.jpg', 'road.jpg'];
        const lenghtImgs = bgImgs.length;

        slideBtnsParrent.addEventListener('click', (e) => {
            let target = e.target;

            if (target.classList.contains('slider-icon')) {

                target.classList.contains('slide-prev')
                    ? activeBg--
                    : activeBg++;

                if (activeBg < 0) activeBg = lenghtImgs - 1;
                if (activeBg > lenghtImgs - 1) activeBg = 0;

                changeBg(body, bgImgs[activeBg]);
            }
        })
    }

    // change background image
    function changeBg(body, bgImgs) {
        body.style.backgroundImage = `url(./assets/img/${bgImgs})`;
        body.style.backgroundSize = 'cover';
    }

    // listener for btn to change quote
    function listenerQuotesBtn(data, footer) {
        const quoteBtn = document.querySelector('.change-quote');

        quoteBtn.addEventListener('click', () => {
            drawNewQuote(data, footer);
        });
    }

    // get obgect with quotes
    function getQuotes(footer) {
        fetch('https://type.fit/api/quotes')
            .then(data => data.json())
            .then(data => {
                drawNewQuote(data, footer);
                listenerQuotesBtn(data, footer);
            })
            .catch((error) => {
                console.log(error)
            });
    }
})
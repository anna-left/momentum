function musicPlayer() {
    const playListMusic = [
        {
            title: 'Ennio Morricone',
            src: './assets/sounds/Ennio Morricone.mp3',
        },
        {
            title: 'Aqua Caelestis',
            src: './assets/sounds/Aqua Caelestis.mp3',
        }, {
            title: 'River Flows In You',
            src: './assets/sounds/River Flows In You.mp3',
        },
        {
            title: 'Summer Wind',
            src: './assets/sounds/Summer Wind.mp3',
        }
    ]
    const playerBtnsParrent = player.querySelector('.player-controls');
    const pageListSongs = player.querySelector('.play-list');

    drawMusicList(playListMusic, pageListSongs);

    listenerBtsPlayer(playerBtnsParrent, playListMusic, pageListSongs);

}

function listenerBtsPlayer(playerBtnsParrent, playListMusic, pageListSongs) {
    const playBtn = playerBtnsParrent.querySelector('.play');
    const pagePlayer = addMusicPlayer(playListMusic[0]);

    const lengthSongs = playListMusic.length;
    let activeSong = 0;

    const volume = document.querySelector('#soundVolume');
    styleRangeUpdate(volume);
    volume.addEventListener('change', handleRangeUpdate);
    volume.addEventListener('mousemove', handleRangeUpdate);

    function handleRangeUpdate() {
        pagePlayer.volume = this.value;
        styleRangeUpdate(this);
    }

    function styleRangeUpdate(curElem) {
        const percent = 100 * (curElem.value - curElem.min) / (curElem.max - curElem.min);
    }

    const progress = player.querySelector('.duration-player');
    const progressBar = player.querySelector('#progress');


    function showTime(param) {
        let min = Math.round(param / 60);
        let sec = Math.round(param % 60);
        if (!sec) {
            return "00:00";
        }
        return String(min).padStart(2, "0") + ":" + String(sec).padStart(2, "0");
    }

    function handleProgress() {
        const percent = (pagePlayer.currentTime / pagePlayer.duration) * 100;
        progressBar.style.flexBasis = `${percent}%`;
        document.querySelector('#timer').innerText = showTime(pagePlayer.currentTime);
        document.querySelector('#duration').innerText = showTime(pagePlayer.duration);
    }

    function scrub(e) {
        const scrubTime = (e.offsetX / progress.offsetWidth) * pagePlayer.duration;
        pagePlayer.currentTime = scrubTime;
    }
    pagePlayer.addEventListener('timeupdate', handleProgress);

    let mousedown = false;
    progress.addEventListener('click', scrub);
    progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
    progress.addEventListener('mousedown', () => mousedown = true);
    progress.addEventListener('mouseup', () => mousedown = false);

    progressBar.addEventListener('input', function () {
        const value = this.value * 100;
        this.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${value}%, #B3B3B3 ${value}%, #B3B3B3 100%)`
    });

    document.querySelector(".progress-title").innerText = playListMusic[activeSong].title;

    playerBtnsParrent.addEventListener('click', (e) => {
        let target = e.target;

        if (!target.classList.contains('player-icon')) return;

        if (target.classList.contains('play-prev')) {
            activeSong = changeActiveSongMark(activeSong, lengthSongs, 'prev');
            document.querySelector(".progress-title").innerText = playListMusic[activeSong].title;
            progressBar.style.flexBasis = `0%`;
        };

        if (target.classList.contains('play-next')) {
            activeSong = changeActiveSongMark(activeSong, lengthSongs, 'next');
            document.querySelector(".progress-title").innerText = playListMusic[activeSong].title;
            progressBar.style.flexBasis = `0%`;
        };

        if (target.classList.contains('muteBtn')) {
            if (pagePlayer.volume > 0) {
                curVolume = pagePlayer.volume;
                pagePlayer.volume = 0;
                document.getElementById("muteButton").style.backgroundImage = "url(./assets/svg/mute__stop.svg)"
            } else {
                pagePlayer.volume = curVolume;
                document.getElementById("muteButton").style.backgroundImage = "url(./assets/svg/mute.svg)"
            }
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

function addMusicPlayer(firstMusic) {
    const audio = document.createElement('audio');
    audio.classList.add('page__player');
    audio.setAttribute('src', firstMusic.src);
    document.body.appendChild(audio);

    return document.querySelector('.page__player');
}

function playSong(activeSong, playListMusic, pagePlayer, pageListSongs) {
    const oldSrc = pagePlayer.getAttribute('src');
    const newSrc = playListMusic[activeSong].src;

    if (oldSrc !== newSrc) pagePlayer.setAttribute('src', newSrc);

    pageListSongs.childNodes.forEach((element, ind) => {
        ind === activeSong
            ? element.classList.add('item-active')
            : element.classList.remove('item-active');
    });
    pagePlayer.play();
}


function changeActiveSongMark(activeSong, lengthSongs, direction = 'next') {
    let current = activeSong;

    direction === 'next'
        ? current++
        : current--;

    if (current > lengthSongs - 1) current = 0;
    if (current < 0) current = lengthSongs - 1;

    return current;
}

function drawMusicList(playListMusic, musicList) {
    let stringOut = ''

    for (let i in playListMusic) {
        stringOut += `<li class="play-item">${playListMusic[i].title}</li>`;
    }

    musicList.innerHTML = stringOut;
}

musicPlayer();


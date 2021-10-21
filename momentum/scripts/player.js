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

    if (oldSrc !== newSrc) pagePlayer.setAttribute('src', newSrc);

    pageListSongs.childNodes.forEach((element, ind) => {
        ind === activeSong
            ? element.classList.add('item-active')
            : element.classList.remove('item-active');
    });
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

musicPlayer();
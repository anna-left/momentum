const settingsBtn = document.querySelector('.settings__button');
const settingsFrm = document.querySelector('.settings__form');
const settingsClose = document.querySelector('.settings__form-close');

settingsBtn.addEventListener('click', function (e) {
    settingsFrm.classList.remove('settings__form__no');
    settingsFrm.classList.add('settings__form__yes');
})

settingsClose.addEventListener('click', function (e) {
    settingsFrm.classList.remove('settings__form__yes');
    settingsFrm.classList.add('settings__form__no');
})

document.querySelector('#en').addEventListener("click", function (e) {
    schortUserLang = 'en';
    translationSettings();
    getWeather();
    updateTime();
    getObjQuotes();
    localStorage.setItem('schortUserLang', schortUserLang);

});

document.querySelector('#ru').addEventListener("click", function (e) {
    schortUserLang = 'ru';
    translationSettings();
    getWeather();
    updateTime();
    getObjQuotes();
    localStorage.setItem('schortUserLang', schortUserLang);
});

document.querySelector('#GitHub').addEventListener("click", function (e) {
    localStorage.setItem('GitHub', 'true');
    localStorage.setItem('Unsplash', 'false');
    localStorage.setItem('Flickr', 'false');
    changeImg();
});
document.querySelector('#Unsplash').addEventListener("click", function (e) {
    localStorage.setItem('GitHub', 'false');
    localStorage.setItem('Unsplash', 'true');
    localStorage.setItem('Flickr', 'false');

    changeImg();
});
document.querySelector('#Flickr').addEventListener("click", function (e) {
    localStorage.setItem('GitHub', 'false');
    localStorage.setItem('Unsplash', 'false');
    localStorage.setItem('Flickr', 'true');
    changeImg();
});

const arrSet = ['time', 'date', 'greeting', 'quote', 'weather', 'player'];

function saveСheck(curValue) {
    const elForm = document.querySelector(`#form__${curValue}`);
    localStorage.setItem(`form__${curValue}`, elForm.checked);
    const el = document.querySelector(`#${curValue}`);
    if (elForm.checked) {
        el.classList.remove('invisible');
        el.classList.add('visible');
    } else {
        el.classList.remove('visible');
        el.classList.add('invisible');
    }
}
function changeTag() {
    localStorage.setItem('tag', document.querySelector('#tag').value);
    changeImg();
}

document.querySelector('.settings__form-close').addEventListener('click', function (e) {
    settingsFrm.classList.remove('settings__form__yes');
    settingsFrm.classList.add('settings__form__no');
})
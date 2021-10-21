const settingsBtn = document.querySelector('.settings__button');
const settingsFrm = document.querySelector('.settings__form');

settingsFrm.classList.add('settings__form__no');

settingsBtn.addEventListener('click', function (e) {
    settingsFrm.classList.remove('settings__form__no');
    settingsFrm.classList.add('settings__form__yes');
})

document.querySelector('#en').addEventListener("click", function (e) {
    schortUserLang = 'en';
    translationSettings();
    getWeather();
    updateTime();
    getObjQuotes();


});

document.querySelector('#ru').addEventListener("click", function (e) {
    schortUserLang = 'ru';
    translationSettings();
    getWeather();
    updateTime();
    getObjQuotes();
});

let arrSet = ['time', 'date', 'greeting', 'quote', 'weather', 'player'];
for (let i = 0; i < arrSet.length; i++) {
    const elForm = document.querySelector(`#form__${arrSet[i]}`);
    elForm.addEventListener('click', function (e) {
        const el = document.querySelector(`#${arrSet[i]}`);
        if (elForm.checked) {
            el.classList.remove('invisible');
            el.classList.add('visible');
        } else {
            el.classList.remove('visible');
            el.classList.add('invisible');
        }
    })
}

document.querySelector('.settings__form-close').addEventListener('click', function (e) {
    settingsFrm.classList.remove('settings__form__yes');
    settingsFrm.classList.add('settings__form__no');
})
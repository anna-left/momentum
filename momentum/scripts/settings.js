const settingsBtn = document.querySelector('.settings__button');
const settingsFrm = document.querySelector('.settings__form');
const saveBtn = document.querySelector('#save');
const cancelBtn = document.querySelector('#cancel');

settingsFrm.classList.add('settings__form__no');

settingsBtn.addEventListener('click', function (e) {
    settingsFrm.classList.remove('settings__form__no');
    settingsFrm.classList.add('settings__form__yes');
})

function translationSettings(lang) {
    if (lang === 'en') {
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
    }
}

document.querySelector('#en').addEventListener("click", function (e) {
    translationSettings('en')
});

document.querySelector('#ru').addEventListener("click", function (e) {
    translationSettings('ru')
});

saveBtn.addEventListener('click', function (e) {
    settingsFrm.classList.remove('settings__form__yes');
    settingsFrm.classList.add('settings__form__no');

    let arrSet = ['time', 'date', 'greeting', 'quote', 'weather', 'player'];
    for (let i = 0; i < arrSet.length; i++) {
        const elForm = document.querySelector(`#form__${arrSet[i]}`);
        const el = document.querySelector(`#${arrSet[i]}`);
        if (elForm.checked) {
            el.classList.remove('invisible');
            el.classList.add('visible');
        } else {
            el.classList.remove('visible');
            el.classList.add('invisible');
        }
    }
    const selectedLang = 'en';
    if (document.querySelector('#ru').checked) {
        selectedLang = 'ru'
    }
    if (schortUserLang !== selectedLang) {
        schortUserLang = selectedLang;
        translate();
    }

})

function translate() {
    getWeather();
    const curLang = langSet.find(e => e.lang === schortUserLang);



}

cancelBtn.addEventListener('click', function (e) {
    settingsFrm.classList.remove('settings__form__yes');
    settingsFrm.classList.add('settings__form__no');
})
const settingsBtn = document.querySelector('.settings__button');
const settingsFrm = document.querySelector('.settings__form');
const saveBtn = document.querySelector('#save');
cancelBtn = document.querySelector('#cancel');

settingsFrm.classList.add('settings__form__no');

settingsBtn.addEventListener('click', function (e) {
    settingsFrm.classList.remove('settings__form__no');
    settingsFrm.classList.add('settings__form__yes');
})

saveBtn.addEventListener('click', function (e) {
    settingsFrm.classList.remove('settings__form__yes');
    settingsFrm.classList.add('settings__form__no');

    let arr = ['time', 'date', 'greeting', 'quote', 'weather', 'player'];
    for (let i = 0; i < arr.length; i++) {
        let elForm = document.querySelector(`#form__${arr[i]}`);
        let el = document.querySelector(`#${arr[i]}`);
        if (elForm.checked) {
            el.classList.remove('invisible');
            el.classList.add('visible');



        } else {
            // if (el.classList.contains('invisible')) {
            el.classList.remove('visible');
            el.classList.add('invisible');
            // }
        }
    }
    // const timeInput = document.querySelector('#time');
    // const dateInput = document.querySelector('#date');
    // const greetingInput = document.querySelector('#greeting');
    // const quoteInput = document.querySelector('#quote');
    // const weatherInput = document.querySelector('#weather');
    // const Input = document.querySelector('#');
    // const Input = document.querySelector('#');
    // const Input = document.querySelector('#');

})

cancelBtn.addEventListener('click', function (e) {
    settingsFrm.classList.remove('settings__form__yes');
    settingsFrm.classList.add('settings__form__no');
})
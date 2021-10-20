settingsBtn = document.querySelector('.settings__button');
settingsFrm = document.querySelector('.settings__form');

settingsFrm.classList.add('settings__form__no');

settingsBtn.addEventListener('click', function (e) {
    settingsFrm.classList.add('settings__form__yes');
    settingsFrm.classList.remove('settings__form__no');

})


document.getElementById("button__buy__now").addEventListener("click", function (e) {

    openForm = true;
    function closeForm() {
        document.querySelector('.overlay').classList.add('overlay__yes');
        document.querySelector('.overlay').classList.remove('overlay__no');
        document.querySelector('.book__tickets__form').classList.add('book__tickets__form__yes');
        document.querySelector('.book__tickets__form').classList.remove('book__tickets__form__no');
    }

    setTimeout(closeForm, 500);

});
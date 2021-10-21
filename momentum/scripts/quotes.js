const changeQuoteBtn = document.querySelector('.change-quote');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');

function eventChangeQuoteBtn(data) {

    changeQuoteBtn.addEventListener('click', () => {
        showNewQuote(data);
    });
}

function getObjQuotes() {

    let url = 'https://type.fit/api/quotes';
    if (schortUserLang === 'ru') {
        url = '../quotes_ru.json';
    }
    fetch(url)
        .then(data => data.json())
        .then(data => {
            showNewQuote(data);
            eventChangeQuoteBtn(data);
        })
        .catch((error) => {
            console.log(error)
        });
}

function showNewQuote(quotes, outParent) {
    if (quotes === {}) return;
    let randomNumber = getRandomArbitrary(1, 1200);
    quote.textContent = quotes[randomNumber].text;
    author.textContent = quotes[randomNumber].author;
}
getObjQuotes();

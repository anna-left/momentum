const changeQuoteBtn = document.querySelector('.change-quote');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');

function eventChangeQuoteBtn(data) {

    changeQuoteBtn.addEventListener('click', () => {
        showNewQuote(data);
    });
}

function getObjQuotes() {


    // const url = 'http://api.forismatic.com/api/1.0/';
    const url = 'https://type.fit/api/quotes';

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

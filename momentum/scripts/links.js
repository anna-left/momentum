// const links = [{ fav:, link:'chrome-search://local-ntp/local-ntp.html'}]
const linksBtn = document.querySelector('.links__form-btn');
const linksFrm = document.querySelector('.links__form');
const linksClose = document.querySelector('.links__form-close');
const linksEnter = document.querySelector('.links__form-enter');
const linksAdd = document.querySelector('.links__form-add');
const linksCancel = document.querySelector('.links__enter-cancel');
const linksOk = document.querySelector('.links__enter-ok');

let linksObj = [];

function makeInvisible(curBlock) {
    curBlock.classList.remove('visible');
    curBlock.classList.add('invisible');
    linksEnter.style.display = "none";
}

function makeVisible(curBlock) {
    curBlock.style.display = "flex";
    curBlock.classList.remove('invisible');
    curBlock.classList.add('visible');
}


function addLine(name, link) {

    var ol = document.querySelector(".links__form-list");
    var li = document.createElement("li");

    li.classList.add('links__form-li');

    var img = document.createElement("img");
    img.src = `http://www.google.com/s2/favicons?domain=${link}`;
    img.width = '16';
    img.height = '16';

    var a = document.createElement("a");
    a.appendChild(document.createTextNode(name));
    a.href = link;
    a.target = "_blank";
    a.classList.add('links__form-list-li-name');

    var div = document.createElement("div");
    div.classList.add('links__form-add-del');
    div.addEventListener('click', function (event) {
        let allLi = document.querySelectorAll('.links__form-add-del');
        for (let i = 0; i < allLi.length; i++) {
            if (allLi[i] === this) {
                linksObj.splice(i);
                let jsonLinks = JSON.stringify(linksObj);
                localStorage.setItem('links', jsonLinks);

                if (linksObj.length < 11) {
                    document.querySelector('.links__form-list').style.overflowY = 'none';
                }
                break;
            }

        }

        console.log(this.event)
        this.parentNode.remove();
    });

    li.appendChild(img);
    li.appendChild(a);
    li.appendChild(div);

    ol.appendChild(li);

    if (linksObj.length === 11) {
        document.querySelector('.links__form-list').style.overflowY = 'scroll';
    }
}

// открыть форму links
linksBtn.addEventListener('click', function (e) {
    // showList();

    makeInvisible(linksEnter);
    makeVisible(linksFrm);
})

// закрыть форму links
linksClose.addEventListener('click', function (e) {
    makeInvisible(linksFrm);
})

// открыть форму add
linksAdd.addEventListener('click', function (e) {
    document.querySelector('#links__name').value = '';
    document.querySelector('#links__link').value = '';
    makeInvisible(linksFrm);
    setTimeout(function () { makeVisible(linksEnter) }, 1000);
    // makeVisible(linksEnter);
})

// форма add - ок
linksOk.addEventListener('click', function (e) {
    if (document.querySelector('#links__link').value) {
        let name = document.querySelector('#links__name').value;
        let link = document.querySelector('#links__link').value;

        // добавим новую строку в массив, сохраним массив
        if (link.slice(0, 8) === 'https://') {
        } else if ((link.slice(0,) === 'http://')) { }
        else { link = 'https://' + link }
        linksObj.push({ link: link, name: name });
        let jsonLinks = JSON.stringify(linksObj);
        localStorage.setItem('links', jsonLinks);
        //добавим объект в форму
        addLine(name, link);
    }

    makeInvisible(linksFrm);
    makeVisible(linksFrm);

})

// форма add - cancel
linksCancel.addEventListener('click', function (e) {

    makeInvisible(linksEnter);
    makeVisible(linksFrm);
})

// linksAdd.addEventListener('click', function (e) {
//     linksEnter.style.display = "flex";
//     linksEnter.classList.remove('invisible');
//     linksEnter.classList.add('visible');
// })
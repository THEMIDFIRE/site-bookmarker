var siteName = document.getElementById('siteName');
var siteLink = document.getElementById('siteLink');

var addBtn = document.getElementById('addSite');

var sites = document.getElementById('saved');

var bookmarkList;

if (localStorage.getItem('bookmarks')) {
    bookmarkList = JSON.parse(localStorage.getItem('bookmarks'));
    display(bookmarkList);
} else {
    bookmarkList = []
}

function addSite() {
    var bookmarks = {
        name: siteName.value,
        link: siteLink.value
    };
    bookmarkList.push(bookmarks);
    display(bookmarkList);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarkList))
    console.log(bookmarks);
    clear();
}

function display() {
    var item = '';
    for (var i = 0; i < bookmarkList.length; i++) {
        item += `<tr>
                    <th>${i + 1}</th>
                    <td>${bookmarkList[i].name}</td>
                    <td>
                        <a href="${bookmarkList[i].link}" class="btn btn-secondary text-capitalize" target="_blank">
                            visit site <i class="fa-regular fa-eye"></i>
                        </a>
                    </td>
                    <td>
                        <button class="btn btn-danger text-capitalize" onclick="delProd(${i})">
                            remove
                            <i class="fa-solid fa-trash"></i> 
                        </button>
                    </td>
                </tr>`;
    }
    sites.innerHTML = item;
}

function delProd(delIndex) {
    bookmarkList.splice(delIndex, 1)
    localStorage.setItem('bookmarks', JSON.stringify(bookmarkList))
    display()
}

function clear() {
    siteName.value = null;
    siteLink.value = null;
}

function validateName() {
    var name = /^[a-zA-z]{4,20}/i;

    if (name.test(siteName.value)) {
        siteName.classList.add('is-valid')
        siteName.classList.remove('is-invalid')
        siteName.nextElementSibling.classList.add('d-none')
    } else {
        siteName.classList.remove('is-valid')
        siteName.classList.add('is-invalid')
        siteName.nextElementSibling.classList.remove('d-none')
    }
}
function validateLink() {
    var link = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;

    if (link.test(siteLink.value)) {
        siteLink.classList.add('is-valid')
        siteLink.classList.remove('is-invalid')
        siteLink.nextElementSibling.classList.add('d-none')
    } else {
        siteLink.classList.remove('is-valid')
        siteLink.classList.add('is-invalid')
        siteLink.nextElementSibling.classList.remove('d-none')
    }
}
require('./base.scss');

// documentation: https://randomuser.me/documentation#howto
const baseUrl = "https://randomuser.me/api/";
const contentNode = document.querySelector(".list");
const nationalityForm = document.querySelector(".nationality-form");
const searchForm = document.querySelector(".search-form");
const mainInfo = document.querySelector(".content__main-info");
let users = [];

contentNode.addEventListener('click', event => {	
    event.preventDefault();
    if (event.target.matches('.user')){
        selectUser(event.target.id);
    }
});

nationalityForm.addEventListener('change', event => {	
    event.preventDefault();
    fetchUsersNatMenu (event.target.value);
});

searchForm.addEventListener('submit', event => {	
    event.preventDefault();
    fetchUsersSearch (event.target[0].value);
});

function fetchUsersSearch (name){
    const url = `${baseUrl}?inc=name,location,cell,email,picture,id,dob&results=1000`;
    contentNode.innerHTML = `Checking for "${name}" in 5,000 records...`;
    return fetch(url)
    .then(response => response.json())
    .then(body => {
        users = body.results.filter(item => {
            return item.name.first.includes(name.toLowerCase()) || item.name.last.includes(name.toLowerCase())
        });
        contentNode.innerHTML = displayUsers(users, name);
    }).catch(error => console.log(error));
}

function fetchUsersNatMenu (nat){
    if (nat === "none") return;
    const url = `${baseUrl}?inc=name,location,cell,email,picture,id,dob&nat=${nat}&results=20`;
    contentNode.innerHTML = "Loading...";
    return fetch(url)
    .then(response => response.json())
    .then(body => {
        users = body.results;
        contentNode.innerHTML = displayUsers(users);
    }).catch(error => console.log(error));
}

function displayUsers (arr, name='') {
    return arr.map((item, index) => {
        let str = ``;
        str += (index === 0 || index % 2 === 0) ? `<article class="row">` : ``;
        str += 
        `<div class="column" href="#">
            <img id="${index}" class="user" src="${item.picture.medium}">
            <div id="${index}" class="column__username user">${highlight(item.name.first, name)} ${highlight(item.name.last, name)}</div>
        </div>`;
        str += (index === 0 || index % 2 === 0) ? `` : `</article>`;
        // highlight(item.name.first, name);
        return str;
    }).join('');
}

// highlights matched string from search
function highlight (string, chunk) {
    const str = string.toLowerCase();
    const ch = chunk.toLowerCase();
    return str.includes(ch) ? sentenceCase(string.replace(chunk, `<strong>${chunk}</strong>`)) : sentenceCase(string);
}

function selectUser (id) {
    mainInfo.innerHTML =
        `<div class="content__main-info-photo">
            <img src="${users[id].picture.large}">
            <h4>${sentenceCase(users[id].name.first)} ${sentenceCase(users[id].name.last)}</h4>
            <h5>DOB: ${users[id].dob.date}</h5>
          </div>
          <div class="content__main-info-contact">
            <ul>
              <li>
                <div>City</div>
                <div>${sentenceCase(users[id].location.city)}</div>
              </li>
              <li>
                <div>Cell</div>
                <div>${sentenceCase(users[id].cell)}</div>
              </li>
              <li>
                <div>E-mail</div>
                <div>${sentenceCase(users[id].email)}</div>
              </li>
            </ul>
          </div>`
}

// convert strings to sentence case
function sentenceCase (str) {
    return str
        .split(" ")
        .map(item => {
            const word = item.split("");
            word[0] = word[0].toUpperCase();
            return word.join("");
        }).join(" ");
}
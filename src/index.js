require('./base.scss');

// documentation: https://randomuser.me/documentation#howto
const baseUrl = "https://randomuser.me/api/";
const contentNode = document.querySelector(".list");
const nationalityForm = document.querySelector(".nationality-form");
const mainInfo = document.querySelector(".content__main-info");
let users = [];

nationalityForm.addEventListener('change', event => {	
    event.preventDefault();
    const nationality = event.target.value;
    fetchUsers (nationality);
});

function fetchUsers (nat){
    const url = `${baseUrl}?inc=name,location,cell,email,picture,id,dob&nat=${nat}&results=20`;
    return fetch(url)
    .then(response => response.json())
    .then(body => {
        users = body.results;
        contentNode.innerHTML = displayUsers(users);
        selectUser(0);
        contentNode.addEventListener('click', event => {	
            event.preventDefault();
            if (event.target.matches('.user')){
                selectUser(event.target.id);
            }
        });
    }).catch(error => console.log(error));
}

function displayUsers (arr) {
    return arr.map((item, index) => {
        let str = ``;
        str += (index === 0 || index % 2 === 0) ? `<article class="row">` : ``;
        str += 
        `<div class="column" href="#">
            <img id="${index}" class="user" src="${item.picture.medium}">
            <div id="${index}" class="column__username user">${sentenceCase(item.name.first)} ${sentenceCase(item.name.last)}</div>
        </div>`;
        str += (index === 0 || index % 2 === 0) ? `` : `</article>`;
        return str;
    }).join('');
}

function selectUser (id) {
    console.log(users[id])
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

fetchUsers ('GB');

// tools
function sentenceCase (str) {
    return str
        .split(" ")
        .map(item => {
            const word = item.split("");
            word[0] = word[0].toUpperCase();
            return word.join("");
        }).join(" ");
}
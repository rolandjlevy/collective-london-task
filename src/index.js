require('./base.scss');

// documentation: https://randomuser.me/documentation#howto
const baseUrl = "https://randomuser.me/api/";
const contentNode = document.querySelector(".list");
const form = document.querySelector(".nationality-form");

form.addEventListener('change', event => {	
    event.preventDefault();
    const nationality = event.target.value;
    fetchUsers (nationality);
});

function fetchUsers (nat){
    const url = `${baseUrl}?inc=name,location,email,picture,id,dob&nat=${nat}&results=10`;
    return fetch(url)
    .then(response => response.json())
    .then(users => { 
        contentNode.innerHTML = displayUsers(users.results);
    }).catch(error => console.log(error));
}

function displayUsers (arr) {
    return arr.map((item, index) => {
        let str = ``;
        str += (index === 0 || index % 2 === 0) ? `<article class="row">` : ``;
        str += 
        `<div class="column">
            <img src="${item.picture.medium}"> 
            <div class="column__username">${sentenceCase(item.name.first)} ${sentenceCase(item.name.last)}</div>
        </div>`;
        str += (index === 0 || index % 2 === 0) ? `` : `</article>`;
        // console.log(item.id.value);
        return str;
    }).join('');
}

fetchUsers ('GB');

function sentenceCase (str) {
    return str
        .split(" ")
        .map(item => {
            const word = item.split("");
            word[0] = word[0].toUpperCase();
            return word.join("");
        }).join(" ");
}
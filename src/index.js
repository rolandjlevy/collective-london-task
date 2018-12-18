// import sass iles
import './styles/base.scss';
import './styles/structure.scss';
import './styles/users.scss';
import './styles/keyframes.scss';

// import functions from JS files
import { openSidebar, animateUser } from './animations'
import { sentenceCase, getViewportSize } from './utilities';

// set up nodes
const usersList = document.querySelector(".users-list");
const mainInfo = document.querySelector(".content__main-info");
const sidebar = document.querySelector(".sidebar");
const sidebarClose = document.querySelector(".sidebar__close");
const sidebarPhoto = document.querySelector(".sidebar__user-photo");
const nationalityForm = document.querySelector(".nationality-form");
const menuIcon = document.querySelector(".content__header-menu");
const searchForm = document.querySelector(".search-form");

// global variables
const baseUrl = "https://randomuser.me/api/";
const maxResults = 20;
let usersArray = [];

// this fixes the bug of the sidemenu dissappearing in desktop view
window.addEventListener('resize', event => {
    if (getViewportSize() === 'desktop' && sidebar.style.display === "none") {
        sidebar.style.display = "initial";
    }
});

// close sidebar
sidebarClose.addEventListener('click', event => {
    event.preventDefault();
    sidebar.style.display = "none";
});

// open sidebar
menuIcon.addEventListener('click', event => {
    event.preventDefault();
    sidebar.style.display = "initial";
    openSidebar(sidebar)
});

// select user to load user's information
usersList.addEventListener('click', event => {
    event.preventDefault();
    if (event.target.matches('.user')) {
        selectUser(event.target.id);
        animateUser(mainInfo, sidebarPhoto)
    }
});

// fetch 20 users based on nationality selected from menu
function fetchUsersNatMenu(nat) {
    const nationality = nat === "any" ? `` : `&nat=${nat}`;
    const url = `${baseUrl}?inc=name,location,cell,email,picture,id,dob&results=${maxResults}${nationality}`;
    usersList.innerHTML = "Loading...";
    return fetch(url)
        .then(response => response.json())
        .then(body => {
            usersArray = body.results;
            usersList.innerHTML = displayUsers(usersArray);
        }).catch(error => console.log(error));
}

nationalityForm.addEventListener('change', event => {
    event.preventDefault();
    fetchUsersNatMenu(event.target.value);
});

// Fetch up to 20 users based on search. Some search results are less than 20 due to
// the limitation of the API. The only way to get users' names is to filter from the maximum of 5000 results
function fetchUsersSearch(name) {
    const url = `${baseUrl}?inc=name,location,cell,email,picture,id,dob&results=5000`;
    usersList.innerHTML = `Checking for "${name}" in 5,000 records...`;
    return fetch(url)
        .then(response => response.json())
        .then(body => {
            usersArray = body.results.filter(item => {
                return item.name.first.includes(name.toLowerCase()) || item.name.last.includes(name.toLowerCase())
            });
            const slicedUsers = usersArray.slice(0, maxResults); // limit results to maxResults
            usersList.innerHTML = displayUsers(slicedUsers);
            nationalityForm[0].selectedIndex = 0; // reset the nationality select menu
        }).catch(error => console.log(error));
}

searchForm.addEventListener('submit', event => {
    event.preventDefault();
    fetchUsersSearch(event.target[0].value);
});

// dynamically generate HTML based on the resulatant array from the fetch
// All names are formatted using sentenceCase function
function displayUsers(arr) {
    const cols = 2;
    return arr.map((item, index) => {
        let str = ``;
        str += (index === 0 || index % cols === 0) ? `<article class="row">` : ``;
        str +=
            `<div class="column" href="#">
            <img id="${index}" class="user" src="${item.picture.medium}">
            <div id="${index}" class="column__username user">${sentenceCase(item.name.first)} ${sentenceCase(item.name.last)}</div>
        </div>`;
        str += (index === 0 || index % cols === 0) ? `` : `</article>`;
        return str;
    }).join('');
}

// Generate HTML for displaying user's info photo and full information. 
// Using the id of the user's thumbnail image / text to pull out data from usersArray
function selectUser(id) {
    mainInfo.innerHTML =
        `<div class="content__main-info-photo">
            <img src="${usersArray[id].picture.large}">
            <h2>${sentenceCase(usersArray[id].name.first)} ${sentenceCase(usersArray[id].name.last)}</h4>
            <h3>State: ${sentenceCase(usersArray[id].location.state)}</h5>
        </div>
        <div class="content__main-info-contact">
            <ul>
                <li>
                    <div>City</div>
                    <div>${sentenceCase(usersArray[id].location.city)}</div>
                </li>
                <li>
                    <div>Cell</div>
                    <div>${sentenceCase(usersArray[id].cell)}</div>
                </li>
                <li>
                    <div>E-mail</div>
                    <div>${sentenceCase(usersArray[id].email)}</div>
                </li>
            </ul>
        </div>`;
    // Updating nodes rather than updating innerHTML as the menu items below the photo jump around
    sidebarPhoto.childNodes[1].attributes[0].value = usersArray[id].picture.large;
    sidebarPhoto.childNodes[3].textContent = sentenceCase(usersArray[id].name.first);
    sidebarPhoto.childNodes[5].textContent = sentenceCase(usersArray[id].name.last);
}
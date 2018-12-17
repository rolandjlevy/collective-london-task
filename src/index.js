require('./styles/base.scss');

const baseUrl = "https://randomuser.me/api/";
const usersList = document.querySelector(".users-list");
const mainInfo = document.querySelector(".content__main-info");
const sidebar = document.querySelector(".sidebar");
const sidebarClose = document.querySelector(".sidebar__close");
const sidebarPhoto = document.querySelector(".sidebar__user-photo");
const nationalityForm = document.querySelector(".nationality-form");
const menuIcon = document.querySelector(".content__header-menu");
const searchForm = document.querySelector(".search-form");
const dialog = document.querySelector('#dialog');
let users = [];

const animationSetting = { 
    duration: 600,
    iterations: 1,
    easing: 'cubic-bezier(0.42, 0, 0.58, 1)'
}

function getViewportSize () {
    return window.innerWidth < 768 ? 'mobile' : 'desktop';
}

window.addEventListener('resize', event => {
    // if (getViewportSize() === 'desktop') {
    //      sidebar.style.display = "initial";
    // } else {
    //     if (sidebar.style.display !== "none" ) {
    //         sidebar.style.display = "none";
    //     }
    // }
});

sidebarClose.addEventListener('click', event => {	
    event.preventDefault();
    sidebar.style.display = "none";
    // closeSidebar();
});

menuIcon.addEventListener('click', event => {	
    event.preventDefault();
    sidebar.style.display = "initial";
    // openSidebar();
});

usersList.addEventListener('click', event => {	
    event.preventDefault();
    if (event.target.matches('.user')){
        selectUser(event.target.id);
        animateUser();
        // dialog.className = 'dialog-show';
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

function fetchUsersNatMenu (nat){
    const nationality = nat === "any" ? `` : `&nat=${nat}`;
    const url = `${baseUrl}?inc=name,location,cell,email,picture,id,dob&results=20${nationality}`;
    usersList.innerHTML = "Loading...";
    return fetch(url)
    .then(response => response.json())
    .then(body => {
        users = body.results;
        usersList.innerHTML = displayUsers(users);
    }).catch(error => console.log(error));
}

fetchUsersNatMenu("AU");

function fetchUsersSearch (name){
    const url = `${baseUrl}?inc=name,location,cell,email,picture,id,dob&results=5000`;
    usersList.innerHTML = `Checking for "${name}" in 5,000 records...`;
    return fetch(url)
    .then(response => response.json())
    .then(body => {
        users = body.results.filter(item => {
            return item.name.first.includes(name.toLowerCase()) || item.name.last.includes(name.toLowerCase())
        });
        const slicedUsers = users.slice(0, 20);
        usersList.innerHTML = displayUsers(slicedUsers);
        nationalityForm[0].selectedIndex = 0;
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
    mainInfo.innerHTML =
        `<div class="content__main-info-photo">
            <img src="${users[id].picture.large}">
            <h2>${sentenceCase(users[id].name.first)} ${sentenceCase(users[id].name.last)}</h4>
            <h3>State: ${sentenceCase(users[id].location.state)}</h5>
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
        </div>`;
        sidebarPhoto.childNodes[1].attributes[0].value = users[id].picture.large; 
        sidebarPhoto.childNodes[3].textContent = sentenceCase(users[id].name.first);
        sidebarPhoto.childNodes[5].textContent = sentenceCase(users[id].name.last);
}

/////////////////
// Animations
/////////////////

function safariFirefox () {
    const isSafari = /^((?!chrome).)*safari/i.test(navigator.userAgent);
    const isFirefox = /^((?!chrome).)*firefox/i.test(navigator.userAgent); 
    return isSafari || isFirefox;
}

function openSidebar() {
    if (safariFirefox()) {
        sidebar.style.animation = 'slide-sidebar 300ms';
    } else {
        sidebar.animate(
            [
                { transform: 'translateX(-100%)', opacity:0 }, 
                { transform: 'translateX(0)', opacity:1 }
            ], 
            animationSetting
        );
    }
}

function closeSidebar() {
    if (safariFirefox()) {
        // sidebar.style.animation = 'slide-sidebar 300ms';
    } else {
        sidebar.animate(
            [
                { transform: 'translateX(0)', opacity:1 }, 
                { transform: 'translateX(-100%)', opacity:0 }
            ], 
            animationSetting
        );
    }
}

function animateUser() {
    if (safariFirefox()) {
        mainInfo.style.animation = 'slide 300ms';
        sidebarPhoto.style.animation = 'fade 300ms';
    } else {
        mainInfo.animate(
            [
                { transform: 'translateX(100%)', opacity:0 }, 
                { transform: 'translateX(0)', opacity:1 }
            ], 
            animationSetting
        );
        sidebarPhoto.animate(
            [
                { opacity:0 }, 
                { opacity:1 }
            ], 
            animationSetting
        );
    }
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
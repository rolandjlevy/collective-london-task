![Screenshot](./src/images/react-cinema-screenshot-mobile.png) 
![Screenshot](./src/images/react-cinema-screenshot-ipad.png) 

# Collective London

## Technical test

> [View the live demo](https://moviewer.herokuapp.com/)

> [View the repo on Github](https://github.com/rolandjlevy/moview)

## Installation and set up
+ Clone this repo
+ Run `npm install` to install dependencies
+ Run `npm run dev` to create a development build with webpack
+ Open http://localhost:9000/ in the browser

## Functionality and features
+ The app first captures the search input and fetches data that matches the input from the [Open Movie Database](http://www.omdbapi.com) API. 
+ The app then uses React and CSS to display the data returned by the API as pages which are lists of 10 links per page. 
+ Each link has a unique ID which is used to identify the selected movie from the API.
+ Each time a movie is selected, the title, poster image, description and other details are displayed

## Technology
+ Vanilla JavaScript
+ Sass, BEM
+ Webpack, Babel
+ Git
+ Random user API

## Proces
+ Set up development environment: Webpack, Babel, node modules
+ Created HTML structure and basic layout with Sass, based on wireframe
+ Read [Random User API](https://randomuser.me) documentation to understand scope and limitations
+ Created functionality for fetching users from nationality menu selection and search query
+ Enabled responsiveness for mobile and desktop views
+ Used Sass to style the UI
+ Deployed to Heroku



## Desired features with more time
+ Improve the desktop view for better responsiveness
+ Allow users to mark movies as favourites and use localStorage to save the favourites into a sortable list
+ Added a featured movies section
+ Include infinate scrolling with the initial results
+ Use the  to load a trailer into the detailed results area

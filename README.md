# Collective London

## Technical test

> [View the live demo](https://moviewer.herokuapp.com/)

> [View the repo on Github](https://github.com/rolandjlevy/collective-london-task)

### Installation and set up
+ Clone this repo
+ Run `npm install` to install dependencies
+ Run `npm run dev` to create a development build with webpack
+ Open http://localhost:9000/ in the browser

### Technology
+ Random user API
+ Vanilla JavaScript
+ Sass, BEM
+ Webpack, Babel
+ Git

### Process
+ Set up development environment: Webpack, Babel, node modules
+ Created structure and basic layout with HTML and Sass, based on wireframe and task brief
+ Read [Random User API](https://randomuser.me) documentation to understand scope and limitations
+ Created functionality for pulling user data from API, based on menu selection or search query
+ Enabled responsiveness for mobile and desktop views
+ Used Sass to style the UI
+ Deployed to Heroku and created readme file

### Build and deployment
+ Used Webpack to compile SASS files and images
+ Used Babel to transpile JS code
+ app folder is for development and dist folder is for deployment
+ Please see comments in webpack.config.js for a general explanation of the build process

### Challenges and areas for improvement
+ The main challenge was creating the responsiveness without Flexbox or Grid.
+ I encountered bugs when trying to animate the closing of the sidebar in CSS.
+ Creating this app with a UI library like React would mean better readability, easier maintainability and taking advantage of components which maximizes reusability and optimises the architecture. There are more benefits of using  The virtual DOM would improve performance. 

### Compatibility and standards compliance
+ See results in Lighthouse audit reports of the mobile and desktop views
+ The app was tested in Chrome and Safari 
+ Animations are cross-browser compatible
+ The API would't run in Firefox due to this error: [CORS request did not succeed](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSDidNotSucceed)
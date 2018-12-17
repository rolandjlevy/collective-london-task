# Collective London

## Technical test
Following telephone interview on Thu 13 Dec 2018. Started on Sat 15 Dec


### Cross-browser compatibilty
- Made animation cross-browser compatible
- The API can't run in Firefox due to a bug in Firefox:
- Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at https://randomuser.me/api/?inc=name,location,cell,email,picture,id,dob&results=20&nat=AU. 
(Reason: CORS request did not succeed).
TypeError: "NetworkError when attempting to fetch resource."
- https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSDidNotSucceed?utm_source=devtools&utm_medium=firefox-cors-errors&utm_campaign=default-

### API documentation: 
- https://randomuser.me/documentation#howto

### Animation: 
- https://developer.mozilla.org/en-US/docs/Web/API/Element/animate
- https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translateX
- https://css-tricks.com/ease-out-in-ease-in-out/
- https://hackernoon.com/how-to-create-fancy-revealing-animations-with-these-simple-css-tricks-5b34614ae69a

### CSS Layout
- https://stackoverflow.com/questions/5803023/how-to-place-two-divs-next-to-each-other
- https://css-tricks.com/snippets/css/scale-on-hover-with-webkit-transition/

### Modal
- https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal
- https://www.viget.com/articles/the-dialog-element/

### Standards Compliance
- https://validator.w3.org/nu/#textarea
- https://raw.githubusercontent.com/rolandjlevy/collective-london-task/staging/index.html
- https://www.smashingmagazine.com/2009/06/10-ways-to-make-your-site-accessible-using-web-standards/
- https://www.w3schools.com/tags/att_meta_http_equiv.asp
- https://www.whoishostingthis.com/resources/web-standards/

### Browser support
    // Firefox: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:64.0) Gecko/20100101 Firefox/64.0
    // Safari:  Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.2 Safari/605.1.15
    // Chrome:  Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36   (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36

### CORS issue with Firefox 
- Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at https://randomuser.me/api/?inc=name,location,cell,email,picture,id,dob&results=20&nat=AU. (Reason: CORS request did not succeed).
- https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSDidNotSucceed
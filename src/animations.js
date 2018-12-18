// define animation settings
const animationSetting = {
    duration: 600,
    iterations: 1,
    easing: 'cubic-bezier(0.42, 0, 0.58, 1)'
}

// check for browser compatibility
// for Safari or Firefox element.style.animation is used instead of element.animate
function safariFirefox () {
    const isSafari = /^((?!chrome).)*safari/i.test(navigator.userAgent);
    const isFirefox = /^((?!chrome).)*firefox/i.test(navigator.userAgent); 
    return isSafari || isFirefox;
}

// animation to slide sidebar from the left
export function openSidebar(element) {
    if (safariFirefox()) {
        element.style.animation = `slide-sidebar ${animationSetting.duration}ms`;
    } else {
        element.animate(
            [
                { transform: 'translateX(-100%)', opacity:0 }, 
                { transform: 'translateX(0)', opacity:1 }
            ], 
            animationSetting
        );
    }
}

// animation to slide user information from the right
export function animateUser(mainInfo, sidebarPhoto) {
    if (safariFirefox()) {
        mainInfo.style.animation = `slide ${animationSetting.duration}ms`;
        sidebarPhoto.style.animation = `fade ${animationSetting.duration}ms`;
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

// closeSidebar() not implemented as it was too buggy
export function closeSidebar(element) {
    if (safariFirefox()) {
        element.style.animation = `slide-sidebar ${animationSetting.duration}ms`; // review this 
    } else {
        element.animate(
            [
                { transform: 'translateX(0)', opacity:1 }, 
                { transform: 'translateX(-100%)', opacity:0 }
            ], 
            animationSetting
        );
    }
}
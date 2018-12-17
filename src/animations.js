const animationSetting = {
    duration: 600,
    iterations: 1,
    easing: 'cubic-bezier(0.42, 0, 0.58, 1)'
}

function safariFirefox () {
    const isSafari = /^((?!chrome).)*safari/i.test(navigator.userAgent);
    const isFirefox = /^((?!chrome).)*firefox/i.test(navigator.userAgent); 
    return isSafari || isFirefox;
}

export function openSidebar(element) {
    if (safariFirefox()) {
        element.style.animation = 'slide-sidebar 300ms';
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

export function closeSidebar(element) {
    if (safariFirefox()) {
        element.style.animation = 'slide-sidebar 300ms'; // review this 
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

export function animateUser(mainInfo, sidebarPhoto) {
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
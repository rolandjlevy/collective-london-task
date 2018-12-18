export const sentenceCase = str => {
    return str
        .split(" ")
        .map(item => {
            const word = item.split("");
            word[0] = word[0].toUpperCase();
            return word.join("");
        }).join(" ");
}

export const getViewportSize = () => {
    return window.innerWidth < 768 ? 'mobile' : 'desktop';
}
document.addEventListener('DOMContentLoaded', () => {
    const imgs = Array.from(document.querySelectorAll('img')), length = imgs.length;
    let loaded = 0;
    imgs.forEach(img => {
        img.addEventListener('load', () => {
            loaded++;
            if (loaded === length) {
                console.log('All loaded!');
                document.documentElement.setAttribute('class', document.documentElement.getAttribute('class') + ' assetsLoaded');
            }
            console.log(img.src);
        });
    });
});
//# sourceMappingURL=main.js.map
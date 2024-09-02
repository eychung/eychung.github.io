import PhotoSwipeLightbox from '/assets/js/photoswipe-lightbox.esm.js';
import PhotoSwipe from '/assets/js/photoswipe.esm.js';

const lightbox = new PhotoSwipeLightbox({
    bgOpacity: 0.8,
    gallery: '#gallery',
    children: 'a',  // Elements within gallery (slides)
    showHideAnimationType: 'zoom',
    pswpModule: PhotoSwipe
});

window.onload = function () {
    const links = document.querySelectorAll('.flex-item-wrapper');
    links.forEach(link => {
        const img = new Image();
        img.src = link.href;

        img.onload = function () {
            const height = img.naturalHeight;
            const width = img.naturalWidth;

            link.setAttribute('data-pswp-height', height);
            link.setAttribute('data-pswp-width', width);
        };
    });
};

lightbox.init();

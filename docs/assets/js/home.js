import PhotoSwipeLightbox from '/assets/js/photoswipe-lightbox.esm.js';
import PhotoSwipe from '/assets/js/photoswipe.esm.js';

function initializePhotoSwipe(gallery_id) {
    const lightbox = new PhotoSwipeLightbox({
        bgOpacity: 0.8,
        gallery: gallery_id,
        children: 'a',  // Elements within gallery (slides)
        showHideAnimationType: 'zoom',
        pswpModule: PhotoSwipe
    });
    lightbox.init();
}

document.addEventListener('DOMContentLoaded', function () {
    const toTopButton = document.getElementById('return-to-top');

    // Listen for both scroll and touchmove events
    window.addEventListener('scroll', toggleButtonVisibility);
    window.addEventListener('touchmove', toggleButtonVisibility);

    function toggleButtonVisibility() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            toTopButton.style.display = 'block';
        } else {
            toTopButton.style.display = 'none';
        }
    }

    // Smooth scroll back to top
    toTopButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

document.addEventListener('scroll', function () {
    const parallaxBackground = document.querySelector('.parallax-background');
    const scrollPosition = window.scrollY;
    const contentOffsetTop = document.querySelector('.action-bar').offsetTop;

    // Apply parallax effect only if we're within the parallax section
    if (scrollPosition < contentOffsetTop) {
        parallaxBackground.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    } else {
        parallaxBackground.style.transform = `translateY(${contentOffsetTop * 0.5}px)`;
    }
});

['#top-all', '#top-urban', '#top-nature'].forEach(id => initializePhotoSwipe(id));

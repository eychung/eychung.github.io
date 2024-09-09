import PhotoSwipeLightbox from '/assets/js/photoswipe-lightbox.esm.js';
import PhotoSwipe from '/assets/js/photoswipe.esm.js';

const ALL_ITEMS = Array.from(document.querySelector('.flex-container').children);  // Store the original items

const lightbox = new PhotoSwipeLightbox({
    bgOpacity: 0.8,
    gallery: '#gallery',
    children: 'a',  // Elements within gallery (slides)
    showHideAnimationType: 'zoom',
    pswpModule: PhotoSwipe
});

// Function to create a div with text and a close button
function createDiv(filter, checkbox) {
    const div = document.createElement('div');
    div.classList.add('text-with-close');

    const span = document.createElement('span');
    span.classList.add('filter-tag-text');
    span.textContent = filter;

    const closeButton = document.createElement('button');
    closeButton.classList.add('btn-close');
    closeButton.innerHTML = '&times;';
    closeButton.onclick = () => {
        div.remove();
        checkbox.checked = false;
        applyFilters();
        updateFilterDisplayContainer();
    };

    div.appendChild(span);
    div.appendChild(closeButton);

    return div;
}

// Function to update the container with selected options' divs
function updateFilterDisplayContainer() {
    const filterDisplayContainer = document.getElementById('filter-display-container');
    filterDisplayContainer.innerHTML = '';

    const checkedFilters = document.querySelectorAll('.filter:checked');
    checkedFilters.forEach(checkbox => {
        const filter = checkbox.parentElement.textContent.trim();
        const div = createDiv(filter, checkbox);
        filterDisplayContainer.appendChild(div);
    });
}

function getCheckedFilters(dataType) {
    return Array.from(document.querySelectorAll(`input[data-type="${dataType}"]:checked`)).map(checkedFilter => checkedFilter.value);
}

function applyFilters() {
    const filterGroups = Array.from(document.querySelectorAll('.filter-group'));
    const filters = {};
    filterGroups.forEach(group => {
        const type = group.querySelector('input').dataset.type;
        filters[type] = getCheckedFilters(type).map(filter => filter.toLowerCase());
    });

    const flexContainer = document.querySelector('.flex-container');
    flexContainer.innerHTML = '';

    ALL_ITEMS.forEach(item => {
        const tags = item.getAttribute('data-tags').split(' ').map(tag => tag.toLowerCase());
        const matches = Object.keys(filters).every(type => {
            const selectedFilters = filters[type];
            return selectedFilters.length === 0 || selectedFilters.some(filter => tags.includes(filter));
        });

        if (matches) {
            flexContainer.appendChild(item);
        }
    });
}

document.querySelectorAll('.filter').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        applyFilters();
        updateFilterDisplayContainer();
    });
});

lightbox.init();

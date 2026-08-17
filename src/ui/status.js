// Supported statuses: idle, loading, success, error, empty.
const infoContainer = document.querySelector('.infoContainer');
const booksList = document.querySelector('.booksList');
const authorsFilter = document.querySelector('.authorsFilter');


export function setStatus(status, message = '') {
    infoContainer.classList.remove('error');
    infoContainer.textContent = '';
    booksList.innerHTML = '';

    authorsFilter.classList.remove('visible');

    switch (status) {
        case 'loading': {
            const loaderTemplate = document.getElementById('loaderTemplate');
            const loader = loaderTemplate.content.firstElementChild.cloneNode(true);
            infoContainer.append(loader);
            break;
        }
        case 'success': {
            authorsFilter.classList.add('visible');
            infoContainer.textContent = `Search results for: '${message}': `;
            break;
        }
        case 'error': {
            infoContainer.classList.add('error');
            infoContainer.textContent = message;
            break;
        }
        case 'empty': {
            infoContainer.textContent = `No books found for: '${message}'.`;
            break;
        }
        case 'idle': {
            infoContainer.textContent = 'Search for books to get started.';
            break;
        }
        default: {
            console.warn(`Unknown status: ${status}`);
        }
    }
}


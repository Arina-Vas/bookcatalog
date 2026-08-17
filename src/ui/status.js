// Supported statuses: idle, loading, success, error, empty.
export function setStatus(status, message = '') {
    const infoContainer = document.querySelector('.infoContainer');
    const booksList = document.querySelector('.booksList');

    infoContainer.classList.remove('error');
    infoContainer.textContent = '';
    booksList.innerHTML = '';

    switch (status) {
        case 'loading': {
            const loaderTemplate = document.getElementById('loaderTemplate');
            const loader = loaderTemplate.content.firstElementChild.cloneNode(true);
            infoContainer.append(loader);
        }
            break;
        case 'success': {
            infoContainer.textContent = `Search results for: '${message}': `;
            break;
        }
        case 'error': {
            infoContainer.classList.add('error');
            infoContainer.textContent = message;
            break;
        }
        case 'empty': {
            infoContainer.classList.remove('error');
            infoContainer.textContent = `No books found for: '${message}'.`;
            break;
        }
        case 'idle': {
            infoContainer.textContent = 'Search for books to get started.';
            break;
        }
    }
}


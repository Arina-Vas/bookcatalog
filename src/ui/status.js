// loading | success | error | empty
let status = ''

export function setStatus(type, message = '') {
    status = type;
    handleStatus(status, message);
}

function handleStatus(status, message = '') {
    const infoContainer = document.querySelector('.infoContainer');
    const booksList = document.querySelector('.booksList');

    switch (status) {
        case 'loading':
            infoContainer.classList.remove('error');
            const loaderTemplate = document.getElementById('loaderTemplate');
            const loader = loaderTemplate.content.firstElementChild.cloneNode(true);
            infoContainer.textContent = '';
            infoContainer.append(loader);
            booksList.innerHTML = '';
            break;
        case 'success':
            infoContainer.classList.remove('error');
            infoContainer.textContent = `Search results for: '${message}': `;
            booksList.innerHTML = '';
            break;
        case 'error':
            infoContainer.classList.add('error');
            infoContainer.textContent = message;
            booksList.innerHTML = '';
            break;
        case 'empty':
            infoContainer.classList.remove('error');
            infoContainer.textContent = `No books found for: '${message}'.`;
            booksList.innerHTML = '';
            break;
        default:
            infoContainer.classList.remove('error');
            infoContainer.textContent = '';
            booksList.innerHTML = '';
            break;
    }
}


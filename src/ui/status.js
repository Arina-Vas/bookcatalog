// loading | success | error | empty
let status = ''

export function setStatus(type, error = '') {
    status = type;
    handleStatus(status, error);
}

function handleStatus(status, error = '') {
    const emptyContainer = document.querySelector('.emptyContainer');
    const booksList = document.querySelector('.booksList');

    switch (status) {
        case 'loading':
            const loaderTemplate = document.getElementById('loaderTemplate');
            const loader = loaderTemplate.content.firstElementChild.cloneNode(true);
            emptyContainer.innerHTML = '';
            emptyContainer.append(loader);
            booksList.innerHTML = '';
            break;
        case 'success':
            emptyContainer.innerHTML = '';
            booksList.innerHTML = '';
            break;
        case 'error':
            emptyContainer.classList.add('error');
            emptyContainer.textContent = error;
            booksList.innerHTML = '';
            break;
        case 'empty':
        default:
            emptyContainer.textContent = 'По вашему запросу ничего не найдено';
            booksList.innerHTML = '';
            break;
    }
}


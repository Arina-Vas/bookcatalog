import {fetchCover} from "./fetchBooks.js";

// Application statuses

// loading | success | error
let status = ''
// const sectionStatus = {
//     books: '',
//     favorite: '',
// };

export function setStatus(type, error = '') {
    status = type;
    renderSectionState(status, error);
}

function renderSectionState(status, error = '') {
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
        case  'error':
            emptyContainer.textContent = error;
            booksList.innerHTML = '';
            break;
        case 'empty':
            emptyContainer.textContent = 'По вашему запросу ничего не найдено';
            booksList.innerHTML = '';
            break;
        default:
            emptyContainer.textContent = 'По вашему запросу ничего не найдено';
            booksList.innerHTML = '';
            break;
    }
}

// loader


// Builders

export function buildBookCard(book) {
    const cardTemplate = document.getElementById('cardTemplate');
    const card = cardTemplate.content.firstElementChild.cloneNode(true);

    const img = card.querySelector('.card_cover');
    const title = card.querySelector('.card_title');
    const authors = card.querySelector('.card_authors');
    const year = card.querySelector('.card_year');
    const favoriteCheckbox = card.querySelector('.card_favorite_checkbox');

    img.classList.remove("placeholder");

    if (book.cover_i) {
        img.src = fetchCover(book.cover_i)
    } else {
        img.src = "../src/assets/book.svg"
        img.classList.add("placeholder");
    }

    title.textContent = book.title;
    title.title = book.title;
    authors.textContent = book.author_name ? `${book.author_name.join(', ')}` : 'Автор неизвестен';
    year.textContent = book.first_publish_year ?? 'Год издания неизвестен';
    favoriteCheckbox.checked = isFavorite(book.key);
    favoriteCheckbox.dataset.bookKey = book.key;
    favoriteCheckbox.addEventListener('change', () => toggleFavoriteBook(book));

    return card;
}

export function buildFavoriteBookCard(book) {
    const favoriteCardTemplate = document.getElementById('favoriteCardTemplate');
    const card = favoriteCardTemplate.content.firstElementChild.cloneNode(true);

    const img = card.querySelector('.favorite_card_cover');
    const title = card.querySelector('.card_title');
    const authors = card.querySelector('.card_authors');
    const year = card.querySelector('.card_year');
    const favoriteCheckbox = card.querySelector('.card_favorite_checkbox');

    favoriteCardTemplate.classList.remove("placeholder");

    if (book.cover_i) {
        img.src = fetchCover(book.cover_i)
    } else {
        img.src = "../src/assets/book.svg"
        img.classList.add("placeholder");
    }

    title.textContent = book.title;
    title.title = book.title;
    const authorsText = book.author_name ? `${book.author_name.join(', ')}` : 'Автор неизвестен';
    authors.textContent = authorsText;
    authors.title = authorsText;
    year.textContent = book.first_publish_year ?? 'Год издания неизвестен';
    favoriteCheckbox.checked = isFavorite(book.key);
    favoriteCheckbox.dataset.bookKey = book.key;
    favoriteCheckbox.addEventListener('change', () => toggleFavoriteBook(book));

    return card;
}


// renderers
export function renderSearchResults(books) {
    const booksList = document.querySelector('.booksList')
    booksList.innerHTML = '';

    books.forEach(book => {
        booksList.append(buildBookCard(book));
    })
}

export function renderFavoriteBooks() {
    const favoriteList = document.querySelector('.favoriteList');
    const books = [...favoriteBooks.values()]
    favoriteList.innerHTML = '';
    if (books.length === 0) {
        favoriteList.textContent = 'There no favorite books';
    }
    books.forEach(book => {
        favoriteList.append(buildFavoriteBookCard(book));
    })
}

// Favorites logic

const FAVORITES_KEY = 'favorites_books';
let favoriteBooks = loadFavoriteBooks();

export function loadFavoriteBooks() {
    const result = new Map()

    try {
        const favoriteBooks = localStorage.getItem(FAVORITES_KEY);
        if (!favoriteBooks) {
            return new Map();
        }
        const favoritesArray = JSON.parse(favoriteBooks);
        favoritesArray.forEach((book) => {
            result.set(book.key, book);
        })
        return result;

    } catch (error) {
        console.error(error);
        return new Map();
    }
}

export function setFavoriteBook() {
    try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favoriteBooks.values()]));
    } catch (error) {
        console.log(error);
    }
}

export function toggleFavoriteBook(book) {
    if (favoriteBooks.has(book.key)) {
        favoriteBooks.delete(book.key);
    } else {
        favoriteBooks.set(book.key, book);
    }
    setFavoriteBook();
    syncFavoriteCheckboxes(book.key);
    renderFavoriteBooks();
    updateFavoriteBookCount()
}

function isFavorite(bookKey) {
    return favoriteBooks.has(bookKey);
}

export function syncFavoriteCheckboxes(bookKey) {
    document.querySelectorAll('.card_favorite_checkbox[data-book-key]').forEach(item => {
        if (item.dataset.bookKey === bookKey) {
            item.checked = favoriteBooks.has(bookKey);
        }
    })
}

export function updateFavoriteBookCount() {
    const favoriteBookCount = document.querySelector('.favoriteBooksCount');
    const count = favoriteBooks.size ?? 0
    favoriteBookCount.textContent = count > 0
        ? `${count} ${count === 1 ? 'book' : 'books'} saved`
        : '';
}


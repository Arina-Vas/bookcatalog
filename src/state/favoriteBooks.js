import {renderFavoriteBooks} from "../ui/renderBooks.js";

const FAVORITES_KEY = 'favoriteBooks';

let favoriteBooks = loadFavoriteBooks();

export function getFavoriteBooks() {
    return [...favoriteBooks.values()];
}

export function loadFavoriteBooks() {
    try {
        const storedFavoriteBooks = localStorage.getItem(FAVORITES_KEY);
        if (!storedFavoriteBooks) {
            return new Map();
        }

        const result = new Map();
        const favoritesArray = JSON.parse(storedFavoriteBooks);
        favoritesArray.forEach((book) => {
            result.set(book.key, book);
        })

        return result;

    } catch (error) {
        console.error(error);
        return new Map();
    }
}

export function setFavoriteBooksToStorage() {
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
    setFavoriteBooksToStorage();
    syncFavoriteCheckboxes(book.key);
    renderFavoriteBooks();
    updateFavoriteBookCount()
}

export function isFavorite(bookKey) {
    return favoriteBooks.has(bookKey);
}

// ----view

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
import {renderFavoriteBooks} from "../ui/renderBooks.js";

const FAVORITES_KEY = 'favoriteBooks';

let favoriteBooks = loadFavoriteBooks();

export function getFavoriteBooks() {
    return [...favoriteBooks.values()];
}

function loadFavoriteBooks() {
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
        // Invalid localStorage data should not prevent the app from starting.
        console.error(error);
        return new Map();
    }
}

function saveFavoriteBooks() {
    try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favoriteBooks.values()]));
    } catch (error) {
        // Storage errors should not break the app.
        console.error(error);
    }
}

export function toggleFavoriteBook(book) {
    if (favoriteBooks.has(book.key)) {
        favoriteBooks.delete(book.key);
    } else {
        favoriteBooks.set(book.key, book);
    }
    saveFavoriteBooks();
    syncFavoriteCheckboxes(book.key);
    renderFavoriteBooks();
    updateFavoriteBookCount()
}

export function isFavorite(bookKey) {
    return favoriteBooks.has(bookKey);
}

// DOM-related functions: synchronize the UI with the favorite books state.

function syncFavoriteCheckboxes(bookKey) {
    const checkbox = document.querySelector(`.card_favorite_checkbox[data-book-key="${bookKey}"]`);
    checkbox.checked = favoriteBooks.has(bookKey);
}

export function updateFavoriteBookCount() {
    const favoriteBookCount = document.querySelector('.favoriteBooksCount');
    const count = favoriteBooks.size;
    favoriteBookCount.textContent = count > 0
        ? `${count} ${count === 1 ? 'book' : 'books'} saved`
        : '';
}
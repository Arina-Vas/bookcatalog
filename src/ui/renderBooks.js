import {buildBookCard, buildFavoriteBookCard} from "./bookCard.js";
import {getFavoriteBooks} from "../state/favoriteBooks.js";

export function renderSearchedBooks(books) {
    const booksList = document.querySelector('.booksList')
    booksList.innerHTML = '';

    books.forEach(book => {
        booksList.append(buildBookCard(book));
    })
}

export function renderFavoriteBooks() {
    const favoriteList = document.querySelector('.favoriteList');

    const favoriteBooks = getFavoriteBooks();
    const books = [...favoriteBooks.values()];

    favoriteList.innerHTML = '';
        if (books.length === 0) {
        favoriteList.textContent = 'There no favorite books';
    }

    books.forEach(book => {
        favoriteList.append(buildFavoriteBookCard(book));
    })
}
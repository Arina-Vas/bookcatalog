import {buildBookCard, buildFavoriteBookCard} from "./bookCard.js";
import {getFavoriteBooks} from "../state/favoriteBooks.js";

const booksList = document.querySelector('.booksList');
const favoriteList = document.querySelector('.favoriteList');

export function renderSearchedBooks(books) {
    booksList.innerHTML = '';

    books.forEach(book => {
        booksList.append(buildBookCard(book));
    })
}

export function renderFavoriteBooks() {
    const books = getFavoriteBooks();

    favoriteList.innerHTML = '';

    if (books.length === 0) {
        favoriteList.textContent = 'No favorite books yet';
        return;
    }

    books.forEach(book => {
        favoriteList.append(buildFavoriteBookCard(book));
    })
}
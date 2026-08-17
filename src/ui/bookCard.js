import {fetchCover} from "../api/booksApi.js";
import {isFavorite, toggleFavoriteBook} from "../state/favoriteBooks.js";
import bookIcon from "../assets/book.svg";

function fillBookCard(card, book, coverSelector) {
    const img = card.querySelector(coverSelector);
    const title = card.querySelector('.card_title');
    const authors = card.querySelector('.card_authors');
    const year = card.querySelector('.card_year');
    const favoriteCheckbox = card.querySelector('.card_favorite_checkbox');

    img.classList.remove("default");

    if (book.cover_i) {
        img.src = fetchCover(book.cover_i);
    } else {
        img.src = bookIcon;
        img.classList.add("default");
    }

    title.textContent = book.title;
    title.title = book.title;

    const authorsList = book.author_name ? book.author_name.join(', ') : 'Author unknown';
    authors.textContent = authorsList;
    authors.title = authorsList;
    year.textContent = book.first_publish_year ?? 'Publication year unknown';
    favoriteCheckbox.checked = isFavorite(book.key);
    favoriteCheckbox.dataset.bookKey = book.key;
    favoriteCheckbox.addEventListener('change', () => toggleFavoriteBook(book));

    return card;
}

export function buildBookCard(book) {
    const cardTemplate = document.getElementById('cardTemplate');
    const card = cardTemplate.content.firstElementChild.cloneNode(true);

    return fillBookCard(card, book, '.card_cover');
}

export function buildFavoriteBookCard(book) {
    const favoriteCardTemplate = document.getElementById('favoriteCardTemplate');
    const card = favoriteCardTemplate.content.firstElementChild.cloneNode(true);

    return fillBookCard(card, book, '.favorite_card_cover');
}
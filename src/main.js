import './theme.js';
import {fetchBooks} from './api/booksApi.js'
import {debounce} from "./utils/debounce.js";
import {renderFavoriteBooks} from "./ui/renderBooks.js";
import {updateFavoriteBookCount} from "./state/favoriteBooks.js";

// ---------- Search ----------
const searchInput = document.getElementById('searchInput')
const form = document.querySelector('.searchForm');

const debounceSearch = debounce(fetchBooks, 1000)

searchInput.addEventListener('input', e => {
    const searchValue = e.target.value.trim();
    if (searchValue) {
        debounceSearch(searchValue)
    }
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = searchInput.value.trim();
    fetchBooks(value)
})

// initialize state
renderFavoriteBooks()
updateFavoriteBookCount()



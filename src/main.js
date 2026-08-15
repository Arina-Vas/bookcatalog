import './theme.js';
import {fetchBooks} from './fetchBooks.js'
import {renderFavoriteBooks, updateFavoriteBookCount} from "./utils.js";

// ---------- Search ----------
const searchInput = document.getElementById('searchInput')
const form = document.querySelector('.searchForm');

const debounce = (cb, delay) => {
    let timeoutId;

    return (...args) => {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => cb(...args), delay);
    }
}

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



// ---------- Build card ----------

renderFavoriteBooks()
updateFavoriteBookCount()



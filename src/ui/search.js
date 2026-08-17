import {fetchBooks} from "../api/booksApi.js";
import {renderAuthors} from "./authorFilter.js";
import {renderSearchedBooks} from "./renderBooks.js";
import {debounce} from "../utils/debounce.js";
import {validateSearchValue} from "../utils/validateSearchValue.js";
import {setBooks} from "../state/books.js";

const searchInput = document.getElementById('searchInput');
const searchInfo = document.querySelector('.searchInfo');
const form = document.querySelector('.searchForm');
const searchButton = document.querySelector('.searchButton');

const searchBooks = async (value) => {
    const books = await fetchBooks(value);

    if (books === null) {
        return;
    }

    setBooks(books);

    renderAuthors(books);
    renderSearchedBooks(books);
};

const debounceSearch = debounce(searchBooks, 500)

export function initSearchBooks() {
    searchInput.addEventListener('input', e => {
        const searchValue = e.target.value.trim();
        const {isValid, message} = validateSearchValue(searchValue);

        searchButton.disabled = !isValid;
        searchInfo.textContent = message;

        if (!isValid) {
            debounceSearch.cancel();
            return;
        }

        debounceSearch(searchValue);
    })

    // Restore the initial state when leaving an empty search field.
    searchInput.addEventListener('blur', () => {
        if (!searchInput.value.trim()) {
            searchInfo.textContent = '';
            searchButton.disabled = false;
        }
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const value = searchInput.value.trim();

        const {isValid, message} = validateSearchValue(value);

        searchInfo.textContent = message;

        if (!isValid) {
            return;
        }

        debounceSearch.cancel();
        await searchBooks(value);
    })
}


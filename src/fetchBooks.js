import {renderSearchResults, setStatus} from "./utils.js";
import {filterByAuthors, renderAuthors} from "./filterByAuthors.js";

const url = "https://openlibrary.org/search.json?";

let books = [];

export async function fetchBooks(value, limit = 20) {
    setStatus('loading');
    try {
        const params = new URLSearchParams({
            q: value,
            limit
        });
        const response = await fetch(`${url}${params}`);

        if (!response.ok) {
            throw Error(`Ошибка сервера: ${response.status}`);
        }

        const data = await response.json();
        if (data.docs.length === 0) {
            setStatus('empty');
            return;
        }

        setStatus('success');
        renderAuthors(data.docs);
        books = data.docs;
        renderSearchResults(data.docs);
    } catch (error) {
        console.error(error);
        setStatus('error', error);
    }
}


const coverURL = 'https://covers.openlibrary.org/b/id/'

export function fetchCover(id) {
    return `${coverURL}${id}.jpg`;
}

const applyFiltersButton = document.querySelector('.applyAuthorsFilter');
const resetFiltersButton = document.querySelector('.resetAuthorsFilter');

applyFiltersButton.addEventListener('click', () => {
    const selectedAuthors = [
        ...document.querySelectorAll('.authorCheckbox:checked')
    ].map(checkbox => checkbox.value);

    filterByAuthors(selectedAuthors, books);
})

resetFiltersButton.addEventListener('click', () => {
    document
        .querySelectorAll('.authorCheckbox:checked')
        .forEach(checkbox => {
            checkbox.checked = false;
        });

    renderSearchResults(books);
});





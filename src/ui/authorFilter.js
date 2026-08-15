import {getBooks} from "../state/books.js";
import {renderSearchedBooks} from "./renderBooks.js";

const authorsFilter = document.querySelector('.authorsFilter');
const authorsDropdown = document.querySelector('.authorsDropdown');
const authorTemplate = document.getElementById('authorTemplate');
const applyFiltersButton = document.querySelector('.applyAuthorsFilter');
const resetFiltersButton = document.querySelector('.resetAuthorsFilter');
const authorsSelectButton = document.querySelector('.authorsSelectButton');


export const getAuthors = (books) => {
    return [...new Set(
        books.flatMap((book) => book.author_name || [])
    )];
}

export const filterByAuthors = (authors, books) => {
    const booksForRender = books.filter((book) =>
        book.author_name?.some((author) => authors.includes(author)))

    renderSearchedBooks(booksForRender);
}

export const renderAuthors = (books) => {
    if (books) {
        authorsFilter.classList.add('visible');

        authorsDropdown.innerHTML = '';

        const authors = getAuthors(books);

        authors.forEach(author => {
            const authorOption = authorTemplate.content.firstElementChild.cloneNode(true);
            const authorCheckbox = authorOption.querySelector('.authorCheckbox');
            const authorName = authorOption.querySelector('.authorName');

            authorName.textContent = author;
            authorCheckbox.value = author;

            authorsDropdown.append(authorOption);
        })
    }

}

authorsSelectButton.addEventListener('click', () => {
    const isOpen = authorsFilter.dataset.state === 'open';
    authorsFilter.dataset.state = isOpen ? 'closed' : 'open';
});

applyFiltersButton.addEventListener('click', () => {
    const selectedAuthors = [
        ...document.querySelectorAll('.authorCheckbox:checked')
    ].map(checkbox => checkbox.value);

    const books = getBooks();

    filterByAuthors(selectedAuthors, books);

    if (authorsFilter.dataset.state === 'open') authorsFilter.dataset.state = 'closed';
})

resetFiltersButton.addEventListener('click', () => {
    document.querySelectorAll('.authorCheckbox:checked')
        .forEach(checkbox => {
            checkbox.checked = false;
        });

    const books = getBooks();

    renderSearchedBooks(books);

    if (authorsFilter.dataset.state === 'open') authorsFilter.dataset.state = 'closed';
});


import {renderSearchResults} from "./utils.js";

export const getAuthors = (books) => {
    return [...new Set(
        books.flatMap((book) => book.author_name || [])
    )];
}

export const filterByAuthors = (authors, books) => {
    const booksForRender = books.filter((book) => book.author_name?.some((author) => authors.includes(author)))
    console.log(books);
    console.log(authors);
    console.log(booksForRender);
    renderSearchResults(booksForRender);
}

const authorsFilter = document.querySelector('.authorsFilter');
const authorsDropdown = document.querySelector('.authorsDropdown');
const authorTemplate = document.getElementById('authorTemplate');

export const renderAuthors = (books) => {
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

const authorsSelectButton = document.querySelector('.authorsSelectButton');
authorsSelectButton.addEventListener('click', () => {
    const isOpen = authorsFilter.dataset.state === 'open';

    authorsFilter.dataset.state = isOpen ? 'closed' : 'open';
});




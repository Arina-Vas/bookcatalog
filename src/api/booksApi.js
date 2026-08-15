import {setStatus} from "../ui/status.js";
import {renderAuthors} from "../ui/authorFilter.js";
import {setBooks} from "../state/books.js";
import {renderSearchedBooks} from "../ui/renderBooks.js";

const SEARCH_URL = "https://openlibrary.org/search.json?";
const COVER_URL = 'https://covers.openlibrary.org/b/id/'

export async function fetchBooks(value, limit = 20) {
    setStatus('loading');
    try {
        const params = new URLSearchParams({
            q: value,
            limit
        });
        const response = await fetch(`${SEARCH_URL}${params}`);

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
        setBooks(data.docs);
        renderSearchedBooks(data.docs);
    } catch (error) {
        console.error(error);
        setStatus('error', error.message ?? String(error));
    }
}

export function fetchCover(id) {
    return `${COVER_URL}${id}.jpg`;
}





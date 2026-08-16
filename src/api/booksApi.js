import {setStatus} from "../ui/status.js";
import {setBooks} from "../state/books.js";

const SEARCH_URL = "https://openlibrary.org/search.json?";
const COVER_URL = 'https://covers.openlibrary.org/b/id/'

let controller = null;

export async function fetchBooks(value, limit = 20) {
    if (controller) {
        controller.abort();
    }

    controller = new AbortController();

    setStatus('loading');

    try {
        const params = new URLSearchParams({
            q: value,
            limit,
            fields: ['key', 'title', 'author_name', 'first_publish_year', 'cover_i'],
        });
        const response = await fetch(`${SEARCH_URL}${params}`, {signal: controller.signal});

        if (!response.ok) {
            throw Error(`Ошибка сервера: ${response.status}`);
        }

        const data = await response.json();

        if (data.docs.length === 0) {
            setStatus('empty', value);
            setBooks([]);
            return [];
        }

        setStatus('success', value);
        setBooks(data.docs);

        return data.docs;
    } catch (error) {
        if (error.name === 'AbortError') {
            return [];
        }
        console.error(error);
        setBooks([]);
        setStatus('error', error.message ?? String(error));

        return [];
    }
}

export function fetchCover(id) {
    return `${COVER_URL}${id}.jpg`;
}





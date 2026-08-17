import './theme.js';
import {renderFavoriteBooks} from "./ui/renderBooks.js";
import {updateFavoriteBookCount} from "./state/favoriteBooks.js";
import {initSearchBooks} from "./ui/search.js";
import {initTabs} from "./ui/tabs.js";
import {initAuthors} from "./ui/authorFilter.js";
import {setStatus} from "./ui/status.js";

// Initialize UI features and event handlers.
initSearchBooks();
initTabs();
initAuthors();

setStatus('idle');

// Restore favorites saved in localStorage and render them on startup.
renderFavoriteBooks();
updateFavoriteBookCount();
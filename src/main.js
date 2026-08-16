import './theme.js';
import {renderFavoriteBooks} from "./ui/renderBooks.js";
import {updateFavoriteBookCount} from "./state/favoriteBooks.js";
import {initSearchBooks} from "./ui/search.js";

initSearchBooks()

// render initial UI from persisted favorites state
renderFavoriteBooks();
updateFavoriteBookCount();
const tabButtons = document.querySelectorAll('.tabButton');
const booksScreen = document.querySelector('.booksScreen');

/**
 * Switches the active tab (books/favorite) on the mobile.
 * Bookscreen.dataset.activeTab is used in style.css to show/hide
 * .books and .favorite via [data-active-tab="..."] — when changing values
 * here you need to synchronize them with CSS selectors.
 */

export function initTabs () {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tab = button.dataset.tab;

            if (booksScreen.dataset.activeTab === tab) {
                return;
            }

            booksScreen.dataset.activeTab = tab;

            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        })
    })
}
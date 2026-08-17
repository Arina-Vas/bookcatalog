/**
 * Delays the callback until no new calls are made within the delay.
 */

export const debounce = (callback, delay) => {
    let timeoutId;

    return (...args) => {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => callback(...args), delay);
    }
}
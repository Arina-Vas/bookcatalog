/**
 * Delays the callback until no new calls are made within the delay.
 */

export const debounce = (callback, delay) => {
    let timeoutId;

    const debounced = (...args) => {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => callback(...args), delay);
    }

    debounced.cancel = () => {
        clearTimeout(timeoutId);
        timeoutId = null;
    }

    return debounced;
}
export const debounce = (cb, delay) => {
    let timeoutId;

    return (...args) => {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => cb(...args), delay);
    }
}
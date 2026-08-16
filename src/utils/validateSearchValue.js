export const validateSearchValue = (value) => {
    if (!value) {
        return {isValid: false, message: "Please enter a search value"};
    }
    if (value.length < 3) {
        return {isValid: false, message: "Please enter at least 3 characters"};
    }

    return {isValid: true, message: ""};
}
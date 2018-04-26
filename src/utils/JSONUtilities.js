export const validateJSON = (text) => {
    let result = true;
    try {
        JSON.parse(text);
    } catch (e) {
        result = false;
    }
    return result;
};

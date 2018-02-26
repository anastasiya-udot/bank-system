module.exports = {
    date(value) {
        if (!(value instanceof Date)) {
            value = new Date(value);
        }

        return `${value.getDate()}.${value.getMonth()}.${value.getFullYear()}`;
    }
};
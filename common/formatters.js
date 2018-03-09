module.exports = {
    date(value) {
        if (!(value instanceof Date)) {
            value = new Date(value);
        }

        return `${value.getDate()}.${value.getMonth()}.${value.getFullYear()}`;
    },
    currency(values) {
        return values.join(', ');
    },
    days(value) {
        return `${value} day(s)`;
    },
    revocable(value) {
        return value ? 'Отзывный' : 'Безотзывный';
    },
    annuityPayment(value) {
        return value ? 'Аннуитетный платёж' : 'Дифференцированный';
    },
    percent(value) {
        return value + '%';
    }
};
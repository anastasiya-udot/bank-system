const moment = require('moment');
const currencies = require('./currencies');

module.exports = [
    {
        name: 'НАЦИОНАЛЬНЫЙ',
        duration: moment.duration({ months: 6 }).asDays(),
        interestRate: 0.5, //годовых
        revocable: true, //отзывной
        currencies: [currencies[2].name]
    },
    {
        name: 'БЕЗОТЗЫВНЫЙ 365 ДНЕЙ',
        duration: moment.duration({ days: 365 }).asDays(),
        interestRate: 8.5,
        revocable: false,
        currencies: [currencies[2].name]
    },
    {
        name: 'БЕЗОТЗЫВНЫЙ НА 6 МЕСЯЦЕВ',
        duration: moment.duration({ months: 6 }).asDays(),
        interestRate: 8,
        revocable: false,
        currencies: [currencies[2].name]
    },
    {
        name: 'Free-card',
        duration: moment.duration({ months: 24 }).asDays(),
        interestRate: 0.5,
        revocable: false,
        currencies: [currencies[0].name, currencies[1].name]
    },
    {
        name: 'ЕВРОПЕЙСКИЙ НА 1 ГОД',
        duration: moment.duration({ years: 1 }).asDays(),
        interestRate: 0.5,
        revocable: true,
        currencies: [currencies[0].name, currencies[1].name]
    },
    {
        name: 'Тестовый НА 4 дня',
        duration: moment.duration({ days: 4 }).asDays(),
        interestRate: 5,
        revocable: true,
        currencies: [currencies[0].name, currencies[2].name]
    }
];
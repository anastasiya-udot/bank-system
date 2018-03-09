const moment = require('moment');
const currencies = require('./currencies');


module.exports = [
    {
        name: 'Рефинансирование',
        duration: moment.duration({ years: 3 }).asDays(),
        interestRate: 13.99, //годовых
        annuityPayment: false, //аннуитетный платёж
        currencies: [currencies[2].name]
    },
    {
        name: 'Оступный Плюс',
        duration: moment.duration({ months: 36 }).asDays(),
        interestRate: 16.4,
        annuityPayment: false,
        currencies: [currencies[2].name]
    },
    {
        name: 'Социальный',
        duration: moment.duration({ months: 36 }).asDays(),
        interestRate: 14,
        annuityPayment: false,
        currencies: [currencies[2].name]
    },
    {
        name: 'Ренессанс',
        duration: moment.duration({ months: 24 }).asDays(),
        interestRate: 15,
        annuityPayment: true,
        currencies: [currencies[2].name]
    },
    {
        name: 'Тестовый',
        duration: moment.duration({ days: 3 }).asDays(),
        interestRate: 10,
        annuityPayment: true,
        currencies: [currencies[0].name, currencies[2].name]
    }
];